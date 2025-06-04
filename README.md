# Number Clicking Game

A fun, interactive web-based game where players need to click numbers in ascending order as quickly as possible.

## Description

This project is a reaction-time and memory game where random numbered points are generated on a game board. Players must click on the numbers in sequential order (starting from 1) as fast as they can. The game features a timer to track performance and a hint system to help when players get stuck.

## 🎮 Game Screenshots

### Main Game Interface

<p align="center">
  <img src="https://res.cloudinary.com/dab8vbas9/image/upload/v1745858566/image1_odvnqb.png" width="400" alt="Main game screen showing numbered dots">
</p>

### Using Hint Feature

<p align="center">
  <img src="https://res.cloudinary.com/dab8vbas9/image/upload/v1745858567/hintImage_mpt2he.png" width="400" alt="Game screen with next number highlighted by hint system">
</p>

### Victory Screen

<p align="center">
  <img src="https://res.cloudinary.com/dab8vbas9/image/upload/v1745858567/winGame_xtoweb.png" width="400" alt="Winning screen showing completion message">
</p>

### Game Over Screen

<p align="center">
  <img src="https://res.cloudinary.com/dab8vbas9/image/upload/v1745858566/gameOver_jlnzm3.png" width="400" alt="Game over screen showing failed attempt">
</p>

## Features

- **Dynamic Board Generation**: Random placement of numbered points on the game board
- **Interactive Gameplay**: Click numbers in ascending order to clear the board
- **Timer**: Track how quickly you can complete the gamea
- **Customizable Difficulty**: Adjust the number of points on the board
- **Hint System**: Get help finding the next number when needed
- **Responsive Design**: Works on different screen sizes

## Game Mechanics

1. **Setup**: Choose how many numbered points you want on the board
2. **Start**: Click "Start Game" to begin
3. **Gameplay**: Find and click numbers in ascending order (1, 2, 3, etc.)
4. **Winning**: Clear all numbers from the board to win
5. **Game Over**: Clicking numbers out of sequence ends the game
6. **Hint**: Use the hint button to highlight the next number you need to find

## Technologies Used

- React.js
- CSS/Tailwind CSS
- JavaScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nhnam2003/haibazo-entrance-test.git
   ```

2. Navigate to the project directory:

   ```bash
   cd haibazo-entrance-test
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start or npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173/`

## Project Structure

```
habazo-entrancetest/
├── public/                   # Static assets
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── button/
│   │   │   ├── AutoPlayButton.jsx    # Auto play button component
│   │   │   └── RestartButton.jsx # Start/Reset button
│   │   ├── BoardGame.jsx     # Game board rendering
│   │   └── GameInfo.jsx      # Game point information and time
│   ├── pages/
│   │   └── GamePlay.jsx      # Main game page
│   ├── utils/
│   │   └── generateRandomPoints.js # Random point generator
│   ├── App.css               # Global styles
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Application entry
│   └── index.css             # Base styles
├── .gitignore
├── package.json
├── README.md
└── vite.config.js            # Vite configuration
```

## How to Play

1. Set the number of points you want to challenge yourself with
2. Click "Start Game"
3. Find and click on the number 1
4. Continue clicking numbers in ascending order (2, 3, 4, etc.)
5. If you get stuck, use the "AutoPlay" button 
6. Try to clear all numbers as quickly as possible!
