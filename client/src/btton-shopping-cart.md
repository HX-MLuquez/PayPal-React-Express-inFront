# Agregar un icono de carrito de compras usando Font Awesome

1. Instalar la biblioteca Font Awesome 
```sql
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/react-fontawesome
```
2. Importa el icono de carrito de compras en el componente donde quieras mostrar el botón.
```javascript
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
```
3. Agrega el botón con el icono de carrito de compras.
```javascript
function CartButton() {
  return (
    <button>
      <FontAwesomeIcon icon={faShoppingCart} />
      Add to Cart
    </button>
  );
}
```