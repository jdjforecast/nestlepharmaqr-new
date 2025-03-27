"use client"

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash } from "lucide-react";
import { uploadProductImage } from "@/lib/supabase";

interface ProductFormData {
  name: string;
  description: string;
  coin_value: number;
  image?: File;
}

export function ProductsAdmin() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    coin_value: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = undefined;
      if (formData.image) {
        imageUrl = await uploadProductImage(formData.image);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        coin_value: formData.coin_value,
        ...(imageUrl && { image_url: imageUrl }),
      };

      if (isEditing) {
        await updateProduct(isEditing, productData);
        toast({
          title: "Producto actualizado",
          description: "El producto se ha actualizado correctamente",
        });
      } else {
        await createProduct(productData);
        toast({
          title: "Producto creado",
          description: "El producto se ha creado correctamente",
        });
      }

      setFormData({
        name: "",
        description: "",
        coin_value: 0,
      });
      setIsEditing(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al procesar el producto",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: typeof products[0]) => {
    setIsEditing(product.id);
    setFormData({
      name: product.name,
      description: product.description || "",
      coin_value: product.coin_value,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al eliminar el producto",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="text-red-500">
        Error al cargar los productos: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Producto" : "Nuevo Producto"}
        </h2>
        
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coin_value">Valor en Monedas</Label>
          <Input
            id="coin_value"
            type="number"
            value={formData.coin_value}
            onChange={(e) => setFormData({ ...formData, coin_value: parseInt(e.target.value) })}
            required
            min={0}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Imagen</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData({ ...formData, image: file });
              }
            }}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Actualizando..." : "Creando..."}
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {isEditing ? "Actualizar Producto" : "Crear Producto"}
            </>
          )}
        </Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lista de Productos</h2>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded-lg space-y-2"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="font-medium">{product.coin_value} monedas</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 