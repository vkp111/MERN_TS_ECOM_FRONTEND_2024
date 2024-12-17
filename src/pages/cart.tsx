import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/cart-items";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../redux/store";


const Cart = () => {

  const {cartItems,subtotal, tax, total, shippingCharges, discount} = useSelector((state:{
    cartReducer:CartReducerInitialState
  }) => state.cartReducer
)

  const dispatch = useDispatch()

  const[coupanCode, setCoupanCode] = useState<string>("")
  
  const[isValidCoupanCode, setIsValidCoupanCode] = useState<boolean>(false)

  const incrementHandler=(cartItem:CartItem)=>{

    if (cartItem.quantity >= cartItem.stock)
      return
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}))
  }

  const decrementHandler=(cartItem:CartItem)=>{

    if (cartItem.quantity <= 1)
      return
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}))
  }

  const removeHandler=(productId: string)=>{
    dispatch(removeCartItem(productId))
  }
  



  useEffect(()=>{

    const {token : cancelToken, cancel} = axios.CancelToken.source()

    const timeOutID = setTimeout(()=>{

      axios.get(`${server}/api/v1/payment/discount?coupon=${coupanCode} `, {cancelToken}).then ((res) => {
        // console.log(res)
        dispatch(discountApplied(res.data.discount))
        setIsValidCoupanCode(true)
        dispatch(calculatePrice())
      })
      .catch(() => {
        dispatch(discountApplied(0))
        setIsValidCoupanCode(false)
        dispatch(calculatePrice())
      }) 
    }, 1000)

    return()=>{
      clearTimeout(timeOutID)
      cancel()
      setIsValidCoupanCode(false)  
    }
  }, [coupanCode] )

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])
  


  return (
    <div className="cart">
      <main>

        {
          // if length of cartitems is greater then 0 ?i.e. then  
          cartItems.length > 0 ? cartItems.map((i,idx)=> (
            <CartItemCard 
            incrementHandler={incrementHandler}
            decrementHandler={decrementHandler} 
            removeHandler={removeHandler}
            key={idx} 
            cartItem={i} />
          ))
          // colon stands for otherwise
          :
          <h1> No Items Added </h1>

        }


      </main>
      <aside>
        <p> Subtotal: ${subtotal}</p>
        <p> shipping Charges: ${shippingCharges}</p>
        <p> Tax: ${tax}</p>
        <p> 
          Discount:  <em className="red"> -  ${discount} </em>
        </p>
        <p>
          <b> Total: ${total}</b>
        </p>
        <input 
          type='text' 
          value={coupanCode}
          placeholder="Coupan Code" 
          onChange={(e) => setCoupanCode(e.target.value)}
        />

        {

          coupanCode && 
            ( isValidCoupanCode ? 
              (
                <span className="green">
                  ${discount} off using the <code> {coupanCode}</code>
                </span> 
              )
              :
              (  
                  <span className="red"> 
                    Invalid Coupan <VscError/> 
                  </span>
              )
            )
        } 

        {
          cartItems.length > 0 && <Link to='/shipping'> Checkout </Link>
        }
        
      </aside>
    </div>
  )
}

export default Cart