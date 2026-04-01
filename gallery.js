(() => {
  const root = document.getElementById("gallery-mosaic");
  const data = window.galleryData;

  if (!root || !Array.isArray(data)) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const GRID_ROW_HEIGHT = 8;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const renderMedia = (item) => {
    if (item.mediaType === "video" && item.mediaSrc) {
      return `
        <video
          class="gallery-media"
          src="${escapeHtml(item.mediaSrc)}"
          ${item.poster ? `poster="${escapeHtml(item.poster)}"` : ""}
          muted
          autoplay
          loop
          playsinline
          preload="metadata"
          aria-label="${escapeHtml(item.alt || item.title)}"
        ></video>
      `;
    }

    if (item.mediaSrc) {
      return `<img class="gallery-media" src="${escapeHtml(item.mediaSrc)}" alt="${escapeHtml(item.alt || item.title)}">`;
    }

    return `<div class="gallery-fallback gallery-theme-surface gallery-theme-surface--${escapeHtml(item.theme || "mist")}" aria-hidden="true"></div>`;
  };

  const renderPiece = (item, index) => {
    const style = [
      `--tile-ratio:${Number(item.aspectRatio) || 1.02}`,
      `--stagger-delay:${index * 70}ms`
    ].join(";");

    return `
      <article class="gallery-piece" data-index="${index}" style="${style}">
        <div class="gallery-piece-inner">
          ${renderMedia(item)}
          <div class="gallery-piece-overlay">
            <div class="gallery-piece-copy">
              ${item.eyebrow ? `<div class="eyebrow">${escapeHtml(item.eyebrow)}</div>` : ""}
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  };

  root.innerHTML = data.map(renderPiece).join("");

  const pieces = Array.from(root.querySelectorAll(".gallery-piece"));
  const medias = Array.from(root.querySelectorAll(".gallery-media"));

  const getPreferredSpan = (ratio, sizeHint) => {
    if (sizeHint === "large") {
      return ratio >= 1.15 ? 8 : 6;
    }

    if (sizeHint === "small") {
      return ratio >= 1.25 ? 5 : 4;
    }

    if (ratio >= 1.75) {
      return 8;
    }

    if (ratio >= 1.3) {
      return 6;
    }

    if (ratio <= 0.78) {
      return 4;
    }

    return 5;
  };

  const applyLayout = () => {
    const rootStyles = window.getComputedStyle(root);
    const gap = parseFloat(rootStyles.columnGap || rootStyles.gap || "22");
    const width = root.clientWidth;
    if (!width) {
      return;
    }

    const currentColumns = window.innerWidth <= 640 ? 2 : window.innerWidth <= 980 ? 6 : 12;
    const minSpan = currentColumns <= 2 ? 2 : currentColumns <= 6 ? 3 : 4;
    const maxSpan = currentColumns <= 2 ? 2 : currentColumns <= 6 ? 6 : 8;
    const colWidth = (width - gap * (currentColumns - 1)) / currentColumns;

    pieces.forEach((piece, index) => {
      const item = data[index] || {};
      const media = piece.querySelector(".gallery-media");
      const naturalRatio =
        media && media.tagName === "IMG" && media.naturalWidth && media.naturalHeight
          ? media.naturalWidth / media.naturalHeight
          : media && media.tagName === "VIDEO" && media.videoWidth && media.videoHeight
            ? media.videoWidth / media.videoHeight
            : 0;

      const ratio = Number(item.aspectRatio) || naturalRatio || 1.02;
      const span = Number(item.colSpan) || getPreferredSpan(ratio, item.size);
      const clampedSpan = Math.max(minSpan, Math.min(maxSpan, span));
      const tileWidth = colWidth * clampedSpan + gap * (clampedSpan - 1);
      const tileHeight = tileWidth / ratio;
      const rowSpan = Math.max(22, Math.round((tileHeight + gap) / (GRID_ROW_HEIGHT + gap)));

      piece.style.setProperty("--tile-ratio", `${ratio}`);
      piece.style.setProperty("--tile-span", `${clampedSpan}`);
      piece.style.setProperty("--tile-rows", `${rowSpan}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  pieces.forEach((piece) => observer.observe(piece));

  medias.forEach((media) => {
    if (media.tagName === "IMG") {
      if (media.complete) {
        applyLayout();
      } else {
        media.addEventListener("load", applyLayout, { once: true });
      }
      return;
    }

    media.addEventListener("loadedmetadata", applyLayout, { once: true });
  });

  if (reducedMotion.matches) {
    pieces.forEach((piece) => piece.classList.add("is-visible"));
  }

  window.addEventListener("resize", applyLayout);
  applyLayout();
})();
