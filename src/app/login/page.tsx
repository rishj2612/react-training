'use client'

import { SubmitEvent, useEffect, useRef, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTitle } from "@/hooks/useTitle";
import { useStore,useSelector } from 'react-redux';
import { AppState } from "@/redux/store";
export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const store = useStore();
    const userNameRef = useRef<HTMLInputElement>(null);
    const userPswdRef = useRef<HTMLInputElement>(null);
    const auth = useSelector((state:AppState)=>state.auth);
    useTitle("Login");
    //console.log("login rendered");
    //invoked once on component mount
    useEffect(() => {
        // if(auth && auth.isAuthenticated){
        //     router.push("/products");
        //     return;
        // }
        console.log("login mounted");
        userPswdRef.current?.focus();
        //callback invoked when component is unmounted
        return () => {
            console.log("login unmounted");
        }
    }, []);

    // useEffect(()=>{
    //     document.title+=document.title+" Login";
    // },[])



    async function handleLogin(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name && password) {
            //validate the credentials
            const url = "http://localhost:9000/login";
            try {
                const response = await axios.post(url, { name, password });
                console.log("response", response);
                setMessage("");
                let authAction = {
                    type: 'login',
                    payload: {
                        isAuthenticated: true,
                        username: name,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                };
                store.dispatch(authAction);
                router.push("/products");
            } catch (error) {
                console.log("errorResponse", error);
                setMessage("Invalid Credentials");
                let authAction = {
                    type: 'logout'
                }
                store.dispatch(authAction)
            }
        } else {
            setMessage("Enter the credentials");
            let authAction = {
                type: 'logout'
            }
            store.dispatch(authAction)
        }
    }

    return (
        <div>
            <h4>Login</h4>
            {message ? <div className="alert alert-warning">{message}</div> : null}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input id="username" type="text" value={name} ref={userNameRef}
                        onChange={(evt) => setName(evt.target.value)} className="form-control"
                        placeholder="User ID" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} ref={userPswdRef}
                        onChange={(evt) => setPassword(evt.target.value)} className="form-control"
                        placeholder="Password" />
                </div>
                <br />
                <button className="btn btn-success">Login</button>
            </form>
        </div>
    )
}