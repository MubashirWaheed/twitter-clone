import css from '../css/feed.module.css'
import { useEffect, useState } from 'react';
import DisplayTweet from "./DisplayTweet";
import { db } from '../Firebase/config';
import { collection, onSnapshot, getDocs, query, where,orderBy } from 'firebase/firestore';

const Feed = ()=>{
    const [tweets , setTweets] = useState([]);
    const following = [];
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
 
    useEffect(()=>{
        let unsub;
        const getData = async ()=>{
            // Reading following array from firestore if following array empty
            if(following.length < 1 ){
                const q = query(collection(db, "users"), where("uid", "==", uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc)=>{
                    following.push(doc.data().following);
                });
            };
            // Querying tweets from firestore
            const k = query(collection(db, "tweets"), orderBy("timeStamp", "desc"),where("creatorId", "in", following[0]));
            unsub = onSnapshot(k, (snapshot) => {
                setTweets([]);
                snapshot.forEach((doc)=>{
                    setTweets((testtweets)=>{
                        return [...testtweets, doc.data()]
                    });
                });
            });
        }
        
        getData();

        // removing listener when feed component is unmounted
        return ()=> unsub?.();
    },[])
    
    return (
        <div className={css.conatiner}>
            {
                tweets.map((item)=>{
                    return (
                        <div key={item.uuid}>
                            <DisplayTweet  item={item}/>
                        </div>
                    );
                })
            }
        </div>
    )
}
export default Feed