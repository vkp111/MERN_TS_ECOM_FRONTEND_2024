import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {lazy, Suspense, useEffect} from 'react'
import Loader from "./components/loader"
import Header from "./components/header"
// import OrderDetails from "./pages/order-details"
// import Orders from "./pages/orders"
// import Shipping from "./pages/shipping"
import { Toaster } from "react-hot-toast"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { userExist, userNotExist } from "./redux/reducer/userReducer"
import { useDispatch } from "react-redux"
import { getUser } from "./redux/api/userAPI"
import { useSelector } from "react-redux"
// import { UserReducerInitialState } from "./types/reducer-types"
import ProtectedRoute from "./components/protected-route"
import { RootState } from "./redux/store"




// component import b4 lazy as normal importing
// import Home from "./pages/home"
// import Search from "./pages/search"
// import Cart from "./pages/cart"

// Componnets imported with lazy - Dynamic Importing
const Home = lazy(()=>import ("./pages/home"))
const Search = lazy(()=>import ("./pages/search"))
const Cart = lazy(()=>import ("./pages/cart"))
const Shipping = lazy(()=>import("./pages/shipping"))
const Login = lazy(()=>import("./pages/login"))
const Orders = lazy(()=>import("./pages/orders"))
const OrderDetails = lazy(()=>import("./pages/order-details"))
const NotFound = lazy(()=>import("./pages/not-found"))
const Checkout = lazy(()=>import("./pages/checkout"))


// Admin Routes Imported Directly
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {


  const {user, loading} = useSelector((state: RootState) => state.userReducer)

  // return signOut(auth).then((c)=>console.log("Done"))
  // if url does not load after render.com upload, it will work in int explorer and not in chrome, so comment the const{user,loading } line and also the whole useEffect() code first and uncomment the return signout line, once done, check the console,if Done is written in browser console, then ok, again uncomment the const{user,loading } line and also the whole useEffect() codeand comment the return signout line

  const dispatch = useDispatch()
  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user)
      {
        const data = await getUser(user.uid)
        console.log("Logged In")
        dispatch(userExist(data.user))
      }
      else
      {
        dispatch(userNotExist())
        console.log("Not Logged In")
      }
    })
  }, [dispatch])







  return loading? <Loader/> : 
  (
    <Router>
     {/* Header */}
     <Header user={user} />
     
       <Suspense fallback ={<Loader/>}>
         <Routes> 
           {/* Home - NO LOGIN REQUIRED */}   
           <Route path='/' element={<Home/>} />
           <Route path='/home' element={<Home/>} />

           {/* Search - NO LOGIN REQUIRED */}
           <Route path='/search' element={<Search/>} />

           {/* Cart - NO LOGIN REQUIRED */}
           <Route path='/cart' element={<Cart/>} />

           {/* Login - IF  NOT LOGGED IN */}
           <Route path='/login' element={
            <ProtectedRoute isAuthenticated = {user ? false : true}>
              <Login/>
            </ProtectedRoute>
           } 
           />

           {/* Shipping - LOGIN REQUIRED */}
           <Route element = {<ProtectedRoute isAuthenticated = {user ? true : false}/>}>
           <Route path='/shipping' element={<Shipping/>} />
           <Route path='/orders' element={<Orders/>} />
           <Route path='/order/:id' element={<OrderDetails/>} />
           <Route path='/pay' element={<Checkout />} />
           </Route>


           {/* Admin Routes */}
          <Route
            element={ 
              <ProtectedRoute 
              isAuthenticated={true} 
              adminOnly={true} 
              admin={user?.role==="admin" ? true: false} 
              />
          }
          >
           <Route path="/admin/dashboard" element={<Dashboard />} />
           <Route path="/admin/product" element={<Products />} />
           <Route path="/admin/customer" element={<Customers />} />
           <Route path="/admin/transaction" element={<Transaction />} />

           {/* Admin Routes/Charts */}
           <Route path="/admin/chart/bar" element={<Barcharts />} />
           <Route path="/admin/chart/pie" element={<Piecharts />} />
           <Route path="/admin/chart/line" element={<Linecharts />} />

           {/* Admin Routes/Apps */}
           <Route path="/admin/app/coupon" element={<Coupon />} />
           <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
           <Route path="/admin/app/toss" element={<Toss />} />

           {/* Admin Routes/Management */}
           <Route path="/admin/product/new" element={<NewProduct />} />
           <Route path="/admin/product/:id" element={<ProductManagement />} />
           <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
           </Route>

           <Route path="*" element={<NotFound />}/>
         </Routes>
       </Suspense>

       <Toaster position="bottom-center"/>

    </Router>
 )
}

export default App