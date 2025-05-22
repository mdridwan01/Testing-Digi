import React, { useEffect, useState } from 'react'
import SingleCard from './SingleCard';
import BuyModal from './BuyModal';
import { Box } from '@mui/material';

import { ToastContainer } from 'react-toastify';

export default function ProductCard() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://192.168.68.114:5000/api/products') 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

   const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  
    const handleBuyClick = (products) => {
      setSelectedProduct(products);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
    };
  
  return (
    <>
     <ToastContainer position="top-center" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
      {/* <BuyModal /> */}
      {products.map(product => (
        <SingleCard  key={product.id} products={product} onBuyClick={handleBuyClick}/>
        
      ))}
     
        </div>
        <BuyModal
                open={modalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
              />
        
    </>
  )
}
