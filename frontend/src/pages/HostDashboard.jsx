import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import Timer from '../components/Timer';
import Leaderboard from '../components/Leaderboard';
import { Settings, Play, Target, CheckCircle, Clock, RotateCcw } from 'lucide-react';

const HostDashboard = () => {
    const { socket, quizState, timer } = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        // Backend now handles the 60-second timeout automatically.
    }, []);

    if (!quizState || !quizState.state) return <div className="p-8 text-center text-xl font-semibold animate-pulse">Connecting to server...</div>;

    const { state, question, teams, submissions } = quizState;

    const handleStart = () => socket.emit('host:start_quiz');
    const handleNext = () => socket.emit('host:next_question');
    const handleReveal = () => socket.emit('host:reveal_answer');
    const handleScoreAdjust = (teamId, delta) => socket.emit('host:update_score', { teamId, delta });
    const handleRestart = () => {
        if (window.confirm("Are you sure you want to completely restart the quiz? This will wipe all current scores and submissions.")) {
            socket.emit('host:restart_quiz');
            navigate('/');
        }
    };

    // Find out who locked and who hasn't
    const getTeamStatus = (teamId) => {
        const sub = submissions.find(s => s.teamId === teamId);
        if (!sub) return { status: 'waiting', icon: <Clock size={16} className="text-gray-400" /> };
        if (state.status === 'revealed') {
            if (sub.skipped) return { status: 'skipped', color: 'text-gray-500', bg: 'bg-gray-100' };
            if (sub.isCorrect) return { status: `Correct (+${sub.pointsAwarded})`, color: 'text-green-600', bg: 'bg-green-100' };
            return { status: `Wrong (${sub.pointsAwarded})`, color: 'text-red-600', bg: 'bg-red-100' };
        }
        return { status: 'Locked', icon: <CheckCircle size={16} className="text-blue-500" />, time: new Date(sub.lockedAt).toLocaleTimeString() };
    };

    return (
        <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6 bg-gray-50 min-h-screen">
            {/* Global Stylish Header */}
            <div className="w-full text-center mb-4">
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 drop-shadow-lg tracking-tight uppercase" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '4px' }}>
                    SYNERGYSQUAD
                </h1>
                <p className="text-xl font-bold text-gray-500 uppercase tracking-widest mt-2">Live Quiz Arena</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Controls & Question/Leaderboard */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Header & Controls */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Master Dashboard</h2>
                            <p className="text-gray-500 mt-1">Status: <span className="font-semibold uppercase text-sm tracking-wider">{state.status}</span></p>
                        </div>
                        <div className="flex gap-3">
                            {/* Always show Restart conditionally if not waiting */}
                            {state.status !== 'waiting' && (
                                <button onClick={handleRestart} className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold transition-all">
                                    <RotateCcw size={20} /> Restart
                                </button>
                            )}

                            {state.status === 'waiting' || state.status === 'finished' ? (
                                <button onClick={handleStart} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                                    <Play size={20} /> Start Quiz
                                </button>
                            ) : (
                                <>
                                    {state.status === 'active' && (
                                        <button onClick={handleReveal} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                                            <Target size={20} /> Reveal Answer
                                        </button>
                                    )}
                                    {state.status === 'revealed' && (
                                        <button onClick={handleNext} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                                            Next Question
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Current Question View */}
                    {question && (
                        <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-600">
                            <h2 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-4">Question {state.currentQuestionIndex + 1}</h2>
                            <p className="text-3xl font-semibold leading-tight text-gray-800 mb-8">{question.text}</p>

                            {question.type === 'mcq' && (
                                <div className="grid grid-cols-2 gap-4">
                                    {question.options.map((opt, i) => (
                                        <div key={i} className={`p-4 rounded-xl border-2 font-medium text-lg
                      ${state.status === 'revealed' && opt === question.correctAnswer ? 'bg-green-100 border-green-500 text-green-800 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-gray-50 border-gray-200 text-gray-700'}
                    `}>
                                            <span className="inline-block w-8 h-8 bg-white border border-gray-300 rounded text-center leading-8 mr-3 shadow-sm">{String.fromCharCode(65 + i)}</span>
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {question.type === 'fill' && state.status === 'revealed' && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <span className="font-bold text-green-700">Correct Answer:</span> <span className="text-xl text-green-900 ml-2">{question.correctAnswer}</span>
                                </div>
                            )}

                            {state.status === 'revealed' && question.justification && (
                                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                                    <span className="font-bold block mb-1">Explanation:</span>
                                    {question.justification}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Waiting Lobby View */}
                    {state.status === 'waiting' && (
                        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col items-center justify-center text-center border-t-8 border-t-blue-500 flex-1">
                            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                <Target size={40} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">Waiting for Host...</h2>
                            <p className="text-gray-500 text-lg max-w-md mx-auto">Ensure all teams are ready. Click <span className="font-bold text-gray-700">Start Quiz</span> above to begin the competition.</p>
                        </div>
                    )}

                </div>

                {/* Right Column: Timer & Teams */}
                <div className="flex flex-col gap-6">

                    {/* Timer */}
                    {state.status === 'active' && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <Timer seconds={timer} />
                        </div>
                    )}

                    {/* Live Team Status */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-700 flex items-center gap-2"><Settings size={18} /> Live Submissions</h3>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            {(() => {
                                const lockedSubs = submissions
                                    .filter(s => s.lockedAt && !s.skipped)
                                    .sort((a, b) => new Date(a.lockedAt) - new Date(b.lockedAt));

                                const waitingTeams = teams.filter(t => !submissions.find(s => s.teamId === t.teamId && !s.skipped));

                                return (
                                    <>
                                        {lockedSubs.map((sub, idx) => {
                                            const team = teams.find(t => t.teamId === sub.teamId) || { name: 'Unknown', teamId: sub.teamId };
                                            const statusData = getTeamStatus(team.teamId);

                                            return (
                                                <div key={team.teamId} className={`p-3 rounded-xl border flex justify-between items-center ${statusData.bg || 'bg-blue-50 border-blue-200'}`}>
                                                    <div>
                                                        <div className="font-bold text-gray-800 flex items-center gap-2">
                                                            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">#{idx + 1}</span>
                                                            {team.name}
                                                        </div>
                                                        {sub.answer && state.status === 'revealed' && (
                                                            <div className="text-sm font-medium mt-1">"{sub.answer}"</div>
                                                        )}
                                                    </div>
                                                    <div className={`text-sm font-semibold flex items-center gap-2 ${statusData.color || 'text-gray-600'}`}>
                                                        {statusData.icon} {statusData.status}
                                                        {statusData.time && <span className="text-xs text-blue-500 bg-white px-2 py-0.5 rounded border border-blue-100 shadow-sm block ml-1">{statusData.time}</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {waitingTeams.map(team => {
                                            const statusData = getTeamStatus(team.teamId);
                                            return (
                                                <div key={team.teamId} className="p-3 rounded-xl border flex justify-between items-center bg-gray-50 border-gray-100 opacity-60">
                                                    <div className="font-semibold text-gray-600 pl-8">{team.name}</div>
                                                    <div className="text-sm font-semibold flex items-center gap-2 text-gray-400">
                                                        {statusData.icon} Waiting
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Leaderboard Module */}
                    <div className="mt-6">
                        <Leaderboard teams={teams} onScoreAdjust={handleScoreAdjust} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
