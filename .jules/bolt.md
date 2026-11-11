## 2024-11-12 - Prevent Hidden O(N²) in Relational Models
**Learning:** In heavily relational data models (like VisualNovel -> Chapters -> Scenes -> Characters), iterating arrays with `Array.find` or `Array.filter` directly inside render loops causes hidden O(N²) scaling overhead.
**Action:** Avoid iterating arrays directly in loops. Always pre-compute relationships using `useMemo` Hash Maps (e.g., `Map<string, Scene[]>`) to ensure O(1) lookups during render.
