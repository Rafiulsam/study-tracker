# Study Tracker

Study Tracker is a lightweight React app for tracking study sessions, saving time logs locally, and exporting session history as a `.csv` file.

## Summary

This app lets you start a study timer, stop it when you're done, and store each session in your browser. Your session history appears in the UI, and you can export your tracked study sessions to a CSV file for further analysis.

## Features

- Start / stop timer for a study session
- Auto-save session history to `localStorage`
- View session history with start time, end time, and duration
- Export session history as a `.csv` file
- Clear session history with a confirmation prompt
- Responsive UI with a blurred background overlay and smooth button animations

## Technology

- **React** — UI and state management
- **Vite** — fast development server and build tool
- **Tailwind CSS** — utility-first styling
- **SweetAlert2** — confirmation dialogs for clearing history

## Installation

```bash
cd study-tracker
yarn install
```

## Running Locally

```bash
yarn dev
```

Open the URL shown in the terminal to view the app.

## Build for Production

```bash
yarn build
```

## Usage

1. Click **Start** to begin a study session.
2. Click **Stop** to end the session and save it.
3. View the session history below the timer.
4. Click **Export CSV** to download session data.
5. Click **Clear** to remove all saved sessions.

## Notes

- Session history is saved only in the browser using `localStorage`.
- Exported CSV timestamps are formatted in your local timezone.
- The duration is recorded as the actual elapsed study time.

## Project Structure

- `src/pages/Home.jsx` — main app screen, timer actions, export logic
- `src/components/Controls.jsx` — start/stop button UI
- `src/components/Timer.jsx` — display timer output
- `src/hook/useTimer.js` — timer state and interval logic
- `src/utils/formatTime.js` — duration formatting helper

## License

This project is free to use and modify.
