import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const AdminRoute = ({ children }: Props) => {
    const { token, user } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    if (user.role.name !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;