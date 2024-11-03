"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WordObject } from "../Models/WordObject";
import InputComp from "./InputComp";
import PlayerWordHistory from "./PlayerWordHistory";
import ScoreAndTime from "./ScoreAndTime";
interface PlayCardInterface {
    player: number;
    wordList: WordObject[];
    setWordList: Dispatch<SetStateAction<WordObject[]>>;
    turn: number;
    setTurn: Dispatch<SetStateAction<number>>;
    setWinner: Dispatch<SetStateAction<number>>;
    winner: number;
}
const PlayCard = ({
    player,
    wordList,
    setWordList,
    turn,
    setTurn,
    setWinner,
    winner,
}: PlayCardInterface) => {
    const [error, setError] = useState("");
    const [playerWords, setPlayerWords] = useState<WordObject[]>([]);
    const [score, setScore] = useState(0);
    const [remainingTime, setRemainingTime] = useState(15);

    useEffect(() => {
        if (score > 100) {
            setWinner(player);
        }
    }, [score]);

    useEffect(() => {
        setPlayerWords(wordList.filter((wordObj) => wordObj.player === player));
    }, [wordList]);

    useEffect(() => {
        let tempScore = 0;
        playerWords.forEach((item) => {
            tempScore += item.score;
        });
        setScore(tempScore);
    }, [playerWords]);

    useEffect(() => {
        if (turn !== player) {
            return;
        }

        const interval = setInterval(() => {
            if (remainingTime <= -10) {
                setWordList((prev) => [
                    ...prev,
                    { player: player, word: "PASS", score: -2 },
                ]);
                setTurn(player === 1 ? 2 : 1);
            }
            setRemainingTime((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [turn, remainingTime]);

    return (
        <div className="w-full h-[400px] flex flex-col  items-center bg-slate-600 rounded-md p-5 gap-5 max-w-md">
            <h3 className="font-bold text-lg">Player {player}</h3>
            <ScoreAndTime
                player={player}
                turn={turn}
                score={score}
                remainingTime={remainingTime}
            />
            <InputComp
                turn={turn}
                setTurn={setTurn}
                player={player}
                wordList={wordList}
                setWordList={setWordList}
                remainingTime={remainingTime}
                setRemainingTime={setRemainingTime}
                error={error}
                setError={setError}
                winner={winner}
            />

            <PlayerWordHistory playerWords={playerWords} />
        </div>
    );
};

export default PlayCard;
