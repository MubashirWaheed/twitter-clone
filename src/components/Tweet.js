import css from '../css/tweet.module.css'
import avatar from '../images/twitter-login.png'
const Tweet = ()=>{
    return (
        <div className={css.container}>
            <img className={css.avatar} src={avatar} alt="avatar" />
            <form action="POST" className={css.tweetcontainer}>
                <textarea placeholder="What's happening?"/>
                <button>Tweet</button>
            </form>
        </div>
    )
}
export default Tweet