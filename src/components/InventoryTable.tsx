import React from "react";
import { InventoryItem } from "../features/inventory/apiSlice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface InventoryTableProps {
  isAdmin: boolean;
  products: InventoryItem[];
  onEdit: (product: InventoryItem) => void;
  onDelete: (index: number) => void;
  onDisable: (index: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ isAdmin, products, onEdit, onDelete, onDisable }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#222' }}>
      <Table sx={{ color: 'white' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'green' }}>Name</TableCell>
            <TableCell sx={{ color: 'green' }}>Category</TableCell>
            <TableCell sx={{ color: 'green' }}>Price</TableCell>
            <TableCell sx={{ color: 'green' }}>Quantity</TableCell>
            <TableCell sx={{ color: 'green' }}>Value</TableCell>
            <TableCell sx={{ color: 'green' }}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => {
            return (
              <TableRow key={index} sx={{
                color: product.disabled ? 'grey' : '#222',
                opacity: product.disabled ? 0.5 : 1,
              }}>
                <TableCell sx={{ color: 'white' }}>{product.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{product.category}</TableCell>
                <TableCell sx={{ color: 'white' }}>{`$${product.price.replace('$', '')}`}</TableCell>
                <TableCell sx={{ color: 'white' }}>{Number(product.quantity)}</TableCell>
                <TableCell sx={{ color: 'white' }}>  {`$${product.value?.replace('$', '') || '0'}`}</TableCell>
                <TableCell>
                  {isAdmin ? (
                    <>
                      <IconButton
                        onClick={() => !product.disabled && onEdit(product)}
                        color="primary"
                        disabled={product.disabled}
                      >
                        <EditIcon sx={{ color: product.disabled ? 'grey' : 'green' }} />
                      </IconButton>
                      <IconButton onClick={() => onDisable(index)} color="secondary">
                        {product.disabled ? (
                          <VisibilityOffIcon />
                        ) : (
                          <RemoveRedEyeIcon />
                        )}
                      </IconButton>
                      <IconButton onClick={() => !product.disabled && onDelete(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton disabled color="primary">
                        <EditIcon sx={{ color: 'grey' }} />
                      </IconButton>
                      <IconButton disabled color="secondary">
                        {product.disabled ? (
                          <VisibilityOffIcon sx={{ color: 'white' }} />
                        ) : (
                          <RemoveRedEyeIcon sx={{ color: 'white' }} />
                        )}
                      </IconButton>
                      <IconButton disabled color="error">
                        <DeleteIcon sx={{ color: 'grey' }} />
                      </IconButton>

                    </>
                  )}

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;