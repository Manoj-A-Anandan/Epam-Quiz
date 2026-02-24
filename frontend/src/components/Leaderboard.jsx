import React from 'react';
import { Plus, Minus } from 'lucide-react';

const Leaderboard = ({ teams, onScoreAdjust }) => {
  // Sort by score descending
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-700">
        🏆 Leaderboard
      </h3>
      <div className="flex flex-col gap-3">
        {sortedTeams.map((team, index) => (
          <div key={team.teamId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-500 w-5 text-sm">#{index + 1}</span>
              <span className="font-semibold">{team.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg text-blue-600 w-12 text-right">
                {team.score} <span className="text-xs text-gray-400">pts</span>
              </div>
              {onScoreAdjust && (
                <div className="flex gap-1 ml-1 border-l pl-2 border-gray-200">
                  <button onClick={() => onScoreAdjust(team.teamId, -1)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Subtract 1 pt">
                    <Minus size={14} />
                  </button>
                  <button onClick={() => onScoreAdjust(team.teamId, 1)} className="p-1 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded transition-colors" title="Add 1 pt">
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
