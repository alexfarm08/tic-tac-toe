# Tic Tac Toe

A simple and interactive **browser-based Tic Tac Toe game** built to demonstrate DOM manipulation, modular JavaScript patterns, and game logic skills. Two players take turns placing X and O on a 3x3 board, with the game detecting wins and updating the screen after every move.

🔗 **[Play the live demo](https://alexfarm08.github.io/tic-tac-toe/)**

* * *

## 📸 Screenshot

[![Tic Tac Toe screenshot](imgs/Screenshot%202025-07-15%20at%2010.07.57%E2%80%AFAM.png)](imgs/Screenshot%202025-07-15%20at%2010.07.57%E2%80%AFAM.png)

* * *

## 🚀 Features

- **Classic gameplay:** Standard 3x3 Tic Tac Toe board.
- **Two-player support:** Players take turns as X and O.
- **Turn-based flow:** The game switches players automatically after each move.
- **Win detection:** Checks every row, column, and diagonal for a winner.
- **Dynamic UI:** The screen updates based on the current game state.
- **Reset button:** Restart the game at any time.

* * *

## 📂 Project Structure

| File         | Description                                                                                  |
|--------------|----------------------------------------------------------------------------------------------|
| `index.html` | Page structure and game container.                                                           |
| `main.js`    | All game logic and DOM handling, split into `Gameboard`, `cell`, `GameController`, and `screenController`. |
| `styles.css` | Styling for the board, cells, and layout.                                                    |
| `imgs/`      | Screenshots used in this README.                                                             |

* * *

## 🧩 Modules

| Module              | Description                                                                          |
|---------------------|--------------------------------------------------------------------------------------|
| `Gameboard()`       | Initializes and manages the game board as a 2D array of cells.                       |
| `cell()`            | Factory function representing a single cell with `getValue` and `placePiece` methods. |
| `GameController()`  | Controls game logic, player switching, win detection, and round handling.            |
| `screenController()`| Handles DOM updates, user interactions, and game reset logic.                        |

* * *

## 💻 Tech Stack

- **HTML** – Page structure and semantic markup.
- **CSS** – Styling for the board and layout.
- **JavaScript ES6+** – Factory functions, closures, and DOM manipulation.

* * *

## 🎯 Key Skills Demonstrated

- **Modular JavaScript** using factory functions and closures.
- **Separation of concerns** between game logic and UI rendering.
- **DOM manipulation** and event handling.
- Implementing **win detection** across rows, columns, and diagonals.
- Managing **game state** and turn-based flow.

* * *

## ⚡ Installation & Usage

```bash
# Clone the repository
git clone https://github.com/alexfarm08/tic-tac-toe.git

# Navigate into the project
cd tic-tac-toe

# Open the game in your browser
open index.html
```

No build step or dependencies are required. On Windows use `start index.html`, on Linux use `xdg-open index.html`, or just double-click `index.html`.
