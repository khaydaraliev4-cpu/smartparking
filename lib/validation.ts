const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export function isStrongPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

export function sixDigitCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}
