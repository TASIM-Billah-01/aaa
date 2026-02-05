import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SocialLoin = () => {
    const {signInWithGoogle} = useContext(AuthContext)
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(res => {
            console.log("resultUSer", res.user)
        }).catch(error => {
            console.log(error.message);
            
        })
    }
    return (
        <div>
            <div className="border-2">OR</div>
            <button onClick={handleGoogleSignIn}>SIgn in with google</button>
        </div>
    );
};

export default SocialLoin;