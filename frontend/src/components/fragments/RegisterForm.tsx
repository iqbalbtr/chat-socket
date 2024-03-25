import React, { useRef } from 'react'
import style from "./form.module.css"
import { Link } from 'react-router-dom';

function RegisterForm() {
    const form = useRef<HTMLFormElement | null>(null);

    async function handleRegister(e: any) {
        e.preventDefault();
        const inputs = new FormData(form.current!);
        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputs.get("username"),
                    password: inputs.get("password")
                })
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const responseData = await response.json();
            console.log("Registration successful:", responseData);
        } catch (error) {
            console.error("Error during registration:", error);
        }
        
    }

    return (
        <div className={style.container}>
            <form ref={form} className={style.form}>
                <h1 className={style.title}>Register</h1>
                <div className={style.form_container}>
                    <div className={style.field}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' id='username' />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' />
                    </div>
                    <p>Sudah punya akun? <Link to={"/auth/login"}>Masuk</Link></p>
                    <button
                        onClick={handleRegister}
                        type='submit'
                        className={style.submit}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
