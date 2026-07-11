import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
    children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", }} >
            <aside style={{ width: "260px", padding: "24px", borderRight: "1px solid #ddd", }} >
                <h2>Code Odyssey</h2>

                <hr />

                <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                </button>

                <br />
                <br />

                {user.role.name === "ADMIN" ? (
                    <>
                        <button onClick={() => navigate("/admin/regions")}>
                            Manage Region
                        </button>

                        <br />
                        <br />

                        <button onClick={() => navigate("/admin/quests")}>
                            Manage Quest
                        </button>

                        <br />
                        <br />

                        <button onClick={() => navigate("/admin/achievements")}>
                            Manage Achievement
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/character")}>
                            Character
                        </button>

                        <br />
                        <br />

                        <button onClick={() => navigate("/quest")}>
                            Quest
                        </button>

                        <br />
                        <br />

                        <button onClick={() => navigate("/achievements")}>
                            Achievement
                        </button>

                        <br />
                        <br />

                        <button onClick={() => navigate("/leaderboard")}>
                            Leaderboard
                        </button>

                        <br />
                        <br />

                        <button onClick={() => navigate("/profile")}>
                            Profile
                        </button>
                    </>
                )}

                <hr />

                <button onClick={handleLogout}>
                    Logout
                </button>
            </aside>

            <main style={{ flex: 1, padding: "32px", }} >
                {children}
            </main>
        </div>
    );
};

export default MainLayout;