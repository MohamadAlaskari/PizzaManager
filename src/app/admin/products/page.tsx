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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(placeholderProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    const { name, value } = e.target;
    if (name === "price") {
      setCurrentProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === "ingredients") {
      setCurrentProduct(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
    }
    else {
      setCurrentProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const openAddModal = () => {
    setCurrentProduct({ name: "", description: "", price: 0, ingredients: [], imageUrl: "", category: "" });
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsFormOpen(true);
  };

  const handleSaveProduct = () => {
    // In a real app, this would involve an API call
    if (currentProduct?.id) { // Editing existing product
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct as Product : p));
    } else { // Adding new product
      const newProduct: Product = {
        id: `p${products.length + 1 + Math.floor(Math.random()*100)}`, // Temporary ID
        ...currentProduct
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would involve an API call and confirmation
    setProducts(products.filter(p => p.id !== productId));
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
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.imageUrl || "https://placehold.co/64x64.png"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint="pizza food"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
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
          <div className="p-1"> {/* Add padding for scrollbar */}
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
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" name="price" type="number" value={currentProduct?.price || ""} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="ingredients" className="text-right pt-2">Ingredients</Label>
                <Textarea id="ingredients" name="ingredients" placeholder="Comma-separated, e.g., Dough, Sauce, Cheese" value={currentProduct?.ingredients?.join(', ') || ""} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" value={currentProduct?.imageUrl || ""} onChange={handleInputChange} className="col-span-3" placeholder="https://placehold.co/300x200.png" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" name="category" value={currentProduct?.category || ""} onChange={handleInputChange} className="col-span-3" placeholder="e.g., Vegetarian, Special" />
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
