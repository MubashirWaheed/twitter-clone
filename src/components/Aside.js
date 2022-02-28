import css from '../css/aside.module.css'
import Suggestions from './Suggestions'
import { useEffect, useState, useRef } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase/config';
const Aside = ()=>{
    const [follow, setFollow] = useState([]);
    let mountedRef = useRef(true);
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;

    useEffect(()=>{
        const getCurrentUser = async ()=>{
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=>{
                setFollow(()=>{
                    return [...doc.data().following]
                })
            })        
        };
        getCurrentUser();
        return ()=>{
            mountedRef.current = false
        }
    },[])

    return(
        <div className={css.container}>
            <input 
                className={css.search}
                type="text" 
                title='Disabled for now' 
                placeholder='Search'
                disabled 
             />
            <Suggestions  follow={follow} uid={uid}/>
        </div>
    )
}
export default Aside