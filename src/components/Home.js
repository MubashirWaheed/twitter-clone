import css from '../css/home.module.css'
import Sidebar from "./Sidebar"
import Tweet from './Tweet'
import Feed from './Feed'
import Aside  from './Aside'

const Home = () => {
    return (
        <div className={css.container}>
            <Sidebar/>
            <div className={css.main}>
                <header>Home</header>
                <Tweet />
                <Feed/>
            </div>
            <Aside />
        </div>
    )
}
export default Home