import React, { useEffect, useState } from "react";
import css from '../css/login.module.css'
import loginImage from '../images/twitter-login.png'
import SignInModal from "./SigninModal";
import SignupModal from "./SignupModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const uid = JSON.parse(localStorage.getItem("currentUser"));
    const [signinModal, setSigninModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false)
    useEffect(()=>{
        if(uid !== null){
            navigate('/')
        }
    },[])
    
    // signInWithEmailAndPassword    
    return(
        <div className={css.container}>
            <div className={css.imageWrapper}>
                <img className={css.banner} src={loginImage} alt="login banner" />
                <FontAwesomeIcon className={css.twIcon} icon={faTwitter} ></FontAwesomeIcon>
            </div>
            <div className={css.content}>
                <FontAwesomeIcon className={css.contentIcon} icon={faTwitter}></FontAwesomeIcon>
                <h1>Happening now</h1>
                <div className={css.innerContent}>
                    <h3>Join Twitwer today.</h3>
                    <div className={css.btnWrapper}>
                        <button className={css.signUpGoogle}>Sign up with google</button>
                        <p>or</p>
                        <button className={css.signupBtn} onClick={()=>{setSignupModal(true)}}>Sign up</button>
                        <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. </p>
                    </div>
                    {signupModal && <SignupModal setSignupModal={setSignupModal} /> }
                    <div className={css.signinWrapper}>
                        <h4>Already have an account?</h4>
                        <button className={css.signin} onClick={()=>setSigninModal(!signinModal)}>Sign in</button>
                    </div>
                    {signinModal && <SignInModal setSigninModal={setSigninModal}  />}
                </div>
            </div>
        </div>
    )
}
export default Login