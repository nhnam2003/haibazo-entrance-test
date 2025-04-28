# Number Clicking Game

A fun, interactive web-based game where players need to click numbers in ascending order as quickly as possible.

## Description

This project is a reaction-time and memory game where random numbered points are generated on a game board. Players must click on the numbers in sequential order (starting from 1) as fast as they can. The game features a timer to track performance and a hint system to help when players get stuck.

## Features

- **Dynamic Board Generation**: Random placement of numbered points on the game board
- **Interactive Gameplay**: Click numbers in ascending order to clear the board
- **Timer**: Track how quickly you can complete the game
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
   git clone https://github.com/yourusername/number-clicking-game.git
   ```

2. Navigate to the project directory:
   ```bash
   cd number-clicking-game
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:5173/`

## Project Structure

```
number-clicking-game/
├── public/
├── src/
│   ├── components/
│   │   ├── BoardGame.js        # Game board rendering component
│   │   ├── GameInfo.js         # Game statistics and controls
│   │   └── RestartButton.js    # Button to start/reset the game
│   ├── utils/
│   │   └── generateRandomPoints.js    # Logic for generating random points
│   ├── App.css                 # Global styles
│   ├── App.js                  # Main application component
│   ├── GamePlay.js             # Game logic and state management
│   └── index.js                # Application entry point
└── package.json
```

## How to Play

1. Set the number of points you want to challenge yourself with
2. Click "Start Game"
3. Find and click on the number 1
4. Continue clicking numbers in ascending order (2, 3, 4, etc.)
5. If you get stuck, use the "Hint" button to highlight the next number
6. Try to clear all numbers as quickly as possible!

## Future Enhancements

- Multiple difficulty levels
- High score tracking
- Sound effects
- Visual animations
- Multiplayer mode

## Contributing

