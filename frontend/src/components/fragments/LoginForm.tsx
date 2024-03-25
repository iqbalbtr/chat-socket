import { useSocket } from '@providers/SocketProvider';
import React, { useRef } from 'react'
import style from "./form.module.css"
import { Link } from 'react-router-dom';

function LoginForm() {

    const form = useRef<HTMLFormElement | null>(null);
    const { connectSocket, setUser } = useSocket();

    async function handleLogin(e: any) {
        e.preventDefault();
        const inputs = new FormData(form.current!);
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputs.get("username"),
                    password: inputs.get("password")
                }),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();            

            setUser(inputs.get('username'));
            console.log(responseData.result.socket_token);
            
            connectSocket({
                username: inputs.get("username"),
                token: responseData.result.socket_token
            });
        } catch (error) {
            console.error("Error during registration:", error);
        }

    }

    return (
        <div className={style.container}>
            <form ref={form} className={style.form}>
                <h1 className={style.title}>Login</h1>
                <div className={style.form_container}>
                    <div className={style.field}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' id='username' />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' />
                    </div>
                    <p>Belum punya akun? <Link to={"/auth/register"}>Register</Link></p>
                    <button
                        onClick={handleLogin}
                        type='submit'
                        className={style.submit}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
