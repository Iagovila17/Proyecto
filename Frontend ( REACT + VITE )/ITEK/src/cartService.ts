interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Función para obtener los productos del carrito del usuario desde una API REST
export const fetchCartItems = async (userId: string): Promise<Product[]> => {
  try {
    const response = await fetch(`/api/cart/${userId}`); // Llamada a la API que devuelve el carrito
    if (!response.ok) {
      throw new Error("Error al obtener los productos del carrito");
    }

    const data = await response.json(); // Parsear la respuesta como JSON
    return data.products; // Suponiendo que la respuesta tenga una propiedad 'products'
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    return []; // En caso de error, devolver un carrito vacío
  }
};
