import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { getMe } from "../services/auth.service";

interface User {
    id: string;
    username: string;
    email: string;
    role: {
        name: string;
    };
}

interface AuthContextType {
    token: string | null;
    user: User | null;

    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const result = await getMe();

            setUser(result.data);
        } catch (error) {
            console.error(error);
            logout();
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, []);

    const login = async (newToken: string) => {
        localStorage.setItem("token", newToken);

        setToken(newToken);

        const result = await getMe();

        setUser(result.data);
    };

    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth harus berada di dalam AuthProvider");
    }

    return context;
};