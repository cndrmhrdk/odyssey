import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/code_odyssey_logo.png";

interface Props {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const menuClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
            isActive
                ? "bg-cyan-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`;

    return (
        <div className="min-h-screen bg-[#07111f] text-white flex">

            {/* SIDEBAR */}

            <aside className="w-72 border-r border-cyan-500/20 bg-slate-900 flex flex-col">

                {/* Logo */}

                <div className="border-b border-slate-700 p-6">

                    <div className="flex items-center gap-4">

                        <img
                            src={logo}
                            alt="logo"
                            className="w-14 h-14 rounded-xl shadow-lg"
                        />

                        <div>

                            <h1 className="text-xl font-black tracking-wide">
                                Code Odyssey
                            </h1>

                            <p className="text-xs text-cyan-300">
                                Guild Master Panel
                            </p>

                        </div>

                    </div>

                </div>

                {/* MENU */}

                <div className="flex-1 p-5">

                    <p className="mb-4 text-xs uppercase tracking-[4px] text-slate-500">
                        Navigation
                    </p>

                    <nav className="space-y-3">

                        <NavLink
                            to="/admin/dashboard"
                            className={menuClass}
                        >
                            📊 Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/regions"
                            className={menuClass}
                        >
                            🌍 Region
                        </NavLink>

                        <NavLink
                            to="/admin/quests"
                            className={menuClass}
                        >
                            📜 Quest
                        </NavLink>

                        <NavLink
                            to="/admin/achievements"
                            className={menuClass}
                        >
                            🏆 Achievement
                        </NavLink>

                    </nav>

                </div>

                {/* FOOTER */}

                <div className="border-t border-slate-700 p-5">

                    <div className="mb-4 rounded-xl bg-cyan-500/10 p-4 border border-cyan-500/20">

                        <p className="text-sm font-bold">
                            Game Master
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                            Manage the Code Odyssey world.
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full rounded-xl bg-red-500 py-3 font-semibold transition hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </aside>

            {/* CONTENT */}

            <main className="flex-1 overflow-y-auto">

                {/* TOP BAR */}

                <div className="sticky top-0 z-20 border-b border-cyan-500/10 bg-[#081423]/80 backdrop-blur-xl">

                    <div className="flex items-center justify-between px-10 py-5">

                        <div>

                            <h2 className="text-2xl font-bold">
                                Guild Control Center
                            </h2>

                            <p className="text-sm text-slate-400">
                                Manage every aspect of Code Odyssey.
                            </p>

                        </div>

                        <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300">
                            🟢 System Online
                        </div>

                    </div>

                </div>

                <div className="p-10">
                    {children}
                </div>

            </main>

        </div>
    );
};

export default AdminLayout;