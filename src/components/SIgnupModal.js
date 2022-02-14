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
            console.log(test);
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

                // Add a new user in firestore .
                await addDoc(collection(db, "users"), {
                    name: formData.name,
                    username: `@${formData.username}`,
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

    return (
        <div className={css.modalBackground}>
            <form method='POST'  className={css.modalContainer} id="signUp">
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
                    />
                    {usernameError && <div>{usernameError}</div>}
                    <label htmlFor="displayName">Display Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoComplete='off' 
                        placeholder='Display Name' 
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='Email' 
                        autoComplete='off' 
                    />
                    {emailError && <div>{emailError}</div>}
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password" 
                        name="password" 
                        placeholder='Password' 
                        id="password" 
                    />
                    <input 
                        onClick={handleSignUp}
                        type="submit" 
                        name="submit"  
                    />
                </div>
            </form>
        </div>
    );
}

export default SignupModal
