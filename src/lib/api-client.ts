// Client-side fetch helper for this app's own JSON API. Always sends
// application/json (required by rejectCrossSite) and never throws on HTTP
// errors: callers branch on `ok`.
export type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number; error: string };

export async function api<T>(path: string, init: { method: string; body?: unknown }): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      method: init.method,
      headers: { "Content-Type": "application/json" },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: "no-store",
    });
    const payload: unknown = await res.json().catch(() => null);
    if (res.ok) return { ok: true, data: payload as T };
    const error =
      payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
        ? payload.error
        : "Something went wrong.";
    return { ok: false, status: res.status, error };
  } catch {
    return { ok: false, status: 0, error: "You look offline. Try again." };
  }
}
