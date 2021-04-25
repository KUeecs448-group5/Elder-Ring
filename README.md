# Elder Ring
Turn-based battle game - inspired by Final Fantasy & Dark Souls
Created with JavaScript, HTML, and CSS
User vs AI

## Initialization
To run this program, open p3.HTML as a live server (requires the Live Server VSCode Extension, or equivalent)

## Mechanics
To begin, the user is prompted to select from 3 different worlds, based on
1. Dark Souls
2. Final Fantasy VII
3. Neon Genesis Evangelion

Each team will have a turn, in which all their characters can act, then the opposing team will have their turn.
The user has the first turn.

Each turn, each character on a team has four options:
- Attack: Select a single enemy target to attack for moderate damage
- AOE: Attack the entire enemy team for low damage
- Item: Select a single enemy target to attack for high damage (only 3 uses per character)
- Heal: Select a single ally to heal a moderate amount

To select your target, click on their image (a dashed outline will appear to indicate a valid target)

After a team has been defeated, the user will be prompted to play again.

## Test Suite
Press 'T' in the menu to run a test suite. Results are posted in the console

After testing, refresh the tab to reload the HTML which was altered during testing