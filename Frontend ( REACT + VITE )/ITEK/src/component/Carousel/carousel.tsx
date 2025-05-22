import React, { useRef } from 'react';
import './Carousel.css';

const products = [
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747738305/ITEK%20Front/ROPA%20HOMBRE/lino/wx29goa2plnggcg22axd.jpg',
    url: '/hombre/todos/ProductDetail/1',
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1746101881/ITEK%20Front/ROPA%20HOMBRE/lino/l3tdiuop20xmygs8nmdf.jpg',
   
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1739791283/ITEK%20Front/ROPA%20HOMBRE/Camisetas/kj5g2lpvmdze0j2gmjvw.png',
 
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1739618284/ITEK%20Front/ROPA%20HOMBRE/Camisetas/ocg9b1qwnxizkb9qoxei.png',
    
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg',
    
  },
   {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg',
    
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747376993/ITEK%20Front/HOME/inicio/collage1.jpg',
   
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg',
 
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747376993/ITEK%20Front/HOME/inicio/collage1.jpg',
    
  },
  {
    image: 'https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg',
    
  },
];

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    if (containerRef.current) {
      startX = e.pageX - containerRef.current.offsetLeft;
      scrollLeft = containerRef.current.scrollLeft;
      containerRef.current.classList.add('dragging');
    }
  };

  const handleMouseLeave = () => {
    isDragging = false;
    containerRef.current?.classList.remove('dragging');
  };

  const handleMouseUp = () => {
    isDragging = false;
    containerRef.current?.classList.remove('dragging');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="zara-carousel"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {products.map((product, index) => (
        <div className="zara-product-card" key={index}>
          <a href={product.url} style={{ display: 'block', height: '100%' }}>
            <img src={product.image} alt={`Producto ${index + 1}`} />
          </a>
          <div className="zara-product-info">
            {/* Puedes agregar aquí más info del producto */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
