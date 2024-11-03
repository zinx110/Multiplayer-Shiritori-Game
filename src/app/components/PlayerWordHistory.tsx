import React from "react";
import { WordObject } from "../Models/WordObject";
interface PlayerWordHistoryProps {
    playerWords: WordObject[];
}
const PlayerWordHistory = ({ playerWords }: PlayerWordHistoryProps) => {
    return (
        <div className="flex flex-col-reverse flex-grow overflow-y-scroll w-full gap-1">
            {playerWords.map((wordObj, index) => (
                <div
                    className="w-full flex justify-between items-center p-2 bg-slate-500 "
                    key={index}
                >
                    <span> {wordObj.word}</span>
                    <span> {wordObj.score}</span>
                </div>
            ))}
        </div>
    );
};

export default PlayerWordHistory;
