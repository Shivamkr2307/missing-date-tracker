// iCalendar (.ics) export generator for CampusConnect

function formatDateToICS(isoString) {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function exportDeadlinesToICS(deadlines, filename = 'campusconnect-deadlines.ics') {
  if (!deadlines || deadlines.length === 0) return false;

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CampusConnect//Academic Deadline Hub//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ].join('\r\n') + '\r\n';

  deadlines.forEach(item => {
    const startIso = item.dueDate;
    // Assume 1-hour duration for events/deadlines
    const endDate = new Date(new Date(item.dueDate).getTime() + 60 * 60 * 1000).toISOString();
    const dtStart = formatDateToICS(startIso);
    const dtEnd = formatDateToICS(endDate);
    const dtStamp = formatDateToICS(new Date().toISOString());

    const summary = `[${item.courseCode || 'Campus'}] ${item.title}`;
    const description = `${item.description || ''} | Category: ${item.category} | Priority: ${item.priority}`;
    const location = item.location || 'Campus';

    icsContent += [
      'BEGIN:VEVENT',
      `UID:${item.id}@campusconnect.edu`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `STATUS:${item.status === 'Completed' ? 'COMPLETED' : 'CONFIRMED'}`,
      'END:VEVENT'
    ].join('\r\n') + '\r\n';
  });

  icsContent += 'END:VCALENDAR\r\n';

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
