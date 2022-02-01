import React from "react";
import css from '../css/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

import loginImage from '../images/twitter-login.png'

const Login = () => {
    return(
        <>
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
                        <a href="#">Sign up with google</a>
                        <p>or</p>
                        <button className={css.signupBtn}>Sign up</button>

                    </div>
                    {/* <button>Sign up with google</button> */}
                    <p>By signing up, you agree to the Terms of Service and Privacy 
                    <p>
                        Policy, including Cookie Use.</p>
                    </p>
                    <h3>Already have an account?</h3>
                    <button>Sign in</button>
                </div>
            </div>
        </div>
        {/* <p>Made by </p> */}
        </>
    )
}
export default Login