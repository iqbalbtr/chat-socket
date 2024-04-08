import React from 'react'
import style from "./form.module.css"
import { Link } from 'react-router-dom';
import { useSession } from '@providers/AuthProvider';

function LoginForm() {

    const form = React.useRef<HTMLFormElement | null>(null);
    const { login, status } = useSession();

    async function handleLogin(e: any) {
        e.preventDefault();
        const inputs = new FormData(form.current!);

        const user = inputs.get("username") as string;
        const pass = inputs.get("password") as string;

        if(!user || !pass) return

        const payload = {
            username: user,
            password: pass
        }

        login(payload);
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
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Loading.." : "Masuk"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
