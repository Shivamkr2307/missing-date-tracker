// Date calculation and formatting helpers for CampusConnect

export function formatDateTime(isoString) {
  if (!isoString) return 'No date set';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export function formatDateShort(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function getUrgencyInfo(isoString, status) {
  if (status === 'Completed') {
    return {
      status: 'Completed',
      label: 'Completed',
      badgeClass: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
      dotColor: 'bg-emerald-500',
      isOverdue: false,
      priorityRank: 99
    };
  }

  const now = new Date();
  const due = new Date(isoString);
  const diffMs = due - now;
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffMs < 0) {
    const overdueDays = Math.abs(Math.floor(diffDays));
    return {
      status: 'Overdue',
      label: overdueDays === 0 ? 'Overdue (Today)' : `Overdue by ${overdueDays}d`,
      badgeClass: 'bg-rose-500/15 text-rose-500 border-rose-500/30 animate-pulse',
      dotColor: 'bg-rose-500',
      isOverdue: true,
      priorityRank: 1
    };
  }

  if (diffHours <= 24) {
    const hours = Math.max(1, Math.floor(diffHours));
    return {
      status: 'Due Today',
      label: `Due in ${hours}h`,
      badgeClass: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
      dotColor: 'bg-amber-500',
      isOverdue: false,
      priorityRank: 2
    };
  }

  if (diffDays <= 3) {
    const days = Math.ceil(diffDays);
    return {
      status: 'Due Soon',
      label: `Due in ${days} days`,
      badgeClass: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
      dotColor: 'bg-yellow-500',
      isOverdue: false,
      priorityRank: 3
    };
  }

  const days = Math.ceil(diffDays);
  return {
    status: 'Upcoming',
    label: `In ${days} days`,
    badgeClass: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    dotColor: 'bg-indigo-400',
    isOverdue: false,
    priorityRank: 4
  };
}

export function calculateTimeRemaining(isoString) {
  if (!isoString) return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

  const now = new Date();
  const due = new Date(isoString);
  const totalMs = due - now;

  if (totalMs <= 0) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return { totalMs, days, hours, minutes, seconds, isPast: false };
}
