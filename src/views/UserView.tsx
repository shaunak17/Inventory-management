import React from "react";
import { InventoryItem, useGetInventoryQuery } from "../features/inventory/apiSlice";
import InventoryTable from "../components/InventoryTable";
import Dashboard from "../components/Dashboard";
import '../App.css'

const UserView: React.FC = () => {
  const { data: inventory = [], isLoading, error } = useGetInventoryQuery();

  const handleEdit = (product: InventoryItem) => {
    console.log("Edit product:", product);
  };

  const handleDelete = (productId: number) => {
    console.log("Delete product with ID:", productId);
  };

  const handleDisable = (productId: number) => {
    console.log("Disable/Enable product with ID:", productId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading inventory data</div>;
  }

  return (
    <div>
      <Dashboard products={inventory} />
      <h1 className="text-heading">Inventory stats</h1>
      <InventoryTable
        isAdmin={false}
        products={inventory}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDisable={handleDisable}
      />
    </div>
  );
};

export default UserView;
