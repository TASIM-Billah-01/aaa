import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const googleProvider = new GoogleAuthProvider();
    const createUser = (email,password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
     useEffect(() => {
        const unsubs = onAuthStateChanged(auth, currentUser => {
            console.log("current user captured",currentUser)

            setUser(currentUser)
            if(currentUser?.email) {
                const user = {email : currentUser?.email};
                axios.post('http://localhost:5173/jwt', user, {withCredentials : true})
                .then(res => console.log("response ", res.data))
            }
            setLoading(false);
        })
        return () => {
            unsubs()
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        signOutUser,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;