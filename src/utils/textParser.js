// Smart Un-scrambler Parser for Chat Messages & Notebook Notes

export function parseUnstructuredText(rawText) {
  if (!rawText || !rawText.trim()) return [];

  const sentences = rawText
    .split(/(?:\r?\n|;|\. (?=[A-Z]))+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);

  const extracted = [];

  sentences.forEach((sentence, index) => {
    let category = 'Assignment';
    const lower = sentence.toLowerCase();

    if (lower.includes('exam') || lower.includes('midterm') || lower.includes('mid term') || lower.includes('quiz') || lower.includes('test')) {
      category = 'Exam';
    } else if (lower.includes('lab') || lower.includes('practical') || lower.includes('experiment')) {
      category = 'Lab';
    } else if (lower.includes('project') || lower.includes('srs') || lower.includes('milestone') || lower.includes('presentation')) {
      category = 'Project';
    } else if (lower.includes('fee') || lower.includes('tuition') || lower.includes('hall ticket')) {
      category = 'Fee';
    }

    // Detect Course Codes like CS101, MATH202, PHY103, CSE-302
    const courseMatch = sentence.match(/\b([A-Z]{2,4}\s*[-]?\s*\d{3})\b/i);
    const courseCode = courseMatch ? courseMatch[1].toUpperCase().replace(/\s+/g, '') : 'GEN';

    // Priority detection
    let priority = 'Medium';
    if (lower.includes('urgent') || lower.includes('important') || lower.includes('immediately') || lower.includes('exam') || lower.includes('today')) {
      priority = 'High';
    }

    // Date extraction attempts
    let dueDate = new Date();
    // Default 3 days in future if not specified
    dueDate.setDate(dueDate.getDate() + 3);
    dueDate.setHours(23, 59, 0, 0);

    // Check month names like Oct 27, 27th Oct, 27 October, Nov 15
    const monthRegex = /(?:(\d{1,2})(?:st|nd|rd|th)?\s+)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(\d{1,2})?(?:[,\s]+(\d{4}))?/i;
    const monthMatch = sentence.match(monthRegex);

    if (monthMatch) {
      const monthStr = monthMatch[2];
      const dayStr = monthMatch[1] || monthMatch[3] || '15';
      const yearStr = monthMatch[4] || new Date().getFullYear().toString();
      
      const parsedDate = new Date(`${monthStr} ${dayStr}, ${yearStr} 23:59:00`);
      if (!isNaN(parsedDate.getTime())) {
        dueDate = parsedDate;
      }
    } else if (lower.includes('tomorrow')) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(23, 59, 0, 0);
      dueDate = d;
    } else if (lower.includes('next monday')) {
      const d = new Date();
      const currentDay = d.getDay();
      const distance = (1 + 7 - currentDay) % 7 || 7;
      d.setDate(d.getDate() + distance);
      d.setHours(23, 59, 0, 0);
      dueDate = d;
    }

    // Clean title
    let title = sentence.replace(/^(guys|prof|attention|reminder|note|dear students):?/i, '').trim();
    if (title.length > 80) {
      title = title.substring(0, 77) + '...';
    }

    extracted.push({
      id: `extracted-${Date.now()}-${index}`,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      courseCode: courseCode,
      courseId: courseCode,
      category: category,
      dueDate: dueDate.toISOString(),
      priority: priority,
      status: 'Pending',
      bookmarked: false,
      description: `Extracted from chat note: "${sentence}"`,
      tags: ['ExtractedFromChat', courseCode],
      weightage: 'TBD',
      location: 'WhatsApp / Chat Notice'
    });
  });

  return extracted;
}
