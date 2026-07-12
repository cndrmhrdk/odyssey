import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/code_odyssey_logo.png";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">

            <div className="h-full px-10 flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <img
                        src={logo}
                        alt="Code Odyssey"
                        className="w-12 h-12 rounded-xl shadow-lg"
                    />

                    <div>

                        <h1 className="text-2xl font-black tracking-widest text-yellow-400">
                            CODE ODYSSEY
                        </h1>

                        <p className="text-xs text-slate-400 tracking-widest uppercase">
                            Adventure RPG
                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-xs uppercase tracking-widest text-slate-400">
                        Adventurer
                    </p>

                    <h2 className="font-bold text-lg">
                        {user?.username}
                    </h2>

                </div>

            </div>

        </header>
    );
};

export default Navbar;