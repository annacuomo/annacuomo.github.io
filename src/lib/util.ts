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

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
