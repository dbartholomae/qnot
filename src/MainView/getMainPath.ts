export function getMainPath(roomCode?: string) {
  if (roomCode === undefined) {
    return "/";
  }
  return `/?roomCode=${roomCode}`;
}
