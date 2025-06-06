
// src/app/admin/products/page.tsx
"use client";

import { PlusCircle, Pizza as PizzaIcon, MoreHorizontal, Edit, Trash2, PackageSearch } from "lucide-react";
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
import { useState, type ChangeEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialProductState: Partial<Product> = {
  name: "",
  description: "",
  price: 0, // Will be object for pizzas upon category selection
  ingredients: [],
  imageUrl: "",
  category: ""
};


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(placeholderProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(initialProductState);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;

    if (name.startsWith("price-")) { // For pizza size prices e.g. price-24cm
      const size = name.split("-")[1]; // "24cm"
      setCurrentProduct(prev => {
        if (!prev) return null;
        const existingPrices = typeof prev.price === 'object' ? prev.price : {};
        return {
          ...prev,
          price: {
            ...existingPrices,
            [size]: parseFloat(value) || 0,
          },
        };
      });
    } else if (name === "price") { // For single price products
        setCurrentProduct(prev => ({ ...prev, price: parseFloat(value) || 0 }));
    } else if (name === "ingredients") {
      setCurrentProduct(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
    } else if (name === "category") {
      const newCategory = value;
      setCurrentProduct(prev => {
        if (!prev) return null;
        let newPrice = prev.price;
        // If category changes TO Pizza, and price is a number (or not set for Pizza yet)
        if (newCategory === "Pizza" && (typeof prev.price === 'number' || !prev.price || (typeof prev.price === 'object' && !prev.price["24cm"] ) ) ) {
          newPrice = { "24cm": 0, "30cm": 0, "40cm": 0 };
        }
        // If category changes FROM Pizza, and price is an object
        else if (prev.category === "Pizza" && newCategory !== "Pizza" && typeof prev.price === 'object' && prev.price) {
          const priceValues = Object.values(prev.price).filter(p => typeof p === 'number') as number[];
          newPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
        }
        return { ...prev, category: newCategory, price: newPrice };
      });
    }
    else {
      setCurrentProduct(prev => ({ ...prev, [name]: value }));
    }
  };


  const openAddModal = () => {
    setCurrentProduct(JSON.parse(JSON.stringify(initialProductState))); // Deep copy
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsFormOpen(true);
  };

  const handleSaveProduct = () => {
    if (!currentProduct || !currentProduct.name) return; // Basic validation

    // Ensure price is correctly structured based on category
    let finalPrice = currentProduct.price;
    if (currentProduct.category === 'Pizza') {
      if (typeof currentProduct.price !== 'object' || currentProduct.price === null) {
        finalPrice = { "24cm": 0, "30cm": 0, "40cm": 0 };
      } else { // Ensure all sizes are present, even if 0
        finalPrice = {
          "24cm": (currentProduct.price as Record<string, number>)["24cm"] || 0,
          "30cm": (currentProduct.price as Record<string, number>)["30cm"] || 0,
          "40cm": (currentProduct.price as Record<string, number>)["40cm"] || 0,
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


    if (currentProduct?.id) { // Editing existing product
      setProducts(products.map(p => p.id === productToSave.id ? productToSave as Product : p));
    } else { // Adding new product
      const newProduct: Product = {
        id: `p${products.length + 1 + Math.floor(Math.random()*1000)}`, // Temporary ID
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
    if (category === 'Pizza' && typeof price === 'object' && price !== null) {
      const priceValues = Object.values(price).filter(p => typeof p === 'number' && p > 0) as number[];
      if (priceValues.length > 0) {
        return `Ab €${Math.min(...priceValues).toFixed(2)}`;
      }
    }
    return 'N/A';
  };


  return (
    <>
      <PageTitle
        title="Product Management"
        icon={PizzaIcon}
        description="Manage your delicious pizza offerings."
        actions={
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        }
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>View, edit, or add new pizza products.</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
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
              {filteredProducts.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={product.imageUrl || "https://placehold.co/64x64.png"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint={product.category === 'Pizza' ? "pizza food" : product.category === 'Burger' ? "burger food" : product.category === 'Salad' ? "salad food" : "food item"}
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
              <p>Try adjusting your search or add a new product.</p>
            </div>
          )}
        </CardContent>
      </Card>

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
                  <Input id="category" name="category" value={currentProduct?.category || ""} onChange={handleInputChange} className="col-span-3" placeholder="e.g., Pizza, Burger, Salad" />
                </div>

                {currentProduct?.category === 'Pizza' ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-24cm" className="text-right">Price (24cm)</Label>
                      <Input id="price-24cm" name="price-24cm" type="number" step="0.01" value={typeof currentProduct.price === 'object' ? (currentProduct.price['24cm'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-30cm" className="text-right">Price (30cm)</Label>
                      <Input id="price-30cm" name="price-30cm" type="number" step="0.01" value={typeof currentProduct.price === 'object' ? (currentProduct.price['30cm'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price-40cm" className="text-right">Price (40cm)</Label>
                      <Input id="price-40cm" name="price-40cm" type="number" step="0.01" value={typeof currentProduct.price === 'object' ? (currentProduct.price['40cm'] ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" value={typeof currentProduct?.price === 'number' ? (currentProduct.price ?? '') : ''} onChange={handleInputChange} className="col-span-3" />
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
