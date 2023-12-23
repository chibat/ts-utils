export function getLocales(request: Request): Intl.Locale[] {
  const values = request.headers.get("accept-language")?.split(",") ?? [];
  return values.filter((x) => x.trim()).map((x) => new Intl.Locale(x));
}
