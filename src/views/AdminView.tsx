import React, { useEffect, useState } from "react";
import { InventoryItem, useGetInventoryQuery } from "../features/inventory/apiSlice";
import InventoryTable from "../components/InventoryTable";
import EditProductPopup from "../components/EditProductPopup";
import Dashboard from "../components/Dashboard";
import '../App.css'

const AdminView: React.FC = () => {
  const { data: inventory = [], isLoading, error } = useGetInventoryQuery();
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    setProducts(inventory);
  }, [inventory]);

  const handleEdit = (product: InventoryItem) => {
    console.log("Edit Product clicked:", product);
    setSelectedProduct(product); 
    setIsEditPopupOpen(true); 
  };

  const handleDelete = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    console.log("Deleted product at index:", index);
  };

  const handleDisable = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) => {
        if (i === index) {
          console.log(`Current disabled value for product at index ${index}:`, product.disabled);
            return {
            ...product,
            disabled: !product.disabled,
          };
        }
        return product;
      })
    );
  };
  
  
  

  const handleSaveProduct = (updatedProduct: InventoryItem) => {
    const updatedProducts = products.map((product) =>
      product.name === updatedProduct.name ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setIsEditPopupOpen(false);
    console.log("Saved edited product:", updatedProduct);

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading inventory data</div>;
  }

  return (
    <div>
      <Dashboard products = {products}/>
      <h1 className="text-heading">Inventory stats</h1>
      <InventoryTable
        isAdmin={true}
        products={products} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDisable={handleDisable}
      />
      
      {selectedProduct && isEditPopupOpen && (
        <EditProductPopup
          open={isEditPopupOpen}
          product={selectedProduct}
          onClose={() => setIsEditPopupOpen(false)} 
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default AdminView;