import useCookie from "@hooks/useCookie";
import React from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";

type StatusProps = "Authorized" | "Unauthrorized" | "loading";
type UserProps = {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
}
type ContextProps = {
    user: Partial<UserProps>;
    status: Partial<StatusProps>;
    login: (payload: PayloadProps) => Promise<void>;
    logout: () => Promise<void>;
    register: (payload: {username: string, email: string, password: string}, callback: (err: string) => void) => Promise<void>;
}
type PayloadProps = {
    username: string;
    email: string;
    password: string;
}

const AuthContext = React.createContext<ContextProps>({
    user: {},
    status: "Unauthrorized",
    login: async () => { },
    logout: async () => { },
    register: async () => {}
});

export function useSession() {
    return React.useContext(AuthContext);
}

function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [status, setStatus] = React.useState<Partial<StatusProps>>("loading");
    const [user, setUser] = React.useState<Partial<UserProps>>({});
    const [error, setError] = React.useState<string>("");
    const [reCon, setReCon] = React.useState<boolean>(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const _user = useCookie("_user");


    const login = React.useCallback(async (payload: PayloadProps) => {
        setStatus("loading");
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        const res = await response.json();

        if (!response.ok) {
            setStatus("Unauthrorized");
            setError(res.error.message);
            throw new Error(res.error);
        } else {
            setStatus("Authorized");
            setUser(res.result.user);
            socket.connect();
            socket.emit("login", user.username)
        }
    }, [user, status])

    const logout = React.useCallback(async () => {
        setStatus("loading")
        const response = await fetch("http://localhost:8080/auth/logout", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        const res = await response.json();
        if (!response.ok) {
            setStatus("Unauthrorized")
            setError(res.error.message);
            throw new Error(res.error);
        } else {
            setUser({});
            setStatus("Unauthrorized");
            navigate("/");
            socket.emit("logout", user.username)
            socket.disconnect();
        }
    }, [user, status]);

    const register = React.useCallback(async (payload: { username: string, email: string, password: string }, callback: (err: string) => void) => {
        setStatus("loading");
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });


        const responseData = await response.json();
        if (!response.ok) {
            setStatus("Unauthrorized")
            callback(responseData.error)
        }

        setStatus("Unauthrorized");
        callback("")
    }, [status, user])

    const me = React.useCallback(async () => {
        const get = await fetch("http://localhost:8080/auth/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = await get.json();

        if (!get.ok) {
            setStatus("Unauthrorized")
            setError(res.error.message);
            setUser({});
            throw new Error(res.error);
        } else {
            setUser(res.result);
            setStatus("Authorized");
        }
    }, [status, user])

    React.useEffect(() => {

        if (reCon)
            return;

        if (_user) {
            setUser(_user);
            setStatus("Authorized");
            setReCon(true);
        } else {
            me();
        }

    }, [_user])

    React.useEffect(() => {

        if (status === "Unauthrorized") {

            if (pathname.startsWith("/chat")) {

                navigate("/auth/login");
                return;
            }
        }

        if (status === "Authorized") {
            if (pathname.startsWith("/auth")) {
                navigate(-1);
            }
        }

    }, [pathname, status])


    return (
        <AuthContext.Provider value={{ status, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;