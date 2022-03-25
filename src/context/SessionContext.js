import React, { useState, createContext } from 'react';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db} from '../../src/firebase/credenciales';
import { doc, setDoc, getDoc } from "firebase/firestore";

const usersCollection = "usuarios";
export const sessionContext = createContext();

export default function SessionProvider (props){

    const [session, setSession] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const login = async (email,password) => {

        setLoading(true);

        try {

            const infoUsuario = await signInWithEmailAndPassword(auth, email, password);
            const docRef = doc(db, usersCollection, infoUsuario.user.uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();

            setSession({
                id: infoUsuario.user.uid,
                correo: email,
                name: userData.name,
                rol: userData.rol
            })

        } catch (e) {
            console.error("Error: ", e)
        }

        setLoading(false);
    }

    const register = async (name,email,password,rol) => {
        
        setLoading(true);
        
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

        setLoading(false);
        
    }

    const sessionCheckLogin = async (response) => {
 
        setLoading(true);

        setSession({
            id: response.user.uid,
            correo: response.user.email,
            name: response.user.displayName,
        })

        setLoading(false);
        
    }
    
    const sessionCheckRegister = async (response) => {
        
        setLoading(true);

        // await setDoc(doc(db, "usuarios", response.user.uid), {name, correo:email, rol});

        // setSession({
        //     id: response.user.uid,
        //     correo: response.user.email,
        //     name: response.user.displayName,
        //     rol: "usuario",
        // })
            
        setLoading(false);
    }

    const isLoggedIn = session !== null;

    const isAdmin = isLoggedIn && session.rol === "admin";


    return(

        <sessionContext.Provider  value={{session, setSession, login, register, isLoggedIn, sessionCheckLogin, sessionCheckRegister, isAdmin, isLoading}}>
            {props.children}
        </sessionContext.Provider>

    )
}
