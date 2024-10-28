import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import { Add, Remove, GridView, ViewList } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
  const { cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar position="static" color="transparent" elevation={0} className="border-b border-gray-200">
        <Toolbar>
          <Typography variant="h6" component="div" className="flex-grow">
            Shopping Cart <span className="ml-2 text-blue-500">{cart.length}</span>
          </Typography>
          <div className="flex items-center">
            <IconButton size="large" color="inherit" aria-label="grid view">
              <GridView />
            </IconButton>
            <IconButton size="large" color="inherit" aria-label="list view">
              <ViewList />
            </IconButton>
            <select className="ml-2 p-2 border border-gray-300 rounded">
              <option>All</option>
            </select>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.length === 0 ? (
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
            ) : (
              cart.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="flex items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4">
                      <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-grow">
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Color: {item.color}
                      </Typography>
                      <div className="flex items-center mt-2">
                        <IconButton size="small" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                          inputProps={{ className: 'text-center w-12', min: 1 }}
                        />
                        <IconButton size="small" onClick={() => addToCart(item)}>
                          <Add />
                        </IconButton>
                      </div>
                    </div>
                    <Typography variant="h6">₹{(item.price * item.quantity).toFixed(2)}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
            <Button className="mt-4" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          {cart.length > 0 && (
            <div>
              <Card>
                <CardContent>
                  <Typography variant="h5" className="mb-4">
                    Order Summary
                  </Typography>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Typography>Subtotal</Typography>
                      <Typography>₹{subtotal.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography>Delivery</Typography>
                      <Typography>+₹15.00</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography>Discount</Typography>
                      <Typography>-₹10.00</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography>Tax</Typography>
                      <Typography>7%</Typography>
                    </div>
                  </div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Enter Promo Code"
                    className="mt-4"
                  />
                  <Divider className="my-4" />
                  <div className="flex justify-between mb-4">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">₹{(subtotal * 1.07 + 5).toFixed(2)}</Typography>
                  </div>
                  <Link to="/checkout">
                    <Button variant="contained" fullWidth className="bg-blue-500 hover:bg-blue-600">
                      Checkout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
