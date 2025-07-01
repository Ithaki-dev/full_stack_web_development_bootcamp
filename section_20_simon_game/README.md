# Simon Game

This project is a web-based implementation of the classic Simon Game using JavaScript and jQuery.

## How to Play

1. **Start the Game:**  
   Press any key to begin. The game will display a sequence of colors.

2. **Watch the Sequence:**  
   The game will highlight a button and play a sound for each color in the sequence.

3. **Repeat the Sequence:**  
   Click the colored buttons in the same order as shown.

4. **Advance Levels:**  
   Each time you successfully repeat the sequence, the game adds a new color to the pattern.

5. **Game Over:**  
   If you click the wrong button, the game will play a "wrong" sound and display a game over message. Press any key to restart.

## File Structure

- `game.js` — Main game logic (pattern generation, user input, sound, and animation).
- `sounds/` — Folder containing sound files (`red.mp3`, `blue.mp3`, `green.mp3`, `yellow.mp3`, `wrong.mp3`).
- HTML file — Should include jQuery and reference `game.js`.

## Dependencies

- [jQuery](https://jquery.com/) (required for DOM manipulation and event handling)

## Key Functions

- `nextSequence()` — Generates the next color in the sequence.
- `animatePress(color)` — Animates the button press.
- `playSound(name)` — Plays the sound for the given color.
- `checkAnswer(currentLevel)` — Checks if the user's input matches the game pattern.
- `startOver()` — Resets the game state after a wrong answer.

## Customization

- You can change the colors or add more by editing the `buttonColors` array and adding corresponding sound files.
- Style the buttons and layout using CSS for a better user experience.

## Troubleshooting

- **No sound?**  
  Make sure your browser allows audio playback and that the user interacts with the page before sounds play.
- **jQuery errors?**  
  Ensure jQuery is included in your HTML before `game.js`.

---

Enjoy playing and customizing your Simon Game!