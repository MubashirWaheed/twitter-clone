import css from '../css/aside.module.css'
import avi from '../images/twitter-login.png'
const Aside = ()=>{
    return(
        <div className={css.container}>
            <input className={css.search} type="text" title='Disabled for now' disabled placeholder='Search' />
            <div className={css.wrapper}>
                <h2>Who to follow</h2>
                <div className={css.users}>
                    <img  className={css.avi} src={avi} alt="avi" />
                    <div className={css.user}>
                        <h4>Jason Roy</h4>
                        <p>@JasonRoy</p>
                    </div>
                    <button className={css.follow}>Follow</button>
                </div>
            </div>
        </div>
    )
}
export default Aside