import { useCallback, useEffect, useLayoutEffect,useState } from 'react'
import css from '../css/home.module.css'
import Sidebar from "./Sidebar"
import Tweet from './Tweet'
import Feed from './Feed'
import Aside  from './Aside'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    const uid = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
    
    const innerWidthSet = useCallback(()=>{
        setWidth(window.innerWidth)
    },[])

    useLayoutEffect(()=>{
        window.addEventListener("resize",innerWidthSet)
        return ()=>{
            window.removeEventListener('resize',innerWidthSet);
        }
    });
    
    useEffect(()=>{
        if(uid == null){
            navigate('/login')
        }        
    },[])

    return (
        <div className={css.container}>
            {uid && <Sidebar/>}
            <div className={css.main}>
                <h2>Home</h2>
                { uid && <Tweet />}
                {uid && <Feed/>}
            </div>
            {width > 800 && uid && <Aside />}
        </div>
    )
}
export default Home