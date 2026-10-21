const SESSION_KEY = "bakesale-unlocked";

/** True when this browser session already unlocked with the current passcode. */
export function isSessionUnlocked(passcode: string): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === passcode.toLowerCase();
  } catch {
    return false;
  }
}

/** Remember the unlock for this browser session; silently ignores blocked storage. */
export function rememberSessionUnlock(passcode: string): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, passcode.toLowerCase());
  } catch {
    // storage blocked: unlock still works for this page view
  }
}
