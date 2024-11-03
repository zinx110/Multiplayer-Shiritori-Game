# Shiritory Game

A Shiritori game for 2 players to play together

## Live Link 
[https://multiplayer-shiritori-game.vercel.app/](https://multiplayer-shiritori-game.vercel.app/)

## Demo
![image](https://github.com/user-attachments/assets/42f36ef4-589f-4f15-a1c7-4e10952c6cba)



## Used Technologies

-   Next JS 15
-   Tailwind CSS
-   [Dictionary API](https://dictionaryapi.dev/)

## Gameplay instructions

-   play as player 1 or 2
-   write a word of at least 4 characters
-   word must start with last letter of the previous word, have a minimum of 4 letters, and can not be repeated
-   press enter to submit
-   if its a valid word, you get remaining time as points
-   players must submit a word within 15 seconds or they will get negative scores
-   -2 is the limit of negative score, if user cant submit a word within 10 seconds after time is up, the game is passed to next player
-   points are added to total score
-   first player to reach 100 wins

## Runing Locally

FIrst, install the npm packages

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
