import React from "react";
import "./Bloq.css";

const Bloq: React.FC = () => {
 const images = [
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747376993/ITEK%20Front/HOME/inicio/collage1.jpg",   
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378647/ITEK%20Front/HOME/inicio/collage7.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377081/ITEK%20Front/HOME/inicio/collage3.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377160/ITEK%20Front/HOME/inicio/collage4.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378564/ITEK%20Front/HOME/inicio/collage5.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377054/ITEK%20Front/HOME/inicio/collage2.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378770/ITEK%20Front/HOME/inicio/tbe5ycpaqrlq4brm1kyp.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747379060/ITEK%20Front/HOME/inicio/collage9.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747379147/ITEK%20Front/HOME/inicio/collage10.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747379153/ITEK%20Front/HOME/inicio/collage11.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378647/ITEK%20Front/HOME/inicio/collage7.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377054/ITEK%20Front/HOME/inicio/collage2.jpg",
    "/Imagenes/mujer.jpg",
    "/Imagenes/hombre.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747379147/ITEK%20Front/HOME/inicio/collage10.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg",   
    "/Imagenes/Sesion.png",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747379153/ITEK%20Front/HOME/inicio/collage11.jpg",  
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378770/ITEK%20Front/HOME/inicio/tbe5ycpaqrlq4brm1kyp.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377081/ITEK%20Front/HOME/inicio/collage3.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378564/ITEK%20Front/HOME/inicio/collage5.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747378770/ITEK%20Front/HOME/inicio/tbe5ycpaqrlq4brm1kyp.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747379060/ITEK%20Front/HOME/inicio/collage9.jpg", 
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747376993/ITEK%20Front/HOME/inicio/collage1.jpg",   
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377453/ITEK%20Front/HOME/inicio/collage6.jpg",
    "https://res.cloudinary.com/deabexp8e/image/upload/v1747377160/ITEK%20Front/HOME/inicio/collage4.jpg",
  ];

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={`Imagen ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Bloq;