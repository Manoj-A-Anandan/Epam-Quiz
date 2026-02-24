import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20">
            <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center text-center">

                {/* Hero Logo */}
                <div className="mb-8">
                    <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 drop-shadow-xl tracking-tight uppercase" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '2px' }}>
                        SYNERGYSQUAD
                    </h1>
                    <p className="text-2xl font-bold text-gray-500 uppercase tracking-widest mt-2 border-b-2 border-gray-100 pb-4 inline-block">
                        Live Quiz Arena
                    </p>
                </div>

                <p className="text-gray-600 text-lg mb-12 max-w-md">
                    Welcome to the ultimate real-time quiz platform. Select your role to enter the arena.
                </p>

                {/* Entry Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Host Box */}
                    <button
                        onClick={() => navigate('/host')}
                        className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all"
                    >
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Play size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-2">Quiz Host</h2>
                        <p className="text-sm text-blue-700 opacity-80">Control the quiz, reveal answers, and manage teams.</p>
                    </button>

                    {/* Team Box */}
                    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 rounded-2xl">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                            <Users size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">Team Entry</h2>

                        <div className="flex gap-3 w-full flex-wrap justify-center mt-2">
                            {[
                                { id: 'A', name: 'AttackOnTitans' },
                                { id: 'B', name: 'AlgoLooms' },
                                { id: 'C', name: 'Moonshine Coders' },
                                { id: 'D', name: 'CrossCity Coders' }
                            ].map(team => (
                                <button
                                    key={team.id}
                                    onClick={() => navigate(`/team/${team.id}`)}
                                    className="bg-white border-2 border-purple-300 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md w-full sm:w-auto text-sm"
                                >
                                    {team.name}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <p className="mt-8 text-sm text-gray-400 font-medium">Powered by React, Node.js & Socket.io</p>
        </div>
    );
};

export default HomePage;
