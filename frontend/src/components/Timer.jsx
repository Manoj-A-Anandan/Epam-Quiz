import React from 'react';

const Timer = ({ seconds }) => {
    const percentage = (seconds / 60) * 100;

    let colorClass = 'bg-green-500';
    if (seconds <= 20) colorClass = 'bg-yellow-500';
    if (seconds <= 10) colorClass = 'bg-red-500';

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2 font-mono">
                00:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colorClass} transition-all duration-1000 ease-linear`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Timer;
