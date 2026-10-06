# Stage 6: Project Documentation & Code Guide - CampusConnect

## Technical Overview
**CampusConnect** is built with React 19, Vite 8, Tailwind CSS v4, and Lucide React icons.

### Project Structure
```
missing-date-tracker/
├── solution.md                 # Stage 1: Problem statement & solution definition
├── user-flow.md                # Stage 2: User flow diagrams & steps
├── design.md                   # Stage 3: Design system & architecture
├── idea-origin.md              # Stage 4: Idea genesis & background
├── documentation.md           # Stage 6: Technical documentation & guide
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Dependencies & scripts
├── src/
│   ├── App.jsx                 # Root container & main state orchestrator
│   ├── App.css                 # Main styling overrides
│   ├── index.css               # Design system & Tailwind imports
│   ├── main.jsx                # React DOM root entry
│   ├── components/
│   │   ├── Navbar.jsx          # Header with logo, metrics & dark mode toggle
│   │   ├── CountdownBanner.jsx # Real-time ticking urgency countdown
│   │   ├── StatSummary.jsx     # Metrics card dashboard
│   │   ├── FilterBar.jsx       # Search & multi-filter controls
│   │   ├── DeadlineCard.jsx    # Card component with status, tags & actions
│   │   ├── QuickAddModal.jsx   # Add & Edit deadline modal form
│   │   ├── UnscramblerModal.jsx# Smart WhatsApp chat text parser
│   │   ├── PomodoroModal.jsx   # Focus study session timer
│   │   ├── ExportModal.jsx     # iCal (.ics) & JSON backup modal
│   │   └── Views/
│   │       ├── ListView.jsx    # Grouped timeline list
│   │       ├── CalendarView.jsx# Monthly interactive grid calendar
│   │       ├── CourseView.jsx  # Subject progress hub
│   │       └── KanbanView.jsx  # 3-column Kanban board
│   ├── data/
│   │   └── mockData.js         # Pre-loaded academic courses & sample deadlines
│   └── utils/
│       ├── dateUtils.js        # Formatting, countdown & urgency calculations
│       ├── textParser.js       # Smart Chat Un-scrambler regex engine
│       └── icalExporter.js     # Standard .ics iCalendar generator
```

---

## Features & Implementation Guide

### 1. Smart Chat Un-scrambler (`textParser.js` & `UnscramblerModal.jsx`)
Parses raw text pasted from WhatsApp messages or emails:
- Detects course codes (`CS101`, `MATH202`, `PHY103`).
- Categorizes items into `Exam`, `Assignment`, `Lab`, `Project`, `Fee`.
- Parses natural language dates ("next Monday", "Oct 27", "tomorrow").

### 2. Live Urgency Countdown (`CountdownBanner.jsx` & `dateUtils.js`)
Calculates real-time ticking countdown (Days : Hours : Mins : Secs) to the closest upcoming urgent deadline. Overdue items trigger a pulsing red warning.

### 3. Multi-View Hub
- **Timeline List**: Grouped by Overdue, Due Today, Next 7 Days, Later, Completed.
- **Calendar Grid**: Visual monthly layout with date click selection.
- **Subject Hub**: Progress bars calculating completion % per course code.
- **Kanban Board**: Drag/move workflow columns.

### 4. iCalendar (.ics) Export (`icalExporter.js`)
Generates standard RFC 5545 `.ics` calendar files so students can import deadlines directly into Google Calendar, Apple Calendar, or Outlook.

---

## AI Code Compliance Statement (Rulebook Section 5)
- **Zero Redundancy**: All components are modular, cleanly structured, and free of duplicated code or dead code.
- **Reviewed & Tested**: Fully verified build via `vite build` with clean execution.

---

## Local Development & Setup
```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Production Build
npm run build
```
