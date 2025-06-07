
// src/app/admin/products/page.tsx
"use client";

import { PlusCircle, Pizza as PizzaIcon, MoreHorizontal, Edit, Trash2, PackageSearch, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { placeholderProducts } from "@/lib/placeholder-data";
import type { Product } from "@/types";
import { useState, type ChangeEvent, useMemo, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const initialProductState: Partial<Product> = {
  name: "",
  description: "",
  price: 0,
  ingredients: [],
  imageUrl: "",
  category: ""
};


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(placeholderProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(initialProductState);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const [isViewDetailModalOpen, setIsViewDetailModalOpen] = useState(false);
  const [selectedProductForView, setSelectedProductForView] = useState<Product | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category).filter(Boolean) as string[]);
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [products]);

  const assignableCategories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category).filter(Boolean) as string[])).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    setCurrentPage(1); // Reset to first page when filters change
    return products.filter(product => {
      const matchesCategoryTab = selectedCategory === "All" || product.category === selectedCategory;
      if (!matchesCategoryTab) {
        return false;
      }

      const searchTermLower = searchTerm.toLowerCase();
      if (searchTermLower === "") return true;

      const nameMatch = product.name.toLowerCase().includes(searchTermLower);
      const descriptionMatch = product.description && product.description.toLowerCase().includes(searchTermLower);
      
      let categoryTextMatch = false;
      if (selectedCategory === "All") {
        categoryTextMatch = product.category && product.category.toLowerCase().includes(searchTermLower);
      }
      
      return nameMatch || descriptionMatch || categoryTextMatch;
    });
  }, [products, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;

    if (name.startsWith("price-")) {
      let keyName = name.substring("price-".length);
      if (keyName === "1Patty") keyName = "1 Patty";
      if (keyName === "2Patty") keyName = "2 Patty";
      
      setCurrentProduct(prev => {
        if (!prev) return null;
        const existingPrices = typeof prev.price === 'object' && prev.price !== null ? prev.price : {};
        return {
          ...prev,
          price: {
            ...existingPrices,
            [keyName]: parseFloat(value) || 0,
          },
        };
      });
    } else if (name === "price") {
        setCurrentProduct(prev => ({ ...prev, price: parseFloat(value) || 0 }));
    } else if (name === "ingredients") {
      setCurrentProduct(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
    }
    // Category change is handled by handleCategoryChange
    else {
      setCurrentProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (newCategoryValue: string) => {
    if (!currentProduct) return; 
    
    setCurrentProduct(prevProductState => {
      if (!prevProductState) return null; 
  
      let newPrice = prevProductState.price;
      const previousCategory = prevProductState.category;
  
      if ((newCategoryValue === "Pizza" || newCategoryValue === "spacial pizza")) {
          if (typeof prevProductState.price === 'number' || !prevProductState.price || (typeof prevProductState.price === 'object' && prevProductState.price !== null && !prevProductState.price.hasOwnProperty("24cm"))) {
              newPrice = { "24cm": 0, "30cm": 0, "40cm": 0 };
          }
      } else if (newCategoryValue === "Burger") {
          if (typeof prevProductState.price === 'number' || !prevProductState.price || (typeof prevProductState.price === 'object' && prevProductState.price !== null && !prevProductState.price.hasOwnProperty("1 Patty"))) {
              newPrice = { "1 Patty": 0, "2 Patty": 0 };
          }
      } else {
          if ((previousCategory === "Pizza" || previousCategory === "spacial pizza" || previousCategory === "Burger") && 
              typeof prevProductState.price === 'object' && prevProductState.price !== null) {
              const priceValues = Object.values(prevProductState.price).filter(p => typeof p === 'number') as number[];
              newPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0; 
          } else if (typeof prevProductState.price === 'object' && prevProductState.price !== null) {
              const priceValues = Object.values(prevProductState.price).filter(p => typeof p === 'number') as number[];
              newPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
          }
      }
  
      return {
        ...prevProductState,
        category: newCategoryValue,
        price: newPrice,
      };
    });
  };


  const openAddModal = () => {
    setCurrentProduct(JSON.parse(JSON.stringify(initialProductState)));
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsFormOpen(true);
  };
  
  const openViewDetailModal = (product: Product) => {
    setSelectedProductForView(product);
    setIsViewDetailModalOpen(true);
  };


  const handleSaveProduct = () => {
    if (!currentProduct || !currentProduct.name) return;

    let finalPrice = currentProduct.price;
    if (currentProduct.category === 'Pizza' || currentProduct.category === 'spacial pizza') {
      if (typeof currentProduct.price !== 'object' || currentProduct.price === null) {
        finalPrice = { "24cm": 0, "30cm": 0, "40cm": 0 };
      } else {
        finalPrice = {
          "24cm": (currentProduct.price as Record<string, number>)["24cm"] || 0,
          "30cm": (currentProduct.price as Record<string, number>)["30cm"] || 0,
          "40cm": (currentProduct.price as Record<string, number>)["40cm"] || 0,
        };
      }
    } else if (currentProduct.category === 'Burger') {
      if (typeof currentProduct.price !== 'object' || currentProduct.price === null) {
        finalPrice = { "1 Patty": 0, "2 Patty": 0 };
      } else {
        finalPrice = {
          "1 Patty": (currentProduct.price as Record<string, number>)["1 Patty"] || 0,
          "2 Patty": (currentProduct.price as Record<string, number>)["2 Patty"] || 0,
        };
      }
    } else {
      if (typeof currentProduct.price === 'object' && currentProduct.price !== null) {
         const priceValues = Object.values(currentProduct.price).filter(p => typeof p === 'number') as number[];
         finalPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
      } else if (typeof currentProduct.price !== 'number') {
        finalPrice = 0;
      }
    }
    
    const productToSave = { ...currentProduct, price: finalPrice };


    if (currentProduct?.id) {
      setProducts(products.map(p => p.id === productToSave.id ? productToSave as Product : p));
    } else {
      const newProduct: Product = {
        id: `p${products.length + 1 + Math.floor(Math.random()*1000)}`,
        ...productToSave
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const getDisplayPrice = (price: Product['price'], category?: string): string => {
    if (typeof price === 'number') {
      return `€${price.toFixed(2)}`;
    }
    if (typeof price === 'object' && price !== null) {
      if (category === 'Pizza' || category === 'spacial pizza') {
        const priceValues = Object.values(price).filter(p => typeof p === 'number' && p > 0) as number[];
        if (priceValues.length > 0) {
          return `Ab €${Math.min(...priceValues).toFixed(2)}`;
        }
      } else if (category === 'Burger') {
        const patty1Price = price["1 Patty"];
        if (typeof patty1Price === 'number' && patty1Price > 0) {
          return `Ab €${patty1Price.toFixed(2)}`;
        }
      }
    }
    return 'N/A';
  };
  
  const renderPriceDetailsInModal = (price: Product['price'], category?: string): string => {
    if (typeof price === 'number') {
      return `€${price.toFixed(2)}`;
    }
    if (typeof price === 'object' && price !== null) {
      if (category === 'Pizza' || category === 'spacial pizza') {
        return Object.entries(price)
          .map(([size, pVal]) => `${size}: €${(pVal as number).toFixed(2)}`)
          .join(' / ');
      } else if (category === 'Burger') {
        return Object.entries(price)
          .map(([patty, pVal]) => `${patty}: €${(pVal as number).toFixed(2)}`)
          .join(' / ');
      }
    }
    return 'N/A';
  };


  return (
    <>
      <PageTitle
        title="Product Management"
        icon={PizzaIcon}
        description="Manage your delicious product offerings."
        actions={
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        }
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>View, edit, or add new products.</CardDescription>
          <div className="mt-4 flex flex-col gap-4">
            <Input
              placeholder="Search products by name, description or category (if 'All' selected)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="flex flex-nowrap h-auto justify-start overflow-x-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5">
                    {category || "Uncategorized"}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-[50px]">Nr.</TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>
                      <Image
                        src={product.imageUrl || "https://placehold.co/64x64.png"}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                        data-ai-hint={
                          product.category === 'Pizza' ? "pizza food" : 
                          product.category === 'spacial pizza' ? "special pizza" :
                          product.category === 'pizza brötchen' ? "pizza bread" :
                          product.category === 'Burger' ? "burger food" : 
                          product.category === 'finger food' ? "finger food appetizer" :
                          product.category === 'Calzone' ? "calzone food" :
                          product.category === 'Rollo' ? "rollo wrap" :
                          product.category === 'Baguette' ? "baguette sandwich" :
                          product.category === 'Snacks' ? "snacks item" :
                          product.category === 'Salat' ? "salad food" :
                          product.category === 'Getränke' ? "drink beverage" : 
                          product.category === 'Eis' ? "ice cream" :
                          product.category === 'Menu' ? "meal combo" :
                          "food item"
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{getDisplayPrice(product.price, product.category)}</TableCell>
                    <TableCell>
                      {product.category && <Badge variant="outline">{product.category}</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openViewDetailModal(product)}>
                            <Eye className="mr-2 h-4 w-4" /> Anzeigen
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditModal(product)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <PackageSearch className="w-16 h-16 mb-4" />
                <p className="text-lg">No products found.</p>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
          {totalPages > 0 && (
            <div className="flex items-center justify-end space-x-2 py-4 border-t mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Product Detail Modal */}
      <Dialog open={isViewDetailModalOpen} onOpenChange={setIsViewDetailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              <DialogHeader>
                <DialogTitle>Produktdetails: {selectedProductForView?.name}</DialogTitle>
              </DialogHeader>
              {selectedProductForView && (
                <div className="grid gap-4 py-4">
                  <div className="flex justify-center">
                    <Image
                      src={selectedProductForView.imageUrl || "https://placehold.co/300x200.png"}
                      alt={selectedProductForView.name}
                      width={300}
                      height={200}
                      className="rounded-md object-cover"
                      data-ai-hint={
                        selectedProductForView.category === 'Pizza' ? "pizza food" : 
                        selectedProductForView.category === 'spacial pizza' ? "special pizza" :
                        selectedProductForView.category === 'pizza brötchen' ? "pizza bread" :
                        selectedProductForView.category === 'Burger' ? "burger food" : 
                        selectedProductForView.category === 'finger food' ? "finger food appetizer" :
                        selectedProductForView.category === 'Calzone' ? "calzone food" :
                        selectedProductForView.category === 'Rollo' ? "rollo wrap" :
                        selectedProductForView.category === 'Baguette' ? "baguette sandwich" :
                        selectedProductForView.category === 'Snacks' ? "snacks item" :
                        selectedProductForView.category === 'Salat' ? "salad food" :
                        selectedProductForView.category === 'Getränke' ? "drink beverage" : 
                        selectedProductForView.category === 'Eis' ? "ice cream" :
                        selectedProductForView.category === 'Menu' ? "meal combo" :
                        "food item"
                      }
                    />
                  </div>
                  <div>
                    <Label className="font-semibold">Name</Label>
                    <p>{selectedProductForView.name}</p>
                  </div>
                  {selectedProductForView.description && (
                    <div>
                      <Label className="font-semibold">Beschreibung</Label>
                      <p>{selectedProductForView.description}</p>
                    </div>
                  )}
                  {selectedProductForView.category && (
                    <div>
                      <Label className="font-semibold">Kategorie</Label>
                      <p><Badge variant="outline">{selectedProductForView.category}</Badge></p>
                    </div>
                  )}
                  <div>
                    <Label className="font-semibold">Preis</Label>
                    <p>{renderPriceDetailsInModal(selectedProductForView.price, selectedProductForView.category)}</p>
                  </div>
                  {selectedProductForView.ingredients && selectedProductForView.ingredients.length > 0 && (
                    <div>
                      <Label className="font-semibold">Zutaten</Label>
                      <p>{selectedProductForView.ingredients.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
              <DialogFooter className="sm:justify-end sticky bottom-0 bg-background py-4 px-6 border-t -mx-1 -mb-1">
                <DialogClose asChild>
                  <Button variant="outline">Schließen</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Edit/Add Product Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-1">
            <DialogHeader>
                <DialogTitle>{currentProduct?.id ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                {currentProduct?.id ? "Update the product details." : "Enter the details for the new product."}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" value={currentProduct?.name || ""} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Description</Label>
                  <Textarea id="description" name="description" value={currentProduct?.description || ""} onChange={handleInputChange} className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Select
                    value={currentProduct?.category || ""}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger id="category" className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignableCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(currentProduct?.category === 'Pizza' || currentProduct?.category === 'spacial pizza') ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-24cm" className="text-right">Price (24cm)</Label>
                      <Input id="price-24cm" name="price-24cm" type="number" step="0.01" value={typeof currentProduct.price === 'object' && currentProduct.price !== null ? (currentProduct.price['24cm'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-30cm" className="text-right">Price (30cm)</Label>
                      <Input id="price-30cm" name="price-30cm" type="number" step="0.01" value={typeof currentProduct.price === 'object' && currentProduct.price !== null ? (currentProduct.price['30cm'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-40cm" className="text-right">Price (40cm)</Label>
                      <Input id="price-40cm" name="price-40cm" type="number" step="0.01" value={typeof currentProduct.price === 'object' && currentProduct.price !== null ? (currentProduct.price['40cm'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                  </>
                ) : currentProduct?.category === 'Burger' ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-1Patty" className="text-right">Price (1 Patty)</Label>
                      <Input id="price-1Patty" name="price-1Patty" type="number" step="0.01" value={typeof currentProduct.price === 'object' && currentProduct.price !== null ? (currentProduct.price['1 Patty'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-2Patty" className="text-right">Price (2 Patty)</Label>
                      <Input id="price-2Patty" name="price-2Patty" type="number" step="0.01" value={typeof currentProduct.price === 'object' && currentProduct.price !== null ? (currentProduct.price['2 Patty'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" value={typeof currentProduct?.price === 'number' ? (currentProduct.price ?? '') : (typeof currentProduct?.price === 'object' && currentProduct?.price !== null && Object.values(currentProduct.price).length > 0 ? Object.values(currentProduct.price)[0] : '')} onChange={handleInputChange} className="col-span-3" />
                  </div>
                )}

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="ingredients" className="text-right pt-2">Ingredients</Label>
                  <Textarea id="ingredients" name="ingredients" placeholder="Comma-separated, e.g., Dough, Sauce, Cheese" value={currentProduct?.ingredients?.join(', ') || ""} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                  <Input id="imageUrl" name="imageUrl" value={currentProduct?.imageUrl || ""} onChange={handleInputChange} className="col-span-3" placeholder="https://placehold.co/300x200.png" />
                </div>
            </div>
            <DialogFooter className="sm:justify-end sticky bottom-0 bg-background py-4 px-6 border-t -mx-1 -mb-1">
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSaveProduct}>Save Product</Button>
            </DialogFooter>
           </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

