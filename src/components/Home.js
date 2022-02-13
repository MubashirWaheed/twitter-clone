import { useLayoutEffect,useState } from 'react'
import css from '../css/home.module.css'
import Sidebar from "./Sidebar"
import Tweet from './Tweet'
import Feed from './Feed'
import Aside  from './Aside'

const Home = () => {
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    
    useLayoutEffect(()=>{
        window.addEventListener("resize",()=>{
            setWidth(window.innerWidth);
        })
    });

    return (
        <div className={css.container}>
            <Sidebar/>
            <div className={css.main}>
                <h2>Home</h2>
                <Tweet />
                <Feed/>
            </div>
            {width > 800 && <Aside />}
        </div>
    )
}
export default Home