import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const db = getFirestore(); // Asegúrate de importar y obtener Firestore

export const addToCart = async (userId, product) => {
  if (!userId || !product) {
    console.error("Faltan datos: userId o product");
    return;
  }

  try {
    const cartRef = doc(collection(db, "users", userId, "cart"), String(product.id));
    await setDoc(cartRef, product, { merge: true });

    console.log("Producto añadido a Firestore:", product);
  } catch (error) {
    console.error("Error al añadir a Firestore:", error);
    throw error; // Lanza el error para que se vea en `handleAddToCart`
  }
};
