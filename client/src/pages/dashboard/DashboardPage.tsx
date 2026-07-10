import { useEffect, useState } from "react";
import { getMe } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface User {
    id: string;
    username: string;
    email: string;
    role: {
        name: string;
    };
}

const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const { logout } = useAuth();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getMe();

                setUser(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();    
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <>
                    <h2>Halo, {user.username} 👋</h2>
                    <p>Email : {user.email}</p>
                    <p>Role : {user.role.name}</p>
                    <br />
                    <button onClick={() => navigate("/character")}>
                        Character
                    </button>
                    <br />
                    <button onClick={() => navigate("/quest")}>
                        Quest
                    </button>
                    <br />
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DashboardPage;