export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/** True for empty values and for template placeholders like "[MY_RESUME_URL]". */
export const isPlaceholder = (value?: string) =>
  !value || /^\s*\[.*\]\s*$/.test(value);

/** Returns the value, or the fallback while it is still a placeholder. */
export const resolveLink = (value: string | undefined, fallback: string) =>
  isPlaceholder(value) ? fallback : (value as string);

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

export const githubUsername = (url?: string): string | null => {
  if (isPlaceholder(url)) return null;
  try {
    const parts = new URL(url as string).pathname.split("/").filter(Boolean);
    return parts[0] ?? null;
  } catch {
    return null;
  }
};
