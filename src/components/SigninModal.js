import css from '../css/signinModal.module.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInModal = ({setSigninModal})=>{
    const [formData, setFormData] = useState(
        { email: "", password: ""}
        )
    let navigate =  useNavigate();
    
    const handleData = (e)=>{
        setFormData((prevData)=>{
            return {
                ...prevData,
                [e.target.name] : e.target.value
            }
        })
    }
    
    const signup = async (e) =>{
        e.preventDefault();
        const {email, password} = formData;
        try{
            const user = await signInWithEmailAndPassword(auth,email, password);
            localStorage.setItem("currentUser",JSON.stringify(user));
            console.log(user);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    const closeOnBackground = (e)=>{
        if(e.target.id === "background"){
            setSigninModal(false);
        }
    } 

    return (
        <div className={css.modalBackground} id="background" onClick={closeOnBackground}>
            <form method='POST' onSubmit={signup} className={css.modalContainer}>
                <FontAwesomeIcon className={css.close} icon={faTimes} onClick={()=>{setSigninModal(false)}} title='Close'></FontAwesomeIcon>
                <FontAwesomeIcon className={css.icon} icon={faTwitter}></FontAwesomeIcon>
                <div className={css.wrapper}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        onChange={handleData} 
                        name="email" 
                        id="email" 
                        placeholder='Email' 
                        autoComplete='Off'
                        required
                     />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        onChange={handleData} 
                        name="password" 
                        placeholder='Password' 
                        id="password"
                        required
                    />
                    <input type="submit" name="submit"  />
                </div>
            </form>
            
        </div>
    )
}
export default SignInModal