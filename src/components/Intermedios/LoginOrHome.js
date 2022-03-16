import React from 'react'
import Login from "../Logueo/Login"
import Home from "../General/Home"
const LoginOrHome = (props) => {
    const user = props.user;
    function LogHom(){
        if (user==null){
            return <Login/>
        }else{
            return <Home/>
    
        }

    }
    console.log("Mensaje"+user)
     return(
        
        LogHom()
     )
    
   
  
  }


export default LoginOrHome