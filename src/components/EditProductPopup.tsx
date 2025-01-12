import React, { useState } from "react";
import { InventoryItem } from "../features/inventory/apiSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";

interface EditProductPopupProps {
  open: boolean;
  product: InventoryItem;
  onClose: () => void;
  onSave: (updatedProduct: InventoryItem) => void;
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({ open, product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState<InventoryItem>(product);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
      <Typography variant="body2" color="textSecondary" gutterBottom>
          {updatedProduct.name}
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: '1 1 45%' }}>
            <TextField
              label="Category"
              name="category"
              value={updatedProduct.category}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </div>

          <div style={{ flex: '1 1 45%' }}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={updatedProduct.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Value"
              name="value"
              type="text"
              value={updatedProduct.value}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductPopup;