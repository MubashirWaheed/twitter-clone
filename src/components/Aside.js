import css from '../css/aside.module.css'
import Suggestions from './Suggestions'
import avi from '../images/twitter-login.png'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from '../Firebase/config';
const Aside = ()=>{
    const [follow, setFollow] = useState([]);
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
    useEffect(()=>{
        const getCurrentUser = async ()=>{
            const q = query(collection(db, "users"), where("uid", "==", uid));
            // console.log(uid);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=>{
                setFollow(()=>{
                    return [...doc.data().following]
                })
                console.log(doc.data().following);
            })        
        };
        getCurrentUser();
    },[])
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
            <Suggestions  follow={follow} uid={uid}/>
        </div>
    )
}
export default Aside