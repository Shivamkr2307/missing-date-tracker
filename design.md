# Stage 3: Design System & UI Architecture - CampusConnect

## Design Philosophy & Aesthetics
CampusConnect is built with a modern, glassmorphic aesthetic optimized for student engagement, clarity, and zero cognitive fatigue.

### Color Palette & Tokens
- **Primary Accent**: Indigo (`#6366f1` / `rgb(99, 102, 241)`) - represents focus and academic clarity.
- **Urgent / Overdue**: Rose (`#f43f5e`) with pulsing glow.
- **Due Today**: Amber (`#f59e0b`).
- **Completed**: Emerald (`#10b981`).
- **Dark Mode Background**: Slate 950 (`#020617`) with glass border overlays (`#1e293b`).
- **Light Mode Background**: Slate 50 (`#f8fafc`).

### Typography
- **Headings**: Outfit (Google Fonts) - Geometric, modern, friendly.
- **Body & Controls**: Inter (Google Fonts) - High legibility at small scale.

### Component Design Tokens
- **Border Radius**: `16px` (`rounded-2xl`) for main cards, `12px` (`rounded-xl`) for buttons and pills.
- **Micro-Interactions**: Hover scale `scale-[1.02]`, active scale `scale-[0.98]`, smooth background transitions.
- **Visual Badges**: Course pills, category tags, weightage indicators, priority status (`HIGH`, `MED`, `LOW`).

### Layout Architecture
1. **Header Navbar**: Sticky header with logo, live statistics badge bar, un-scrambler trigger, export trigger, sample data reset, and dark/light theme switch.
2. **Urgent Countdown Banner**: Full-width high contrast alert banner with real-time ticking clock.
3. **Stat Summary Grid**: 5 responsive metric cards.
4. **Filter & View Switcher Bar**: Search box, category pills, dropdown filters, and 4-way view mode selector.
5. **Interactive Views**: Timeline List, Monthly Grid Calendar, Course Hub with Progress Bars, and 3-column Kanban.
