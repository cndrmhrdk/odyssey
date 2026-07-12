import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register({
                username,
                email,
                password,
            });

            toast.success("Register berhasil!");

            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Register gagal");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a20,transparent_55%)]"></div>

            <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-black tracking-widest text-yellow-400">
                        CODE ODYSSEY
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Create your adventurer account
                    </p>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
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
                            placeholder="Enter password"
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-bold tracking-wide text-white transition hover:bg-blue-500"
                    >
                        CREATE ACCOUNT
                    </button>

                </form>

                <div className="mt-8 text-center text-slate-400">

                    Already have an account?

                    <Link
                        to="/"
                        className="ml-2 text-yellow-400 hover:text-yellow-300 font-semibold"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default RegisterPage;

