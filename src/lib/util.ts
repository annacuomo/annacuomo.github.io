// Small helpers used across pages.

// Build a link that works both on the preview (/new-website/...) and the final site (/...).
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}

// Wrap my name in <strong> inside an author list.
export function highlightMe(authors: string): string {
  return authors.replace(/(Cuomo ASE?[*#]*)(?=[,\s]|$)/g, '<strong>$1</strong>');
}

// Turn **bold** in plain text into <strong>bold</strong> (used for the bio).
export function boldify(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Which colour a paper link gets, based on its label.
export function linkKind(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('preprint')) return 'preprint';
  if (l.includes('analys') || l.includes('pipeline') || l.includes('workflow') || l.includes('notebook')) return 'analysis';
  if (l.includes('code') || l.includes('software') || l.includes('package')) return 'code';
  if (l.includes('data') || l.includes('zenodo')) return 'data';
  return 'web';
}
