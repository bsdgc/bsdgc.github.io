(() => {
  const root = document.getElementById("publications-root");
  const data = window.publicationsData;

  if (!root || !Array.isArray(data)) {
    return;
  }

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const highlightAuthor = (text) =>
    escapeHtml(text)
      .replace(/Run-Wen Yao/g, '<span class="author-highlight">Run-Wen Yao</span>')
      .replace(/Runwen Yao/g, '<span class="author-highlight">Runwen Yao</span>')
      .replace(/Run Wen Yao/g, '<span class="author-highlight">Run Wen Yao</span>')
      .replace(/Yao RW/g, '<span class="author-highlight">Yao RW</span>');

  const normalizeAuthors = (authors) => {
    if (Array.isArray(authors)) {
      return authors.join(", ");
    }
    return String(authors ?? "");
  };

  const linkPriority = ["Article", "Nature", "Science", "PNAS", "PMC", "DOI", "PubMed", "Scholar"];

  const getCardUrl = (item) => {
    const hasLinks = Array.isArray(item.links) && item.links.length > 0;
    if (hasLinks) {
      const doiLink = item.links.find((link) => String(link.label || "").toLowerCase() === "doi");
      if (doiLink?.url) {
        return doiLink.url;
      }

      const rankedLinks = [...item.links].sort((left, right) => {
        const leftRank = linkPriority.indexOf(left.label);
        const rightRank = linkPriority.indexOf(right.label);
        return (leftRank === -1 ? linkPriority.length : leftRank) - (rightRank === -1 ? linkPriority.length : rightRank);
      });

      if (rankedLinks[0]?.url) {
        return rankedLinks[0].url;
      }
    }

    return item.sourceUrl || "";
  };

  const renderMeta = (item) => {
    const journal = item.journal ? `<em class="publication-journal">${escapeHtml(item.journal)}</em>` : "";
    const year = item.year ? `<span class="publication-year">${escapeHtml(item.year)}</span>` : "";

    if (!journal && !year) {
      return "";
    }

    return `<span class="publication-meta">${journal}${journal && year ? '<span class="publication-divider">&middot;</span>' : ""}${year}</span>`;
  };

  const renderVisual = (item) => {
    if (item.image) {
      return `
        <div class="publication-visual">
          <img class="publication-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt || item.title)}">
        </div>
      `;
    }

    return `
      <div class="publication-visual publication-visual--placeholder" aria-hidden="true"></div>
    `;
  };

  const renderExtraText = (item) => {
    const text = item.note || item.summary || item.description || "";
    if (!text) {
      return "";
    }
    return `<span class="publication-note">${escapeHtml(text)}</span>`;
  };

  const renderCard = (item) => {
    const url = getCardUrl(item);
    const tagName = url ? "a" : "article";
    const href = url ? ` href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"` : "";

    return `
      <${tagName} class="publication-card publication-card-link soft-card soft-card--solid"${href}>
        <div class="publication-copy">
          <span class="publication-title">${escapeHtml(item.title)}</span>
          ${renderMeta(item)}
          <span class="publication-authors">${highlightAuthor(normalizeAuthors(item.authors))}</span>
          ${renderExtraText(item)}
        </div>
        ${renderVisual(item)}
      </${tagName}>
    `;
  };

  const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a);

  root.innerHTML = years
    .map((year) => {
      const items = data.filter((item) => item.year === year);
      return `
        <section class="pub-year-block">
          <div class="pub-year">${year}</div>
          <div class="pub-year-list">
            ${items.map((item) => renderCard(item)).join("")}
          </div>
        </section>
      `;
    })
    .join("");
})();
