import { auth,GoogleProvider } from "../config/firebase-config" 
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import {useState} from 'react'
import { async } from "@firebase/util";
export function Auth()
{
        const[email,SetEmail]=useState("");
        const[password,SetPassword]=useState("");

        const signIn= async()=>{
                try{
                        await createUserWithEmailAndPassword(auth,email,password) ;

                }
                catch(err){
                        console.log(err);
                }
        };
        const SignInwithGoogle =async()=>
        {
                try{
                        await signInWithPopup(auth,GoogleProvider)
                        console.log(auth?.currentUser?.photoURL);

                }
                catch(err)
                {
                        console.error(err);
                }
        }
        const SignOut=async()=>
        {
                
                try{
                        await signOut(auth)

                }
                catch(err)
                {
                        console.error(err);
                }
        }
        return (
                <div className="auth-inputs">
                <input placeholder="email..."  onChange={(e)=>SetEmail(e.target.value)}/>
                <input placeholder="password..." onChange={(e)=>SetPassword(e.target.value)}/>
                <button onClick={signIn}>Sign In</button>
                <button onClick={SignInwithGoogle}>Sign In With Google</button>
                <button onClick={SignOut}>SignOut</button>
        </div>
        )
        
}