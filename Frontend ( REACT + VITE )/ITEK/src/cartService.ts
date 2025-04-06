import { db } from "./firebase-config"; // Suponiendo que tienes la configuración de Firebase
import { collection, getDocs } from "firebase/firestore"; // Cambié getDoc por getDocs

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Función para obtener los productos del carrito del usuario
export const fetchCartItems = async (userId: string): Promise<Product[]> => {
  const cartRef = collection(db, "users", userId, "cart"); // Accedemos a la subcolección de productos del carrito

  try {
    const cartSnapshot = await getDocs(cartRef); // Usamos getDocs para obtener todos los documentos de la subcolección
    if (!cartSnapshot.empty) {
      // Si el carrito no está vacío
      const products = cartSnapshot.docs.map(doc => doc.data() as Product); // Aseguramos que los datos son del tipo Product
      return products;
    } else {
      return []; // Si no hay productos en el carrito
    }
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    return []; // En caso de error, devolver un carrito vacío
  }
};
