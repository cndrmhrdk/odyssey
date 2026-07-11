import MainLayout from "../../components/layout/MainLayout";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <h1>Dashboard</h1>

            <h2>Halo, {user.username} 👋</h2>

            <p>Email : {user.email}</p>

            <p>Role : {user.role.name}</p>
        </MainLayout>
    );
};

export default DashboardPage;