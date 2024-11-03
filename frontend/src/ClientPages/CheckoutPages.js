import React, { useContext, useState } from 'react';
import { 
  Container, 
  Grid, 
  TextField, 
  Typography, 
  Switch, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Button, 
  IconButton,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { Add, Remove, LocalShipping, Payment, CalendarToday } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container maxWidth="lg" className="py-8 mt-16">
      <Grid container spacing={4}>

        {/* Delivery Information Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" className="mb-4 font-bold">Delivery Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Name" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Mobile Number" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="City" /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="State" /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="ZIP" /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Address" /></Grid>
          </Grid>

          

          <TextField fullWidth label="Note" placeholder="Type your note" multiline rows={3} className="mt-4" />

          <div className="mt-6">
            <Typography variant="h6" className="mb-2">Payment Method</Typography>
            <RadioGroup defaultValue="cash">
              <FormControlLabel value="online" control={<Radio />} label={<><Payment style={{ marginRight: '8px' }} /> Online Payment</>} />
              <FormControlLabel value="cash" control={<Radio />} label={<><Payment style={{ marginRight: '8px' }} /> Cash on Delivery</>} />
              <FormControlLabel value="pos" control={<Radio />} label={<><Payment style={{ marginRight: '8px' }} /> POS on Delivery</>} />
            </RadioGroup>
          </div>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={5}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h5" className="mb-4 font-bold">Order Summary</Typography>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <Avatar
                    variant="rounded"
                    src={item.image || '/placeholder.png'}
                    alt={item.Title}
                    className="w-16 h-16 bg-gray-200 mr-4 rounded-lg"
                  />
                  <div className="flex-grow">
                    <Typography variant="subtitle1" className="font-semibold">{item.Title}</Typography>
                    <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)}</Typography>
                  </div>
                  <div className="flex items-center">
                    <IconButton size="small"><Remove /></IconButton>
                    <Typography className="mx-2">{item.quantity}</Typography>
                    <IconButton size="small"><Add /></IconButton>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between mt-2">
                  <Typography>Shipping</Typography>
                  <Typography>--</Typography>
                </div>
                <div className="flex justify-between mt-4 font-bold">
                  <Typography>Total (USD)</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </div>
              </div>

              <Button variant="contained" fullWidth className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                Confirm Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
