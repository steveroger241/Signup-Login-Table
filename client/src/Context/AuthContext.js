import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
    const [auth, setAuth] = useState({ user: null, token: "" });

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({ ...auth, user: parsedData.user, token: parsedData.token });
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const data = useContext(AuthContext);
    return data;
}

export { AuthProvider, useAuth }