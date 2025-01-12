import React from "react";
import './Dashboard.css'
import TotalProductIcon from "@mui/icons-material/Apps";
import StoreIcon from "@mui/icons-material/Store";
import OutOfStockIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";

const Card: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="card">
      <div>
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-details">
        <div className="card-title">{title}</div>
        <div className="card-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ products: any[] }> = ({
  products,
}) => {
  const totalProducts = products.length;
  const totalStoreValue = products.reduce(
    (acc, product) => {
      const value = parseFloat(product.value.replace('$', ''));
      return acc + value;
    },
    0
  );
  
  const outOfStockCount = products.filter((product) => {
    // debugger
    return Number(product.quantity) === 0})
    .length;
  const uniqueCategories = new Set(products.map((product) => product.category))
    .size;

  return (
    <div className="card-container">
          <Card
            icon={<TotalProductIcon />}
            title="Total product"
            subtitle={totalProducts.toString()}
          />
          <Card
            icon={<StoreIcon />}
            title="Total store value"
            subtitle={totalStoreValue}
          />
          <Card
            icon={<OutOfStockIcon />}
            title="Out of stock"
            subtitle={outOfStockCount.toString()}
          />
          <Card
            icon={<CategoryIcon />}
            title="No of Category"
            subtitle={uniqueCategories.toString()}
          />
    </div>
  );
};

export default Dashboard;