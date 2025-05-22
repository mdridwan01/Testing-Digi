import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import 'react-toastify/dist/ReactToastify.css';

import qr from '../../../public/Photo/qr.png';
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  LinearProgress,
} from '@mui/material';

export default function BuyModal({ open, onClose, product }) {
  const TOTAL_TIME = 90; 
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(false);
 

  // Countdown timer logic
  useEffect(() => {
    let interval, timeout;

    if (open && product?.availableProduct) {
      setSecondsLeft(TOTAL_TIME);

      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeout = setTimeout(() => {
        onClose(); 
      }, TOTAL_TIME * 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, product?.id]);

  // Handle order confirmation
  const handleConfirmOrder = async () => {
        console.log('Order confirmed for product:', product);
        setLoading(true);
      const toastId = toast.loading("Order Processing...", {
                  position: "top-center",
                  closeOnClick: false,
                  autoClose: false,
                  draggable: false,
                });
    try {
                const payload = {
                  box_id: product.product_id,
                  on: true,
                };

                // send to ESP32
                const response = await fetch('/api/heat/set-onoff', {
                  method: 'POST',
                  headers: {
                    Authorization: 'Bearer 1234567890abcdef1234567890abcdef',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                  credentials: 'include',
                });

                if (!response.ok) {
                  throw new Error(`ESP32 HTTP error: ${response.status}`);
                }

               const orderData = {
                        product_id: product.product_id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        OrderStatus: 'Success',
                      };
                 await axios.post('http://192.168.68.114:5000/api/orders/', orderData);    
                toast.update(toastId, {
                  render: "Order Delivered!",
                  type: "success",
                  isLoading: false,
                  autoClose: 3000,
                  closeOnClick: true,
                  draggable: true,
                });
                console.log('ESP32 Response:', await response.json());
                onClose();
              } catch (error) {
                console.error('Error:', error);
                toast.update(toastId, {
                  render: "Order Failed!",
                  type: "error",
                  isLoading: false,
                  autoClose: 4000,
                });
                
               const orderData = {
                        product_id: product.product_id,
                        title: product.title,
                        price: product.price,
                        OrderStatus: 'Failed',
                        quantity: 1,
                      };
                 await axios.post('http://192.168.68.114:5000/api/orders/', orderData);
               

                onClose();
              }   finally {
                          setLoading(false);
                        }
                      };


  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '90%',
              sm: '80%',
              md: 450,
              lg: 550,
            },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
         
          {product.availableProduct ? (
            <>
              <Typography className="text-green-600" variant="h5">
                Confirm Purchase
              </Typography>
               <img className="m-auto" width={"25%"} src={product.image} alt="product" />
              <Typography sx={{  }}><strong>{product.title}</strong></Typography>
                
               <Typography className="text-green-600" sx={{mt:1, fontSize: '1.2rem', color: ''}} >
                  <span className=' font-bolder'><strong>৳</strong> </span><strong>{product.price}</strong> 
               </Typography>

              <img className="m-auto" width={"50%"} src={qr} alt="qr code" />

              <Box mt={3} display="flex" justifyContent="space-between" flexDirection="column">
                <Button
                  sx={{ mb: 1 }}
                  variant="contained"
                  onClick={handleConfirmOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Confirm'}
                </Button>
                <Button variant="outlined" color="error" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h3" color="error" gutterBottom>
                Out of Stock
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Sorry! This product is currently unavailable.
              </Typography>
              <Button variant="outlined" color="error" onClick={onClose}>
                Close
              </Button>
            </>
          )}

          {/* Countdown display */}
          <Typography sx={{ mt: 1, color: 'gray', fontSize: '0.9rem' }}>
            Auto closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
          </Typography>

          <LinearProgress
            variant="determinate"
            value={((TOTAL_TIME - secondsLeft) / TOTAL_TIME) * 100}
            sx={{ mt: 1, mb: 2 }}
          />
        </Box>
      </Fade>
    </Modal>
  );
}
