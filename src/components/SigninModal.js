import css from '../css/signinModal.module.css'
import { useState } from 'react';
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
            const credentials = await signInWithEmailAndPassword(auth,email, password)
            console.log(credentials);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className={css.modalBackground}>
            <form method='POST' onSubmit={signup} className={css.modalContainer}>
                <FontAwesomeIcon className={css.close} icon={faTimes} onClick={()=>{setSigninModal(false)}} title='Close'></FontAwesomeIcon>
                <FontAwesomeIcon className={css.icon} icon={faTwitter}></FontAwesomeIcon>
                <div className={css.wrapper}>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleData} name="email" id="email" placeholder='Emaiil' autoComplete='Off' />
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={handleData} name="password" placeholder='Password' id="password" />
                    <input type="submit" name="submit"  />
                </div>
            </form>
            
        </div>
    )
}
export default SignInModal