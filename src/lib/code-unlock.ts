/**
 * True when the URL ?code= parameter matches the passcode (case-insensitive).
 * A QR scan always carries the code, so every such visit opens the donate
 * modal, even when the session is already unlocked. Visits without the
 * parameter (returning from the ingredients page, Back button, plain reload)
 * never auto-open the modal.
 */
export function isCodeUnlock(codeParam: string | null, passcode: string): boolean {
  return !!codeParam && codeParam.toLowerCase() === passcode.toLowerCase();
}
