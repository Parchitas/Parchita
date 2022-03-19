import React, { useState, createContext } from 'react';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db, googleProvider, facebookProvider, twitterProvider, githubProvider} from '../../src/firebase/credenciales';
import { doc, setDoc } from "firebase/firestore";

export const sessionContext = createContext();

export default function SessionProvider (props){

    const [session, setSession] = useState(null);

    const login = (event) => {
        
        console.log(event)

        // try {
        //     const infoUsuario = await signInWithEmailAndPassword(auth, email, password)
        //     setSession({
        //         id: infoUsuario.user.uid,
        //         correo: email,
        //     })

        // } catch (e) {
        //     console.error("Error: ", e)
        // }
    }

    const register = async (name,email,password,rol) => {
        
        try {
            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "usuarios", infoUsuario.user.uid), {name, correo:email, rol});

            setSession({
                id: infoUsuario.user.uid,
                name,
                correo: email,
                rol,
            })
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
    }

    const isLoggedIn = session !== null;

    const isAdmin = isLoggedIn && session.rol === "admin";

    return(

        <sessionContext.Provider  value={{session, setSession, login, register, isLoggedIn, isAdmin}}>
            {props.children}
        </sessionContext.Provider>

    )
}
