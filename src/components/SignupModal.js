import css from '../css/signupModal.module.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '../Firebase/config';
import { collection, query, where,getDocs, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignupModal = ({setSignupModal})=>{
    const [usernameError, setUsernameError] = useState();
    const [ emailError , setEmailError] = useState();
    const [formData, setFormData] = useState(
        {username:null, name: "",email: "", password:"" }
    );
    
    let navigate = useNavigate();

    let test = null; 

    // Writing to form state 
    const handleChange = (e)=>{
        if(usernameError || emailError){
            setUsernameError('');
            setEmailError('');
        };

        setFormData((prevData)=>{
            return{
                ...prevData,
                [e.target.name]:e.target.value 
            }
        });
    };
    
    const handleSignUp = async (e)=>{
        e.preventDefault();
        // Reading users in firebase to check if username present
        const q = query(collection(db, "users"), where("username", "==", formData.username));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            test = doc.data(); 
        });

        // If username present set errror and return 
        if (test != null){
            setUsernameError("Username already in use");
            return; 
        }else{
            try{
                // Create a newuser in firestore 
                const newUser = await createUserWithEmailAndPassword(auth, formData.email ,formData.password);
                localStorage.setItem("currentUser",JSON.stringify(newUser));
                console.log('newUser',newUser.user);
                // Add a new user in firestore .
                await addDoc(collection(db, "users"), {
                    name: formData.name,
                    username: `${formData.username}`,
                    uid:newUser.user.uid,
                    following:["wpLesz9IbzgxuHmW4Weba2EJTW53"],
                    followers:[]
                });

                navigate('/');

            }catch(error){
                // If user present with that email => set email error 
                setEmailError('email already in use');
            }
        }
    }
    const closeOnBackground = (e)=>{
        if(e.target.id === "background"){
            setSignupModal(false);
        }
    } 

    return (
        <div className={css.modalBackground} id="background" onClick={closeOnBackground}>
            <form method='POST'  className={css.modalContainer} id="signUp" onSubmit={handleSignUp}>
                <FontAwesomeIcon className={css.close} icon={faTimes} onClick={()=>{setSignupModal(false)}} title='Close'></FontAwesomeIcon>
                <FontAwesomeIcon className={css.icon} icon={faTwitter}></FontAwesomeIcon>
                <div className={css.wrapper}>
                    <label htmlFor="username">Username</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        name="username"
                        id="username"
                        autoComplete='off'
                        placeholder='Username'
                        required
                    />
                    {usernameError && <div>{usernameError}</div>}
                    <label htmlFor="displayName">Display Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoComplete='off' 
                        placeholder='Display Name' 
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='Email' 
                        autoComplete='off'
                        required 
                    />
                    {emailError && <div>{emailError}</div>}
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password" 
                        name="password" 
                        placeholder='Password' 
                        id="password"
                        required
                    />
                    <input 
                        type="submit" 
                        name="submit"  
                    />
                </div>
            </form>
        </div>
    );
}

export default SignupModal
