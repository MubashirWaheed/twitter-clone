import css from '../css/tweet.module.css'
import { useState } from 'react';
import avatar from '../images/twitter-login.png'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/config';
import { v4 as uuidv4 } from 'uuid';

const Tweet = ()=>{
    const [tweet, setTweet] = useState();
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;

    const sendData = async (e)=>{
        e.preventDefault();
        await addDoc(collection(db, "tweets"), {
            tweet: tweet,
            creatorId: uid,
            timeStamp: new Date(),
            uuid: uuidv4()
        });
        console.log('data written');
        setTweet("");
    }

    return (
        <div className={css.container}>
            <img className={css.avatar} src={avatar} alt="avatar" />
            <form action="POST" onSubmit={sendData} className={css.tweetcontainer}>
                <textarea 
                    className={css.textarea} 
                    value={tweet} 
                    placeholder="What's happening?"
                    onChange={(e)=>{setTweet(e.target.value)}} 
                />
                <input type="submit" name="submit" id="submit"value="tweet" />
            </form>
        </div>
    )
}
export default Tweet