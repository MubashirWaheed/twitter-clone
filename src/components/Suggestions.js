import { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase/config';

const Suggestions = ({follow, uid})=>{
    
    const [users ,setUsers] = useState([]);
    
    useEffect(()=>{
        // Should have stored user in context so that I don't have to make call to firetsore
        

        const getSuggestions = async ()=>{
            const q = query(collection(db, "users"), limit(9));
            const querySnapshot = await getDocs(q);
            return setUsers(()=>{
                return querySnapshot.docs.map((helo)=> ({...helo.data()}))
                .filter((profile)=> profile.uid !== uid && !follow.includes(profile.uid));
            })
        }
                
        // getCurrentUser()
        console.log('follow', follow)
        if(follow.length > 0){
            console.log('follow inside ', follow)
            getSuggestions()
        }
    },[follow])


    return (
        <>
            <h1>Suggestions</h1>
            {
                users.map((user)=>{
                    return<div>{user.name}</div>
                })
            }
        </>
    )
}

export default Suggestions;