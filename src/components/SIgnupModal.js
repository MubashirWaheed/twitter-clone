import css from '../css/signupModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const SignupModal = ({setSignupModal})=>{
    return (
        <div className={css.modalBackground}>
            <form method='POST' className={css.modalContainer}>
                <FontAwesomeIcon className={css.close} icon={faTimes} onClick={()=>{setSignupModal(false)}} title='Close'></FontAwesomeIcon>
                <FontAwesomeIcon className={css.icon} icon={faTwitter}></FontAwesomeIcon>
                <div className={css.wrapper}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" autoComplete='off' placeholder='Username'/>
                    <label htmlFor="displayName">Display Name</label>
                    <input type="text" name="displayName" autoComplete='off' placeholder='Display Name' />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='Emaiil' autoComplete='Off' />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='Password' id="password" />
                    <input type="submit" name="submit"  />
                </div>
            </form>
            
        </div>
    )
}
export default SignupModal