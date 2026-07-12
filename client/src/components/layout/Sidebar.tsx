import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/code_odyssey_logo.png";

const Sidebar = () => {
    const { user, logout } = useAuth();

    const menuClass = ({ isActive }: { isActive: boolean }) =>
        `block rounded-xl px-4 py-3 font-semibold transition-all duration-200 ${
            isActive
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg scale-[1.02]"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`;

    return (
        <aside className="w-72 min-h-screen bg-[#111827] border-r border-slate-700 flex flex-col">

            {/* Header */}
            {/* <div className="p-6 border-b border-slate-700">

                <div className="flex items-center gap-3">

                    <img
                        src={logo}
                        alt="Code Odyssey"
                        className="w-14 h-14 rounded-xl bg-white p-1"
                    />

                    <div>
                        <h2 className="text-xl font-black tracking-wider text-yellow-400">
                            CODE
                        </h2>

                        <p className="text-sm text-slate-400">
                            ODYSSEY
                        </p>
                    </div>

                </div>

            </div> */}

            {/* Player Card */}
            <div className="mx-4 mt-5 rounded-2xl bg-slate-800 border border-slate-700 p-4">

                <p className="text-xs uppercase tracking-widest text-slate-400">
                    Logged As
                </p>

                <h3 className="mt-1 text-lg font-bold text-white">
                    {user?.username}
                </h3>

                <span className="inline-block mt-2 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-slate-900">
                    {user?.role.name}
                </span>

            </div>

            {/* Menu */}
            <div className="flex-1 px-4 py-6">

                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
                    Navigation
                </p>

                {user?.role.name === "PLAYER" ? (
                    <div className="space-y-2">

                        <NavLink to="/dashboard" className={menuClass}>
                            🏠 Dashboard
                        </NavLink>

                        <NavLink to="/character" className={menuClass}>
                            ⚔️ Character
                        </NavLink>

                        <NavLink to="/quest" className={menuClass}>
                            📜 Quest
                        </NavLink>

                        <NavLink to="/achievements" className={menuClass}>
                            🏆 Achievement
                        </NavLink>

                        <NavLink to="/leaderboard" className={menuClass}>
                            👑 Leaderboard
                        </NavLink>

                        <NavLink to="/profile" className={menuClass}>
                            👤 Profile
                        </NavLink>

                    </div>
                ) : (
                    <div className="space-y-2">

                        <NavLink to="/dashboard" className={menuClass}>
                            📊 Dashboard
                        </NavLink>

                        <NavLink to="/admin/regions" className={menuClass}>
                            🗺️ Region
                        </NavLink>

                        <NavLink to="/admin/quests" className={menuClass}>
                            📜 Quest
                        </NavLink>

                        <NavLink to="/admin/achievements" className={menuClass}>
                            🏆 Achievement
                        </NavLink>

                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="border-t border-slate-700 p-5">

                <button
                    onClick={logout}
                    className="w-full rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </aside>
    );
};

export default Sidebar;