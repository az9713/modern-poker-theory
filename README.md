# MPT Academy — Modern Poker Theory Interactive Course

An interactive web application that teaches *Modern Poker Theory* by Michael Acevedo to complete beginners — no prior poker or card-game experience required.

![MPT Academy](docs/front.jpg)

## Inspiration

This project was inspired by the YouTube video **"Why Reading Most Books Is A Waste Of Time"** by Chamath Palihapitiya:

> [https://www.youtube.com/watch?v=N9iLEhievoM](https://www.youtube.com/watch?v=N9iLEhievoM)

In the video, **[Modern Poker Theory: Building an unbeatable strategy based on GTO principles](https://www.simonandschuster.com/books/Modern-Poker-Theory/Michael-Acevedo/9781909457898)** by **Michael Acevedo** is mentioned as one of the few books genuinely worth your time — a rigorous, math-grounded guide to No-Limit Hold'em built around Game Theory Optimal play.

This app takes that book's core ideas and turns them into a gamified, interactive learning experience anyone can start from zero.

## Screenshots

![Learning Modules](docs/learning_modules.jpg)

![Interactive Tools](docs/interactive_tools.jpg)

![Progress Tracker](docs/progress_tracker.jpg)

## What You'll Learn

The course follows Acevedo's framework across 8 progressive modules:

| Module | Topic | Belt |
|--------|-------|------|
| 1 | The Poker Universe — deck, hand rankings, table positions | White |
| 2 | The Information Game — range thinking, the 13×13 grid | Blue |
| 3 | Counting What Matters — combinatorics, EV, pot odds, MDF | Blue |
| 4 | Position Power — BTN hierarchy, opening ranges, stack depth | Purple |
| 5 | Reading the Board — static vs dynamic, range vs nut advantage | Purple |
| 6 | Betting Language — bet sizing, c-betting, 7 reasons to bet | Brown |
| 7 | The Full Game — turn/river play, bluff selection, multiway pots | Brown |
| 8 | Exploit Mode — the exploitation matrix, population leaks | Black |

## Features

- **Interactive lessons** with playing card displays, position diagrams, and the 13×13 range grid
- **Quiz system** with three question types: multiple choice, board classification, and numeric calculation
- **Interactive tools**: Pot Odds Calculator, EV Calculator, Range Builder
- **Gamification**: XP, 7 levels (Fish → Poker Theorist), 12 badges, daily streak tracking
- **Progress persistence** via localStorage — picks up where you left off

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

```bash
npm run build   # production build → dist/
```

No backend or API keys required. Fully static.

## The Core Premise

> *Poker is a repeated decision problem under hidden information. GTO gives you the equilibrium baseline. Exploitative poker makes money when opponents deviate from that baseline.*

The goal is not to memorize charts. The goal is to become a **solver-literate, range-based, exploit-capable** decision maker.
