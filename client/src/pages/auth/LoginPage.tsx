import { useState } from "react";
import { login as loginApi } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const result = await loginApi({
            email,
            password,
        });

        await login(result.data.token);

        navigate("/dashboard")

        alert("Login berhasil!");

        } catch (error) {
            console.error(error);
            alert("Login gagal");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <br/><br/>

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <br/><br/>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;