export function stringOr<T>(input: unknown, fallbackValue: T): string | T {
  if (typeof input === "string") {
    return input
  }

  return fallbackValue
}
