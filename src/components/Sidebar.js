import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import css from '../css/sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import avatar from '../images/twitter-login.png'


const Sidebar = ()=>{
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    useLayoutEffect(()=>{
        window.addEventListener("resize",()=>{
            setWidth(window.innerWidth);
        })
    })
    return (
        <div className={css.container}>
            <h1>Sidebar</h1>
            <FontAwesomeIcon className={css.twitterIcon} icon={faTwitter}></FontAwesomeIcon>
            <div className={css.iconWrapper}>
                <div className={css.div1}>
                    <FontAwesomeIcon className={css.icon} icon={faHome}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faBell}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faEnvelope}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faBookmark}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faUser}></FontAwesomeIcon>
                </div>
                {width > 550 && <div className={css.div2}>
                    <p>Home</p>
                    <p>Notifications</p>
                    <p>Messages</p>
                    <p>Bookmark</p>
                    <p>Profile</p>
                </div>
                }
            </div>
            <button>Tweet</button>
            <div className={css.user}>
                <img class={css.avatar} src={avatar} alt="avatar" />
                <div>
                    <p>Mubashir</p>
                    <p>@Mubahsir</p>
                </div>
            </div>
        </div>
    )
}
export default Sidebar 