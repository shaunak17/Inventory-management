import React, { useState } from "react";
import { InventoryItem } from "../features/inventory/apiSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#222",
          color: "white",
          borderRadius: "15px",
          width: "30rem",
        },
      }}
    >
      <DialogTitle sx={{ marginBottom: "-1rem", fontSize: "1.5rem", position: "relative" }}>
        Edit Product
        <CloseIcon
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            color: "green",
            cursor: "pointer",
          }}
        />
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: "white", marginBottom: "1.2rem", fontSize: "1rem" }}
        >
          {updatedProduct.name}
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "1rem",
          }}
        >
          <div style={{ flex: "1 1 45%" }}>
            <InputLabel sx={{ color: "white", fontSize: "0.8rem" }}>
              Category
            </InputLabel>
            <TextField
              name="category"
              value={updatedProduct.category}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                input: {
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  height: "0.7rem",
                  fontSize: "0.9rem",
                },
                label: {
                  color: "white",
                },
              }}
            />
            <InputLabel sx={{ color: "white", fontSize: "0.8rem", marginTop: "1rem" }}>
              Price
            </InputLabel>
            <TextField
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                input: {
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  height: "0.7rem",
                  fontSize: "0.9rem",
                },
                label: {
                  color: "white",
                },
              }}
            />
          </div>
          <div style={{ flex: "1 1 45%" }}>
            <InputLabel sx={{ color: "white", fontSize: "0.8rem" }}>
              Quantity
            </InputLabel>
            <TextField
              name="quantity"
              type="number"
              value={updatedProduct.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                input: {
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  height: "0.7rem",
                  fontSize: "0.9rem",
                },
                label: {
                  color: "white",
                },
              }}
            />
            <InputLabel sx={{ color: "white", fontSize: "0.8rem", marginTop: "1rem" }}>
              Value
            </InputLabel>
            <TextField
              name="value"
              type="text"
              value={updatedProduct.value}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                input: {
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  height: "0.7rem",
                  fontSize: "0.9rem",
                },
                label: {
                  color: "white",
                },
              }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "green",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            color: "green",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductPopup;