(() => {
  const MOBILE_MAX_WIDTH = 840;
  const AUTOPLAY_INTERVAL_MS = 4200;
  const AUTOPLAY_RESUME_DELAY_MS = 7000;
  const AUTO_SCROLL_WINDOW_MS = 900;
  const query = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

  const setupCoverflow = (mosaic) => {
    const originalCards = Array.from(mosaic.querySelectorAll('.gallery-piece--static'));
    if (originalCards.length < 2) {
      return;
    }

    let cards = [];
    let activeIndex = 0;
    let loopEnabled = false;
    let ticking = false;
    let clickCleanup = [];
    let autoplayTimer = null;
    let autoplayResumeTimer = null;
    let autoScrollUntil = 0;

    const clearClickHandlers = () => {
      clickCleanup.forEach((cleanup) => cleanup());
      clickCleanup = [];
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        window.clearTimeout(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const clearAutoplayResume = () => {
      if (autoplayResumeTimer) {
        window.clearTimeout(autoplayResumeTimer);
        autoplayResumeTimer = null;
      }
    };

    const isAutoplayAllowed = () => query.matches && !document.hidden && cards.length > 1;

    const refreshCards = () => {
      cards = Array.from(mosaic.querySelectorAll('.gallery-piece--static'));
    };

    const clearStates = () => {
      cards.forEach((card) => {
        card.classList.remove('is-active', 'is-left', 'is-right');
      });
    };

    const setCardStates = (index) => {
      cards.forEach((card) => {
        card.classList.toggle('is-active', cards[index] === card);
        card.classList.toggle('is-left', card.offsetLeft < cards[index].offsetLeft);
        card.classList.toggle('is-right', card.offsetLeft > cards[index].offsetLeft);
      });
    };

    const centerCard = (index, behavior = 'smooth', reason = 'manual') => {
      const card = cards[index];
      if (!card) {
        return;
      }

      if (reason === 'auto') {
        autoScrollUntil = Date.now() + AUTO_SCROLL_WINDOW_MS;
      }

      const targetLeft = card.offsetLeft - (mosaic.clientWidth - card.clientWidth) / 2;
      mosaic.scrollTo({
        left: Math.max(0, targetLeft),
        behavior,
      });
    };

    const scheduleAutoplay = () => {
      stopAutoplay();
      if (!isAutoplayAllowed()) {
        return;
      }

      autoplayTimer = window.setTimeout(() => {
        if (!isAutoplayAllowed()) {
          return;
        }

        const nextIndex = loopEnabled
          ? activeIndex + 1
          : (activeIndex + 1) % cards.length;

        activeIndex = Math.max(0, Math.min(nextIndex, cards.length - 1));
        centerCard(activeIndex, 'smooth', 'auto');
        scheduleAutoplay();
      }, AUTOPLAY_INTERVAL_MS);
    };

    const pauseAutoplayTemporarily = () => {
      stopAutoplay();
      clearAutoplayResume();

      if (!query.matches) {
        return;
      }

      autoplayResumeTimer = window.setTimeout(() => {
        scheduleAutoplay();
      }, AUTOPLAY_RESUME_DELAY_MS);
    };

    const updateActiveByDistance = () => {
      const midpoint = mosaic.getBoundingClientRect().left + mosaic.clientWidth / 2;

      let nearest = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(center - midpoint);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearest = index;
        }
      });

      if (loopEnabled && cards.length > 2) {
        if (nearest === 0) {
          activeIndex = cards.length - 2;
          centerCard(activeIndex, 'auto');
        } else if (nearest === cards.length - 1) {
          activeIndex = 1;
          centerCard(activeIndex, 'auto');
        } else {
          activeIndex = nearest;
        }
      } else {
        activeIndex = nearest;
      }

      setCardStates(activeIndex);
    };

    const updateFromScroll = () => {
      ticking = false;
      if (!query.matches) {
        mosaic.classList.remove('gallery-mosaic--coverflow');
        clearStates();
        return;
      }

      mosaic.classList.add('gallery-mosaic--coverflow');
      updateActiveByDistance();
    };

    const scheduleUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateFromScroll);
    };

    const bindCardClicks = () => {
      clearClickHandlers();
      cards.forEach((card, index) => {
        const onClick = () => {
          if (!query.matches) {
            return;
          }

          pauseAutoplayTemporarily();
          activeIndex = index;
          centerCard(activeIndex);
        };

        card.addEventListener('click', onClick);
        clickCleanup.push(() => card.removeEventListener('click', onClick));
      });
    };

    const enableLoopTrack = () => {
      if (loopEnabled) {
        return;
      }

      const firstClone = originalCards[0].cloneNode(true);
      const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

      firstClone.classList.add('gallery-piece--clone');
      lastClone.classList.add('gallery-piece--clone');

      mosaic.appendChild(firstClone);
      mosaic.insertBefore(lastClone, mosaic.firstChild);

      loopEnabled = true;
      refreshCards();
      bindCardClicks();
      activeIndex = 1;
      centerCard(activeIndex, 'auto');
      setCardStates(activeIndex);
      scheduleAutoplay();
    };

    const disableLoopTrack = () => {
      stopAutoplay();
      clearAutoplayResume();

      if (!loopEnabled) {
        return;
      }

      mosaic.querySelectorAll('.gallery-piece--clone').forEach((clone) => clone.remove());
      loopEnabled = false;
      refreshCards();
      bindCardClicks();
      activeIndex = 0;
    };

    const handleMediaChange = () => {
      if (!query.matches) {
        disableLoopTrack();
        mosaic.classList.remove('gallery-mosaic--coverflow');
        clearStates();
        return;
      }

      enableLoopTrack();
      mosaic.classList.add('gallery-mosaic--coverflow');
      centerCard(activeIndex, 'auto');
      scheduleUpdate();
      scheduleAutoplay();
    };

    refreshCards();
    bindCardClicks();

    mosaic.addEventListener('scroll', () => {
      scheduleUpdate();
      if (Date.now() > autoScrollUntil) {
        pauseAutoplayTemporarily();
      }
    }, { passive: true });

    mosaic.addEventListener('pointerdown', pauseAutoplayTemporarily, { passive: true });
    mosaic.addEventListener('touchstart', pauseAutoplayTemporarily, { passive: true });

    window.addEventListener('resize', () => {
      scheduleUpdate();
      scheduleAutoplay();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
        clearAutoplayResume();
      } else {
        pauseAutoplayTemporarily();
      }
    });

    if (query.addEventListener) {
      query.addEventListener('change', handleMediaChange);
    } else {
      query.addListener(handleMediaChange);
    }

    if (query.matches) {
      enableLoopTrack();
      mosaic.classList.add('gallery-mosaic--coverflow');
      centerCard(activeIndex, 'auto');
      scheduleAutoplay();
    } else {
      disableLoopTrack();
    }

    scheduleUpdate();
  };

  document.querySelectorAll('.gallery-mosaic--static').forEach(setupCoverflow);
})();
