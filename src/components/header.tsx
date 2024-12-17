import { useState } from "react"
import { FaHome, FaSearch, FaShoppingBasket, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import toast from "react-hot-toast"
 

interface PropsType {
    user:User | null
}

const Header = ({user}:PropsType) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const logoutHandler = async ()=>{
        try 
        {
            await signOut(auth)
            toast.success("Sign Out Successfully")
            setIsOpen(false)
        }
        catch (error: any)
        {
            toast.error(`SignOut Failed: ${error?.message || "Unexpected error occurred"}`)
        }
    }

  return (
    <nav className="header">
        <Link onClick={()=>setIsOpen(false)} to={"/"}> <FaHome/> Home </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/cart"}> <FaShoppingBasket/> Cart </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}> <FaSearch/> Search </Link>
            
           
    {
        user?._id?(
            <>
                <button onClick={()=>setIsOpen((prev)=>!prev)}>
                    <FaUser/>
                </button>

                <dialog open={isOpen}> 
                    <div>
                        {
                            user.role === "admin" &&  (
                                <Link onClick={()=>setIsOpen(false)} to="/admin/dashboard"> Admin</Link>
                            )
                        }
                    <Link onClick={()=>setIsOpen(false)} to ="/orders">Orders</Link>
                    <button onClick={logoutHandler}>
                        <FaSignOutAlt/>
                    </button>
                    </div>
                </dialog>

            </>

        ) : (<Link to={"/login"}> <FaSignInAlt /> Login </Link>)
    }
    </nav>
  )
}

export default Header