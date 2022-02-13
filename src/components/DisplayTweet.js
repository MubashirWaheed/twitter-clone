import css from '../css/displayTweet.module.css'
import Avi from '../images/twitter-login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faRetweet  } from '@fortawesome/free-solid-svg-icons';

const DisplayTweet = ({item})=>{
    return(
        <div  className={css.container}> 
            <img className={css.avi} src={Avi} alt="avi" />
            <div className={css.wrapper}>
                <div className={css.userName}>
                    <h3>{item.name}</h3>
                    <p>@{item.username}</p>
                </div>
                <p >{item.tweet}</p>
                <div className={css.iconWrapper}>
                    <FontAwesomeIcon className={css.icon} icon={ faComment } />
                    <FontAwesomeIcon className={css.retweet} icon={ faRetweet } />
                    <FontAwesomeIcon className={css.icon} icon={ faHeart } />
                </div>
            </div>
        </div>
    )
}

export default DisplayTweet;