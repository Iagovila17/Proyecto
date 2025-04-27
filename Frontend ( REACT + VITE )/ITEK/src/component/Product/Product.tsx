import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Hacemos la solicitud GET a Spring
    axios.get('http://localhost:8080/Product')  // Ajusta la URL según tu API en Spring
      .then((response) => {
        setProducts(response.data);  // Guardamos los productos en el estado
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price} EUR</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;