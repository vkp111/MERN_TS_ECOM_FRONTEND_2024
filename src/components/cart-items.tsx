import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { server } from "../redux/store"
import type { CartItem } from "../types/types"
// import { CartItem } from "../types/types"

type CartItemProps = {
  cartItem: CartItem
  incrementHandler: (cartItem: CartItem) => void
  decrementHandler: (cartItem: CartItem) => void
  removeHandler: (id: string) => void
}



const CartItem = ({cartItem, incrementHandler, decrementHandler, removeHandler}: CartItemProps) => {

    // productId: "sajgfje",
    // photo: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX522_.jpg",
    // name: "McBook",
    // price:30000,
    // quantity:4,
    // stock:4
  const {photo, productId, name, price, quantity} = cartItem;

  return (
    
    <div className="cart-item">
        <img src={`${server}/${photo }`} alt={name}/>
        <article>
          <Link to={`/product/${productId}`}> {name} </Link>  
          <span> ${price} </span>
        </article>

        <div>
          <button onClick={() => decrementHandler(cartItem)}> - </button>
          <p>{quantity}</p>
          <button onClick={() => incrementHandler(cartItem)}> + </button>
        </div>

        <button onClick={() => removeHandler(productId)}>
          <FaTrash/>
        </button>
    </div>
  )
  }

export default CartItem