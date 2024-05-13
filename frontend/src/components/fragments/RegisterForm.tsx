import React from 'react'
import style from "./form.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '@providers/AuthProvider';

function RegisterForm() {
    const form = React.useRef<HTMLFormElement | null>(null);
    const { register, status } = useSession();
    const navigate = useNavigate();

    async function handleRegister(e: any) {

        e.preventDefault();
        const inputs = new FormData(form.current!);
        const user = inputs.get("username") as string;
        const email = inputs.get("email") as string;
        const pass = inputs.get("password") as string;

        if(!pass && !user) return;
        register({
            username: user,
            email: email,
            password: pass
        }, (err) => {
            if(err){
                alert(err)
            } else {
                navigate("/auth/login")
            }
        })
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
                        <label htmlFor="username">Email</label>
                        <input type="email" name='email' id='email' />
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
                        {status === "loading" ? "Loading.." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
