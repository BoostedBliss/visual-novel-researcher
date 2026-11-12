## 2025-05-18 - App re-renders cause heavy SVG computations
**Learning:** `AnimeCharacterSprite` contains numerous complex SVG elements, gradients, and animations that are being re-rendered unnecessarily on every keystroke/dialogue tick because the parent `App` or `DialogueBox` state updates frequently. This is a common performance pitfall in React apps with heavy SVG graphics.
**Action:** Wrap `AnimeCharacterSprite` in `React.memo` (just like `SceneBackground`) to prevent these expensive computations unless the props (`character`, `expression`, `isSpeaking`, `customPlayer`) actually change.
