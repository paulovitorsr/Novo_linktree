import {ReactNode, useState, useEffect} from "react"

import { Auth } from "../Services/FirebaseConection";
import {onAuthStateChanged} from 'firebase/auth';
import { Navigate } from "react-router-dom";

interface PrivateProp{
    children: ReactNode;
}

export const Private = ({children}: PrivateProp) => {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect( () => {
        const unsub = onAuthStateChanged(Auth, (user) => {
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@linkTree", JSON.stringify(userData))
                setLoading(false);
                setSigned(true);

            }else{
                setLoading(false);
                setSigned(false);
            }
        })

        return () => {
            unsub();
        }
        
    }, [] )

    if (loading) {
        return <div></div>
    }

    if(!signed){
        return <Navigate to="/login" />
    }

  return children;
}
