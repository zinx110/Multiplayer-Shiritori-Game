import axios from "axios";
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { WordObject } from "../Models/WordObject";
interface InputCompProps {
    turn: number;
    setTurn: Dispatch<SetStateAction<number>>;
    player: number;

    wordList: WordObject[];
    setWordList: Dispatch<SetStateAction<WordObject[]>>;

    remainingTime: number;
    setRemainingTime: Dispatch<SetStateAction<number>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    winner: number;
}
const InputComp = ({
    turn,
    setTurn,
    player,
    wordList,
    setWordList,
    remainingTime,
    setRemainingTime,

    error,
    setError,
    winner,
}: InputCompProps) => {
    const [word, setword] = useState("");
    const [lastLetter, setLastLetter] = useState("a");

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (turn === player) {
            ref.current?.focus();
            setRemainingTime(15);
        } else {
            ref.current?.blur();
        }
    }, [turn]);

    useEffect(() => {
        if (!word || !wordList.length) return;

        if (word[0] !== lastLetter) {
            setError(`Must Start with "${lastLetter}"`);
            return;
        }

        setError("");
    }, [word, lastLetter]);
    useEffect(() => {
        if (!wordList.length) {
            setLastLetter("a");
        }

        const validWordsList = wordList.filter((wordObj) => wordObj.score >= 0);
        if (validWordsList.length) {
            const lastWord = validWordsList[validWordsList.length - 1].word;
            console.log(lastWord);
            const lastLetterTemp = lastWord[lastWord.length - 1];
            setLastLetter(lastLetterTemp);
        } else {
            setLastLetter("a");
        }
    }, [wordList]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function checkWord(e: any) {
        e.preventDefault();
        if (error) {
            return;
        }
        for (let i = 0; i < wordList.length; i++) {
            const wordObj = wordList[i];
            if (wordObj.word === word) {
                setError(`${word} has already been used.`);
                return;
            }
        }

        setError("");
        if (word.length < 4) {
            setError("word must be at least 4 characters");
            return;
        }
        const wordToSend = word;
        try {
            const res = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSend}`
            );
            if (res.status === 200) {
                setword("");
                setWordList((prev) => [
                    ...prev,
                    {
                        word: wordToSend,
                        player: player,
                        score: Math.max(remainingTime, -2),
                    },
                ]);
                setTurn(player === 1 ? 2 : 1);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            console.log(error?.status);
            if (error?.status === 404) {
                setError(`${wordToSend} is not a valid word`);
            }
        }
    }

    return (
        <>
            <form className="w-full" onSubmit={checkWord}>
                <input
                    ref={ref}
                    className=" w-full text-black p-2 rounded-md"
                    value={word}
                    onChange={(e) => setword(e.target.value)}
                    disabled={turn !== player || winner !== 0}
                    placeholder={lastLetter}
                />
            </form>

            <p className="text-red-600 font-bold text-lg">{error}</p>
        </>
    );
};

export default InputComp;
