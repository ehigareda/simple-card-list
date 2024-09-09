import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, CardMedia, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const ProductList = () => {
  const [products, setProducts] = useState([])

  //implement the get products function
  const fetchProducts = async () => {
    try{
      const res = await axios.get('http://localhost:5000/api/products')
      setProducts(res.data);
    } catch (err){
      console.log("Error fetching products", err);
    }
  };

  //implement the delete function
  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err){
      console.log("Error deleting product", err)
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Container>
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        <strong>Simple Card List</strong>
      </Typography>
      <Grid container spacing={{xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map(product => (
          <Grid item key={product.id}  xs={11} sm={5.5} md={3.5}>
            <Card sx={{ maxWidth: '100%', minHeight: 250}}>
              <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                alt={product.name}
                sx={{ height: 140, width: '100%', objectFit: 'cover' }}
                image={product.imageUrl}
              />
                  <IconButton onClick={() => handleDelete(product.id)}
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: 4,
                    left: 4,
                  }}>
                <DeleteIcon />
                </IconButton>
                </div>
                <CardContent>
                <Typography variant="h5" component="h2">
                  <strong>{product.name}</strong>
                </Typography>
                <Typography variant="h6" component="p">
                  ${product.price}
                </Typography>
                <Typography variant="body1" component="p" color="gray">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default ProductList;