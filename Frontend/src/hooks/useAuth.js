import {useSelector,useDispatch} from "react-redux"
import {logout} from "../store/Slices/authSlices.js"

const useAuth=()=>{
    const dispatch=useDispatch()
    const { user,token,loading,error }=useSelector((state)=>state.auth)

    const isLoggedIn=!!token
    const isAdmin=user?.role==="admin"
    const handleLogout=()=>{
        dispatch(logout())
    }
    return {user,token,loading,error,isLoggedIn,isAdmin,handleLogout}
}
export default useAuth