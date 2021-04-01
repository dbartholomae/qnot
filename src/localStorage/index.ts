export function saveToLocalStorage(key: string, value: string) {
  localStorage.setItem(`qnot/${key}`, value);
}

export function getFromLocalStorage(key: string): string | null {
  return localStorage.getItem(`qnot/${key}`) ?? null;
}
