(() => {
  const protectedAreas = document.querySelectorAll(
    ".gallery-mosaic, .photo-grid, .gallery-choice-grid"
  );

  protectedAreas.forEach((area) => {
    area.addEventListener("contextmenu", (event) => {
      if (event.target.closest("img, video, .gallery-piece, .photo-card, .gallery-choice-card")) {
        event.preventDefault();
      }
    });

    area.addEventListener("dragstart", (event) => {
      if (event.target.closest("img, video, .gallery-piece, .photo-card, .gallery-choice-card")) {
        event.preventDefault();
      }
    });
  });

  document.querySelectorAll(".gallery-media, .photo-card img, .gallery-choice-card").forEach((element) => {
    element.setAttribute("draggable", "false");
  });
})();
