import css from '../css/feed.module.css'
import { useEffect, useState } from 'react';
import { db } from '../Firebase/config';
import { collection, onSnapshot, getDocs, query, where } from 'firebase/firestore';

const Feed = ()=>{
    const [tweets , setTweets] = useState([]);
    const following = [];
    const uid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
    // console.log(uid);
    const getFollowing = async ()=>{
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            following.push(doc.data().following);
            // console.log(doc.data().following);
        })
    }
    
    const getTweets = ()=>{
        console.log(following);
        const q = query(collection(db, "tweets"), where("creatorId", "in", following[0]));
        onSnapshot(q, (querySnapshot) => {
            setTweets([]);
            querySnapshot.forEach((doc)=>{
                setTweets((testtweets)=>{
                    return [...testtweets, doc.data()]
                })
            })
        })
    }

    useEffect(()=>{
        const getData = async ()=>{
            await getFollowing();
            getTweets();
        }
        getData()
    },[])
    
    return (
        <div className={css.conatiner}>
            {
                tweets.map((item)=>{
                    return (
                        <p key={item.id}>{item.tweet}</p>
                    )
                })
            }
            <h1>Feed</h1>
        </div>
    )
}
export default Feed