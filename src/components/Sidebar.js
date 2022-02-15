import { useEffect, useLayoutEffect, useState } from 'react'
import css from '../css/sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFeather } from '@fortawesome/free-solid-svg-icons'
import avatar from '../images/twitter-login.png'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../Firebase/config';


const Sidebar = ()=>{
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    const [user, setUser] = useState('');
    useLayoutEffect(()=>{
        window.addEventListener("resize",()=>{
            setWidth(window.innerWidth);
        })
    });

    useEffect(()=>{
        const docRef = doc(db, "users", uid);
        const getUser = async ()=>{
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            if(docSnap.exists){
                setUser(()=>{
                    return {...docSnap.data()};
                })
            }
        }
        if(!user){
            getUser();
        }
    
    },[]);

    return (
        <div className={css.container}>
            <FontAwesomeIcon className={css.twitterIcon} icon={faTwitter}></FontAwesomeIcon>
            <div className={css.iconWrapper}>
                <div className={css.div1}>
                    <FontAwesomeIcon className={css.icon} icon={faHome}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faBell}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faEnvelope}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faBookmark}></FontAwesomeIcon>
                    <FontAwesomeIcon className={css.icon} icon={faUser}></FontAwesomeIcon>
                </div>
                {width > 800 && <div className={css.div2}>
                    <p>Home</p>
                    <p>Notifications</p>
                    <p>Messages</p>
                    <p>Bookmark</p>
                    <p>Profile</p>
                </div>
                }
            </div>
            {width > 800 && <button className={css.tweetBtn}>Tweet</button>}
            {width < 800 && <FontAwesomeIcon className={css.feather} icon={faFeather}></FontAwesomeIcon>}
            <div className={css.user}>
                <img className={css.avatar} src={avatar} alt="avatar" />
                {width > 800 && 
                <div className={css.nameWraper}>
                    <h4>{user.name}</h4>
                    <p>@{user.username}</p>
                </div>
                }
            </div>
        </div>
    )
}
export default Sidebar 