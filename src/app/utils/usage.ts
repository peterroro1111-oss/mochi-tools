const RECENT_KEY = 'mochi-recent-tools';
const COUNTER_KEY = 'mochi-file-counter';
const MAX_RECENT = 8;

export interface RecentTool {
  href: string;
  timestamp: number;
}

export function getRecentTools(): RecentTool[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordToolUsage(href: string): void {
  if (typeof window === 'undefined') return;
  try {
    let recent = getRecentTools();
    // Remove existing entry for this tool
    recent = recent.filter((t) => t.href !== href);
    // Add to front
    recent.unshift({ href, timestamp: Date.now() });
    // Keep only MAX_RECENT
    recent = recent.slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  } catch {
    // localStorage full or unavailable
  }
}

export function getFileCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

export function incrementFileCount(count: number = 1): number {
  if (typeof window === 'undefined') return 0;
  try {
    const current = getFileCount();
    const next = current + count;
    localStorage.setItem(COUNTER_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}
