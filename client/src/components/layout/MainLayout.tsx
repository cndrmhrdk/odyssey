import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
    children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <div className="min-h-[calc(100vh-110px)] rounded-3xl border border-slate-700 bg-slate-900/50 backdrop-blur-md shadow-2xl p-8">
                        {children}
                    </div>

                </main>

            </div>

        </div>
    );
};

export default MainLayout;