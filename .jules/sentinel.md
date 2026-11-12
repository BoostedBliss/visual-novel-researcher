## 2024-11-09 - Prevent Unbounded Memory Growth in Rate Limiting
**Vulnerability:** A simple in-memory rate limiter using a `Map` can suffer from unbounded memory growth, potentially leading to Out-Of-Memory (OOM) Denial of Service if attackers constantly cycle spoofed IP addresses.
**Learning:** Always include a mechanism to periodically clear out stale data or clear the entire map on a fixed interval when using naive in-memory stores for rate limiting.
**Prevention:** Include a simple cleanup mechanism like `setInterval(() => rateLimitMap.clear(), RATE_LIMIT_WINDOW_MS)`.

## 2024-11-08 - Prevent DoS and Error Leakage in Generation Endpoint
**Vulnerability:** The `/api/generate-storyboard` endpoint did not validate the input types of its JSON body, and a TypeError caused the whole Express process to crash when an integer was passed. Furthermore, the generic error handler leaked potentially sensitive detailed error stack trace or internal API errors out to the client.
**Learning:** We need to explicitly validate `typeof` string properties in Express endpoints handling parsed JSON payload to avoid runtime exceptions crashing the process, and we must mask errors from being sent back to the client directly.
**Prevention:** Make sure all API endpoints strongly type check client-controlled inputs (using `typeof` or robust schemas like Zod) and wrap API error returns in generic error strings.
