export function convertPathToUrl(path: string) {
  return `${window.location.protocol}//${window.location.host}${process.env.PUBLIC_URL}${path}`;
}
