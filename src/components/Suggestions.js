import { useEffect, useState, useRef} from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { doc, updateDoc} from "firebase/firestore";
import { db } from '../Firebase/config';
import avi from '../images/twitter-login.png'
import css from '../css/aside.module.css'

const Suggestions = ({follow, uid})=>{
    
    const [users ,setUsers] = useState([]);
    let mountedRef = useRef(true)
    let followingList = [...follow]

    const updateData = async (profile)=>{
        // Updating following array in firestore 
        const washingtonRef = doc(db, "users", uid);
        await updateDoc(washingtonRef, {
                following: [...followingList, profile.uid]
            })

        // Removing user from state 
        setUsers((prev)=>{
            return prev.filter((item)=>{
                return item.uid !== profile.uid
            })
        })
        // Make sure feed is updated
    }

    useEffect(()=>{
        // Should have stored user in context so that I don't have to make call to firetsore    
        // Getting list of user that can be followed (not present in following list and not current user)
        const getSuggestions = async ()=>{
            const q = query(collection(db, "users"), limit(4));
            const querySnapshot = await getDocs(q);
            return setUsers(()=>{
                return querySnapshot.docs.map((helo)=> ({...helo.data()}))
                .filter((profile)=> profile.uid !== uid && !follow.includes(profile.uid));
            })
        }                

        if(follow.length > 0 ){
            getSuggestions()
        }
        return () => { 
            mountedRef.current = false
          }

    },[follow])


    return (
        <>
            <h2>Who to follow</h2>
            <div className={css.wrapper}>
            {    
                users.map((user)=>{
                    return(
                        <>
                            <div className={css.users}>
                                <img  className={css.avi} src={avi} alt="avi" />
                                <div className={css.user}>
                                    <h4>{user.name}</h4>
                                    <p>{user.username}</p>
                                </div>
                                <button 
                                    className={css.follow}
                                    onClick={()=>{
                                            updateData(user)
                                        }}
                                    >
                                        Follow
                                </button>

                            </div>
                        </>
                    )
                    
                })
            }
            </div>
        </>
    )
}

export default Suggestions;