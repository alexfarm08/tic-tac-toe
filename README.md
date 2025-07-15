# Tic Tac Toe

A simple and interactive browser-based Tic Tac Toe game built using **HTML**, **CSS**, and **JavaScript**. This project uses modular JavaScript patterns and DOM manipulation to provide a clean and responsive 2-player experience.

## Screenshot

![screenshot](/imgs/Screenshot%202025-07-15%20at%2010.07.57 AM.png)

## Features

- Classic 3x3 Tic Tac Toe game
- Two-player support (X and O)
- Turn-based game flow
- Win detection for all rows, columns, and diagonals
- Dynamic screen updates based on game state
- Reset button to restart the game

## Built with

- HTML
- CSS
- JavaScript

## modules and structure

- Gameboard() – Initializes and manages the game board as a 2D array of cells.
- cell() – Factory function representing a single cell with getValue and placePiece methods.
- GameController() – Controls the game logic, player switching, win detection, and round handling.
- screenController() – Handles DOM updates, user interactions, and game reset logic.