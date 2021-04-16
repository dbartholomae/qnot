export function saveToLocalStorage(key: string, value: string): string {
  localStorage.setItem(`qnot/${key}`, value);
  return value;
}

export function getFromLocalStorage(key: string): string | null {
  return localStorage.getItem(`qnot/${key}`) ?? null;
}
