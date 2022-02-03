import css from '../css/signinModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const SignInModal = ({setSigninModal})=>{
    return (
        <div className={css.modalBackground}>
            <form method='POST' className={css.modalContainer}>
                <FontAwesomeIcon className={css.close} icon={faTimes} onClick={()=>{setSigninModal(false)}} title='Close'></FontAwesomeIcon>
                <FontAwesomeIcon className={css.icon} icon={faTwitter}></FontAwesomeIcon>
                <div className={css.wrapper}>
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
export default SignInModal