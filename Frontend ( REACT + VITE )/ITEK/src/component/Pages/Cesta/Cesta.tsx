import './Cesta.css';

// Interfaz de producto
interface Product {
  id: number;
  name: string;
  price: number;
  image1?: string;
}

// Propiedades de la cesta
interface CestaProps {
  cart: Product[];
  removeFromCart: (id: number) => void;
  clearCart: () => void;  //  función para vaciar el carrito
}

const Cesta: React.FC<CestaProps> = ({ cart, removeFromCart, clearCart }) => {

  // Agrupar productos por su id y contar la cantidad de cada uno
  const groupedCart = cart.reduce((acc: { [key: number]: { product: Product; quantity: number } }, product) => {
    if (acc[product.id]) {
      acc[product.id].quantity += 1;
    } else {
      acc[product.id] = { product, quantity: 1 };
    }
    return acc;
  }, {});

  // Convertir el objeto `groupedCart` en un array de productos con cantidad
  const cartWithQuantities = Object.values(groupedCart);

  // Calcular el total de la cesta de la compra
  const total = cartWithQuantities.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

  // Función para eliminar un producto
  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  // Función para realizar la compra
  const handlePurchase = () => {
    // Vaciar el carrito en el estado local
    clearCart();
    alert("Compra realizada con éxito");
  };

  if (cartWithQuantities.length === 0) {
    return (
      <div>
        <h2>Cesta</h2>
        <p>No hay productos en tu cesta.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="titulo-carrito">
        <h2>CESTA</h2>
        <h2>FAVORITO</h2>
      </div>
      <div className="cart-items">
        {cartWithQuantities.map(({ product, quantity }) => ( // Mapear los productos de la cesta
          <div key={product.id} className="cart">
            <img id="imagen-articulo-cesta" src={product.image1} alt={product.name} />
            <div>
              <h3 id='carrito-name-product'>{product.name}</h3>
              <p>{product.price} EUR x {quantity}</p> {/* Mostrar la cantidad del producto */}
            </div>
            <button id='button-eliminar' onClick={() => handleRemove(product.id)}>Eliminar</button>  {/* Eliminar productos no deseados */}
          </div>
        ))}
      </div>

      {/* Mostrar el total */}
      <div className="total">
        <h3>Total: {total.toFixed(2)} EUR</h3>
      </div>

      <button id="Button-Comprar" onClick={handlePurchase}>COMPRAR</button> {/* Una vez compre la cesta se vaciará */}
    </div>
  );
};

export default Cesta;
