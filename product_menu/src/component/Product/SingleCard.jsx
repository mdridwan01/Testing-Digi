import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SingleCard({products, onBuyClick }) {
  // console.log(products)
  const { product_id, title, subTitle, price, availableProduct, image } = products;
 
   
  return (
    // maxWidth: 345
    <Card className='radius-2 shadow-xl px-5 pb-5 m-auto ' sx={{width: {
      xs: '100%',
      sm: '100%',
      md: "100%",
      lg: "100%",}}}>
    <div className='bg-sky-600 w-25 p-1 h-10 rounded-b-full mx-auto '>
      <h1 className='text-white text-2xl font-bold text-center mt-[-10px] '>
        {product_id}
      </h1>
    </div>
    <Typography className='text-center text-slate-500 font-semibold inline-block animate-marquee' sx={{fontSize: {
        xs: '0.8rem',
        sm: '1rem',
        md: '1.2rem',
        lg: '1.2rem',
        }}} gutterBottom variant="p" component="div">
          {subTitle}
        </Typography>
      <CardMedia
      sx={{
        height: 'auto',    
        width: {
        xs: '50%',   
        sm: '75%',
        md: 180,
        lg: 180,},    
      }}
      className='m-auto '
        component="img"
        alt="green iguana"
        // style={{ width: '180px' }}
        image={image}
      />
      <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography className=' ' sx={{fontFamily: "sans-serif",  textAlign: "center", fontSize: {
        xs: '0.8rem',
        sm: '1rem',
        md: '1.2rem',
        lg: '1.2rem',
        }}} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
      {availableProduct == true ? (
         <Button   sx={{
        borderRadius: '16px',        
        backgroundColor: '#1976d2',  
        '&:hover': {
          backgroundColor: '#1565c0', 
        },
        width: '100%',
      }}
      variant="contained" onClick={() => onBuyClick(products)}>৳ {price}</Button>
      ) : (
         <Button sx={{
        borderRadius: '16px',        
        backgroundColor: '#BB2124',  
        '&:hover': {
          backgroundColor: '#d6080c', 
        },
        width: '100%',
      }}
      variant="contained" onClick={() => onBuyClick(products)}>Out of Stock</Button> 
      ) 
      }
      </CardActions>
    </Card>
  );
}