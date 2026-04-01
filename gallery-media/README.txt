Put gallery files in this folder and reference them from ../gallery-data.js.

Suggested workflow:
1. Copy media files here, for example:
   - gallery-media/condensate-01.png
   - gallery-media/phase-map.gif
   - gallery-media/live-cell-loop.mp4
2. Open gallery-data.js and add or edit one item.
3. For still images use:
   mediaType: "image",
   mediaSrc: "gallery-media/condensate-01.png"
4. For animated media use:
   mediaType: "video",
   mediaSrc: "gallery-media/live-cell-loop.mp4",
   poster: "gallery-media/live-cell-loop-poster.jpg"

Useful size controls in gallery-data.js:
- aspectRatio: tile width/height ratio
  - `1` is square
  - `1.2` is slightly wide
  - `0.9` is slightly tall
- size: optional emphasis hint
  - `small`, `medium`, or `large`
- colSpan: optional manual width override if you want a specific tile wider or narrower
