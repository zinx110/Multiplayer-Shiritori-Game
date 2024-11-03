import React from "react";

interface ScoreAndTimeProps {
    turn: number;
    player: number;
    score: number;
    remainingTime: number;
}
const ScoreAndTime = ({
    turn,
    player,
    score,
    remainingTime,
}: ScoreAndTimeProps) => {
    return (
        <div className="flex justify-between items-center w-full h-10">
            <span>Score: {score}</span>
            <span
                className={
                    turn === player
                        ? `text-white rounded-full w-8 h-8 flex justify-center items-center ${
                              remainingTime >= 0 ? "bg-blue-500" : "bg-red-600"
                          }`
                        : "hidden"
                }
            >
                {remainingTime}
            </span>
        </div>
    );
};

export default ScoreAndTime;
