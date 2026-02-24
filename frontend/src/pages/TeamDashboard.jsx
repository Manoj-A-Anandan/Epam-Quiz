import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import Timer from '../components/Timer';
import Leaderboard from '../components/Leaderboard';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

const TeamDashboard = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const { socket, quizState, timer } = useSocket();
    const [selectedOption, setSelectedOption] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    // Derive my team from state
    const myTeam = quizState?.teams?.find(t => t.teamId.toLowerCase() === teamId.toLowerCase());
    const formattedTeamId = myTeam ? myTeam.teamId : teamId.toUpperCase();

    // Reset local state when a new question arrives
    useEffect(() => {
        if (quizState?.state?.status === 'active') {
            const existingSub = quizState.submissions.find(s => s.teamId === formattedTeamId);
            if (existingSub) {
                setIsLocked(true);
                setSelectedOption(existingSub.answer || '');
            } else {
                setIsLocked(false);
                setSelectedOption('');
            }
        }
    }, [quizState?.state?.currentQuestionIndex, quizState?.state?.status, quizState?.submissions, formattedTeamId, navigate]);


    if (!quizState || !quizState.state) return <div className="p-8 text-center text-xl font-semibold animate-pulse">Connecting to server...</div>;

    const { state, question, teams, submissions } = quizState;
    const mySubmission = submissions.find(s => s.teamId === formattedTeamId);

    const handleLock = () => {
        if (!selectedOption) return;
        socket.emit('team:lock_answer', { teamId: formattedTeamId, answer: selectedOption });
        setIsLocked(true);
    };

    if (!myTeam) {
        return <div className="p-8 text-center text-red-500 font-bold">Invalid Team ID</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">

            {/* Global Stylish Header */}
            <div className="w-full text-center mt-4 mb-4">
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 drop-shadow-md tracking-tight uppercase" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '3px' }}>
                    SYNERGYSQUAD
                </h1>
                <p className="text-lg font-bold text-gray-400 uppercase tracking-widest mt-1">Live Quiz Arena</p>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800"><span className="text-blue-600">{myTeam.name}</span> Dashboard</h2>
                    <p className="text-gray-500 mt-1">Score: <span className="font-bold text-blue-600">{myTeam.score} pts</span></p>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-lg border">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</span>
                    <div className="font-semibold text-gray-800 capitalize leading-none mt-1">{state.status}</div>
                </div>
            </div>

            {state.status === 'waiting' && (
                <div className="bg-blue-50 border-2 border-blue-200 p-12 text-center rounded-2xl flex flex-col items-center justify-center">
                    <AlertCircle size={48} className="text-blue-500 mb-4" />
                    <h2 className="text-2xl font-bold text-blue-900">Waiting for Host...</h2>
                    <p className="text-blue-700 mt-2">The quiz will start shortly.</p>
                </div>
            )}

            {state.status === 'finished' && (
                <div className="bg-green-50 border-2 border-green-200 p-12 text-center rounded-2xl">
                    <h2 className="text-3xl font-black text-green-900 mb-2">Quiz Finished!</h2>
                    <p className="text-green-700 text-lg">Check the final leaderboard on the host screen.</p>
                </div>
            )}

            {(state.status === 'active' || state.status === 'revealed') && question && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Question Area */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-600 relative overflow-hidden">

                            {/* Question Text */}
                            <h2 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-4">Question {state.currentQuestionIndex + 1}</h2>
                            <p className="text-2xl font-semibold leading-tight text-gray-800 mb-8">{question.text}</p>

                            {/* Input Area */}
                            {question.type === 'mcq' ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {question.options.map((opt, i) => {
                                        const isSelected = selectedOption === opt;
                                        const isCorrect = question.correctAnswer === opt;
                                        const showRevealColors = state.status === 'revealed';

                                        let bgClass = "bg-gray-50 hover:bg-gray-100 border-gray-200";
                                        let textClass = "text-gray-700";

                                        if (showRevealColors) {
                                            if (isCorrect) {
                                                bgClass = "bg-green-100 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                                                textClass = "text-green-800 font-bold";
                                            } else if (isSelected && !isCorrect) {
                                                bgClass = "bg-red-100 border-red-500";
                                                textClass = "text-red-800";
                                            }
                                        } else if (isSelected) {
                                            bgClass = "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20";
                                            textClass = "text-blue-800 font-semibold";
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => !isLocked && state.acceptingAnswers && setSelectedOption(opt)}
                                                disabled={isLocked || !state.acceptingAnswers}
                                                className={`text-left p-4 flex items-center rounded-xl border-2 transition-all ${bgClass} ${textClass} ${isLocked || !state.acceptingAnswers ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                                            >
                                                <span className={`inline-block w-8 h-8 bg-white border rounded text-center leading-8 mr-4 shadow-sm font-bold ${showRevealColors && isCorrect ? 'border-green-500 text-green-600' : 'border-gray-300'}`}>
                                                    {String.fromCharCode(65 + i)}
                                                </span>
                                                <span className="text-lg">{opt}</span>

                                                {showRevealColors && isCorrect && <CheckCircle className="ml-auto text-green-600" size={24} />}
                                            </button>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <label className="font-semibold text-gray-700">Type your answer:</label>
                                    <input
                                        type="text"
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        disabled={isLocked || !state.acceptingAnswers}
                                        className={`w-full p-4 text-xl border-2 rounded-xl focus:outline-none focus:ring-4 transition-all
                      ${isLocked || !state.acceptingAnswers ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500/20'}
                     `}
                                        placeholder="Enter answer here..."
                                    />
                                    {state.status === 'revealed' && (
                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-lg">
                                            <span className="font-bold text-green-700">Correct Answer:</span> <span className="font-semibold text-green-900 ml-2">{question.correctAnswer}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                {state.status === 'active' && !isLocked && state.acceptingAnswers && (
                                    <button
                                        onClick={handleLock}
                                        disabled={!selectedOption}
                                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <Lock size={20} /> Lock Answer
                                    </button>
                                )}

                                {(isLocked || !state.acceptingAnswers) && state.status === 'active' && (
                                    <div className="flex items-center gap-3 bg-blue-50 text-blue-800 px-6 py-4 rounded-xl border border-blue-200 font-bold w-full justify-center">
                                        <Lock size={20} className="text-blue-600" />
                                        {isLocked ? "Answer Locked Successfully" : "Time is up! Waiting for reveal..."}
                                    </div>
                                )}
                            </div>

                            {/* Feedback overlay when revealed */}
                            {state.status === 'revealed' && mySubmission && (
                                <div className={`mt-6 p-5 rounded-xl border-2 flex items-center justify-between
                  ${mySubmission.skipped ? 'bg-gray-100 border-gray-300 text-gray-700' :
                                        mySubmission.isCorrect ? 'bg-green-100 border-green-400 text-green-800' :
                                            'bg-red-100 border-red-400 text-red-800'
                                    }
                `}>
                                    <div>
                                        <h3 className="font-bold text-xl uppercase tracking-wider mb-1">
                                            {mySubmission.skipped ? 'Skipped' : mySubmission.isCorrect ? 'Correct!' : 'Incorrect'}
                                        </h3>
                                        <p className="opacity-80 text-sm font-medium">Points Awarded: {mySubmission.pointsAwarded}</p>
                                    </div>
                                    <div className="text-4xl font-black opacity-30">
                                        {mySubmission.pointsAwarded > 0 ? `+${mySubmission.pointsAwarded}` : mySubmission.pointsAwarded}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-6">
                        {/* Timer */}
                        {state.status === 'active' && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Time Remaining</p>
                                <Timer seconds={timer} />
                            </div>
                        )}

                        {/* Mini Leaderboard can go here optionally, skipping for cleaner interface or just show it */}
                        <Leaderboard teams={teams} />
                    </div>

                </div>
            )}
        </div>
    );
};

export default TeamDashboard;
