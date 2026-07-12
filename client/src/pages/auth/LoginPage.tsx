import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
    const { login } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await loginApi({
                email,
                password,
            });

            await login(result.data.token);

            toast.success("Login berhasil!");

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Email atau password salah");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb20,transparent_60%)]"></div>

            {/* Card */}
            <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-black tracking-widest text-yellow-400">
                        CODE ODYSSEY
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Welcome back, Adventurer
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-slate-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition"
                            required
                        />

                    </div>

                    <div>

                        <label className="block text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-bold tracking-wider text-white transition hover:bg-blue-500 active:scale-95"
                    >
                        LOGIN
                    </button>

                </form>

                <div className="mt-8 text-center text-slate-400">

                    New adventurer?

                    <Link
                        to="/register"
                        className="ml-2 text-yellow-400 hover:text-yellow-300 font-semibold"
                    >
                        Create Account
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default LoginPage;