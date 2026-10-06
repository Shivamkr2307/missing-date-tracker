// Initial Mock Academic Deadlines for CampusConnect (Problem Statement #4)

export const INITIAL_COURSES = [
  { id: 'CS101', code: 'CS101', name: 'Data Structures & Algorithms', instructor: 'Dr. A. Sharma', color: '#6366f1' },
  { id: 'MATH202', code: 'MATH202', name: 'Linear Algebra & Calculus', instructor: 'Prof. R. Mehta', color: '#06b6d4' },
  { id: 'PHY103', code: 'PHY103', name: 'Applied Physics & Optics', instructor: 'Dr. S. Verma', color: '#ec4899' },
  { id: 'SOFT401', code: 'SOFT401', name: 'Software Engineering & Agile', instructor: 'Prof. K. Gupta', color: '#10b981' },
  { id: 'ENG105', code: 'ENG105', name: 'Technical Communication', instructor: 'Dr. M. Patel', color: '#f59e0b' }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'Exam', label: 'Exams & Quizzes', icon: 'BookOpen', color: 'bg-red-500/10 text-red-500 border-red-500/30' },
  { id: 'Assignment', label: 'Assignments', icon: 'FileText', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  { id: 'Lab', label: 'Lab Submissions', icon: 'FlaskConical', color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
  { id: 'Project', label: 'Project Milestones', icon: 'FolderGit2', color: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
  { id: 'Fee', label: 'Fee / Admin', icon: 'CreditCard', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  { id: 'Event', label: 'Club / Event', icon: 'Calendar', color: 'bg-pink-500/10 text-pink-500 border-pink-500/30' }
];

// Helper to generate dynamic relative dates so sample data is always relevant
const now = new Date();
const addDays = (days, hours = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(d.getHours() + hours);
  return d.toISOString();
};

export const INITIAL_DEADLINES = [
  {
    id: 'dl-1',
    title: 'CS101 Mid-Semester Examination',
    courseId: 'CS101',
    courseCode: 'CS101',
    category: 'Exam',
    dueDate: addDays(0, 4), // Due today in 4 hours
    priority: 'High',
    status: 'Pending',
    bookmarked: true,
    description: 'Covers Trees, Binary Search Trees, Heaps, and Graph Algorithms (BFS/DFS). Closed-book exam in Hall 3B.',
    tags: ['Exam', 'Trees', 'Graphs'],
    weightage: '25% of final grade',
    location: 'Main Auditorium Hall 3B',
    createdAt: addDays(-5)
  },
  {
    id: 'dl-2',
    title: 'Lab Report 4: Oscilloscope & Waveform Analysis',
    courseId: 'PHY103',
    courseCode: 'PHY103',
    category: 'Lab',
    dueDate: addDays(-1), // Overdue by 1 day
    priority: 'High',
    status: 'Pending',
    bookmarked: false,
    description: 'Submit PDF report with circuit diagram screenshots and error analysis calculations.',
    tags: ['Lab', 'Physics'],
    weightage: '10% of lab score',
    location: 'Physics Lab II Portal',
    createdAt: addDays(-6)
  },
  {
    id: 'dl-3',
    title: 'Software System Architecture Document (SRS + Class Diagram)',
    courseId: 'SOFT401',
    courseCode: 'SOFT401',
    category: 'Project',
    dueDate: addDays(2, 6), // Due in 2 days
    priority: 'High',
    status: 'In Progress',
    bookmarked: true,
    description: 'Team deliverable: Submit complete UML Use Case, Class, and Sequence Diagrams along with System Requirement Specs.',
    tags: ['Team Project', 'UML', 'Agile'],
    weightage: '20% of project grade',
    location: 'GitHub / Canvas LMS',
    createdAt: addDays(-7)
  },
  {
    id: 'dl-4',
    title: 'Linear Algebra Problem Set #5',
    courseId: 'MATH202',
    courseCode: 'MATH202',
    category: 'Assignment',
    dueDate: addDays(4), // Due in 4 days
    priority: 'Medium',
    status: 'Pending',
    bookmarked: false,
    description: 'Solve questions 1 through 12 from Chapter 4 on Eigenvalues, Eigenvectors, and Matrix Diagonalization.',
    tags: ['Math', 'Homework'],
    weightage: '5% of total score',
    location: 'Moodle Portal',
    createdAt: addDays(-3)
  },
  {
    id: 'dl-5',
    title: 'Technical Presentation Draft Submission',
    courseId: 'ENG105',
    courseCode: 'ENG105',
    category: 'Assignment',
    dueDate: addDays(6), // Due in 6 days
    priority: 'Low',
    status: 'Pending',
    bookmarked: false,
    description: 'Submit 5-minute presentation slide deck on "AI Ethics in Academic Integrity".',
    tags: ['Presentation', 'Slides'],
    weightage: '15%',
    location: 'Google Drive Link',
    createdAt: addDays(-2)
  },
  {
    id: 'dl-6',
    title: 'End-Semester Tuition Fee Clearance (Quarter 2)',
    courseId: 'GEN',
    courseCode: 'ADMIN',
    category: 'Fee',
    dueDate: addDays(10),
    priority: 'High',
    status: 'Pending',
    bookmarked: true,
    description: 'Clear semester fee payment on student portal to avoid hall ticket blockage during final exams.',
    tags: ['Fee', 'Administrative'],
    weightage: 'Mandatory',
    location: 'Student Finance Portal',
    createdAt: addDays(-10)
  },
  {
    id: 'dl-7',
    title: 'Data Structures Quiz #2 (Sorting & Searching)',
    courseId: 'CS101',
    courseCode: 'CS101',
    category: 'Exam',
    dueDate: addDays(-3),
    priority: 'Medium',
    status: 'Completed',
    bookmarked: false,
    description: 'Multiple choice quiz on Quicksort, Mergesort, and Hash Tables.',
    tags: ['Quiz', 'Algorithms'],
    weightage: '10%',
    location: 'Online Quiz Portal',
    createdAt: addDays(-12)
  }
];

export const RAW_CHAT_EXAMPLES = [
  {
    title: 'Class WhatsApp Group Announcement',
    text: `Guys prof sharma just sent message: CS101 assignment 3 on Binary Trees is due next Monday 27th Oct at 11:59 PM. Submit on Moodle! Also remember mid term exam for PHY103 is scheduled on 30th Oct at 10:00 AM in Hall 2.`
  },
  {
    title: 'Notice Board Photo OCR Text',
    text: `ATTENTION ALL STUDENTS: Semester Fee Payment deadline extended to 15th Nov 2026. Lab Report 5 for Electronics due 5th Nov 5 PM.`
  }
];
