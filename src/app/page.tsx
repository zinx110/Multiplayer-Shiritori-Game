"use client";

import { useEffect, useState } from "react";
import PlayCard from "./components/PlayCard";
import { WordObject } from "./Models/WordObject";

export default function Home() {
    const [wordList, setWordList] = useState<WordObject[]>([]);
    const [turn, setTurn] = useState(1);
    const [winner, setWinner] = useState<number>(0);
    useEffect(() => {
        if (!winner) return;
        alert(`Winner is player ${winner}`);
    }, [winner]);

    function resetGame() {
        setWinner(0);
        setWordList([]);
        setTurn(1);
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header></header>
            <main className="flex gap-5 justify-center items-center w-full">
                <PlayCard
                    player={1}
                    wordList={wordList}
                    setWordList={setWordList}
                    turn={turn}
                    setTurn={setTurn}
                    setWinner={setWinner}
                    winner={winner}
                />
                <PlayCard
                    player={2}
                    wordList={wordList}
                    setWordList={setWordList}
                    turn={turn}
                    setTurn={setTurn}
                    setWinner={setWinner}
                    winner={winner}
                />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <button
                    className="p-2 bg-red-400 hover:bg-red-500 rounded-md"
                    onClick={resetGame}
                >
                    Reset Game
                </button>
            </footer>
        </div>
    );
}
