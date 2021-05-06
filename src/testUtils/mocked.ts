export function mocked<F extends (...args: any[]) => any>(
  fn: F
): jest.MockedFunction<F> {
  return (fn as unknown) as jest.MockedFunction<F>;
}
