import React, { useState, createContext } from 'react';

export const sessionContext = createContext();

export default function SessionProvider (props){

    const [session, setSession] = useState(null);

    return(
        <sessionContext.Provider  value={[session, setSession]}>
            {props.children}
        </sessionContext.Provider>
    )
}
