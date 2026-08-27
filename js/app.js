(function () {
  "use strict";

  const ISLAND_COLORS = {
    "recife-antigo": "#d98c4a",
    "santo-antonio": "#4aa3d9"
  };

  const MOBILE_BREAKPOINT = 900;

  const state = {
    islandFilter: "all",
    searchTerm: "",
    activeId: null,
    menuOpen: false
  };

  /** @type {Map<string, {lat:number, lng:number, locs:object[], marker:L.Marker}>} */
  const groups = new Map();
  let map;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    map = L.map("map", {
      scrollWheelZoom: true,
      tap: true,
      zoomControl: false
    }).setView([-8.0631, -34.8745], 15);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    buildGroups();
    renderList();
    setupToolbar();
    setupDetailPanel();
    setupMobileMenu();
  }

  function groupKey(loc) {
    return `${loc.lat.toFixed(5)},${loc.lng.toFixed(5)}`;
  }

  function buildGroups() {
    LOCATIONS.forEach((loc) => {
      const key = groupKey(loc);
      if (!groups.has(key)) {
        groups.set(key, { lat: loc.lat, lng: loc.lng, locs: [], marker: null });
      }
      groups.get(key).locs.push(loc);
    });

    groups.forEach((group) => {
      const marker = L.marker([group.lat, group.lng], {
        icon: buildPinIcon(group)
      }).addTo(map);

      marker.bindPopup(buildPopupHtml(group), { closeButton: true, maxWidth: 260 });
      marker.on("popupopen", (e) => {
        const root = e.popup.getElement();
        root.querySelectorAll("[data-open-detail]").forEach((el) => {
          el.addEventListener("click", () => openDetail(el.dataset.openDetail));
        });
      });
      marker.on("click", () => {
        if (group.locs.length === 1) setActiveCard(group.locs[0].id);
      });

      group.marker = marker;
    });
  }

  function buildPinIcon(group) {
    const island = group.locs[0].island;
    const color = ISLAND_COLORS[island] || "#c9a24b";
    const count = group.locs.length;
    const mixed = group.locs.some((l) => l.island !== island);
    const fill = mixed ? "#c9a24b" : color;

    const badge =
      count > 1
        ? `<span class="pin-badge">${count}</span>`
        : "";

    const html = `
      <span class="pin" style="--pin-color:${fill}">
        <svg viewBox="0 0 32 40" width="34" height="42">
          <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 24 16 24s16-13 16-24C32 7.2 24.8 0 16 0z" fill="var(--pin-color)"/>
          <circle cx="16" cy="16" r="7" fill="#12181a"/>
        </svg>
        ${badge}
      </span>
    `;

    return L.divIcon({
      className: "pin-icon",
      html,
      iconSize: [34, 42],
      iconAnchor: [17, 40],
      popupAnchor: [0, -36]
    });
  }

  function buildPopupHtml(group) {
    if (group.locs.length === 1) {
      const loc = group.locs[0];
      return `
        <p class="popup-title">${escapeHtml(loc.title)} (${loc.year})</p>
        <p class="popup-meta">${escapeHtml(loc.placeName)} &middot; ${escapeHtml(loc.islandLabel)}</p>
        <span class="popup-link" data-open-detail="${loc.id}">Ver detalhes e trecho &rarr;</span>
      `;
    }

    const items = group.locs
      .map(
        (loc) => `
        <li>
          <span class="popup-link" data-open-detail="${loc.id}">${escapeHtml(loc.title)} (${loc.year})</span>
        </li>`
      )
      .join("");

    return `
      <p class="popup-title">${group.locs.length} filmes neste local</p>
      <p class="popup-meta">${escapeHtml(group.locs[0].placeName)}</p>
      <ul class="popup-list">${items}</ul>
    `;
  }

  function setupToolbar() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.islandFilter = btn.dataset.island;
        renderList();
      });
    });

    document.getElementById("search").addEventListener("input", (e) => {
      state.searchTerm = e.target.value.trim().toLowerCase();
      renderList();
    });
  }

  function setupDetailPanel() {
    document.getElementById("detailClose").addEventListener("click", closeDetail);
    document.getElementById("detailOverlay").addEventListener("click", (e) => {
      if (e.target.id === "detailOverlay") closeDetail();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDetail();
    });
  }

  function setupMobileMenu() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const closeBtn = document.getElementById("sidebarClose");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (!hamburgerBtn) return;

    hamburgerBtn.addEventListener("click", openMobileMenu);
    closeBtn.addEventListener("click", closeMobileMenu);
    backdrop.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) closeMobileMenu();
    });
  }

  function openMobileMenu() {
    state.menuOpen = true;
    document.querySelector(".map-layout").classList.add("show-list-mobile");
    document.getElementById("hamburgerBtn").setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    state.menuOpen = false;
    document.querySelector(".map-layout").classList.remove("show-list-mobile");
    document.getElementById("hamburgerBtn").setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function getFilteredLocations() {
    return LOCATIONS.filter((loc) => {
      const matchesIsland = state.islandFilter === "all" || loc.island === state.islandFilter;
      const haystack = `${loc.title} ${loc.placeName} ${loc.address}`.toLowerCase();
      const matchesSearch = !state.searchTerm || haystack.includes(state.searchTerm);
      return matchesIsland && matchesSearch;
    });
  }

  function renderList() {
    const list = document.getElementById("locationList");
    const filtered = getFilteredLocations();
    const filteredIds = new Set(filtered.map((l) => l.id));

    document.getElementById("resultCount").textContent =
      filtered.length === 1 ? "1 locação" : `${filtered.length} locações`;

    groups.forEach((group) => {
      const visible = group.locs.some((l) => filteredIds.has(l.id));
      const el = group.marker.getElement();
      if (el) el.classList.toggle("pin-icon--dim", !visible);
    });

    if (filtered.length === 0) {
      list.innerHTML = `<li class="empty-state">Nenhuma locação encontrada com esses filtros.<br>Tente limpar a busca ou trocar o filtro de ilha.</li>`;
      return;
    }

    list.innerHTML = filtered
      .map(
        (loc) => `
        <li class="location-card${loc.id === state.activeId ? " is-active" : ""}" data-id="${loc.id}" tabindex="0" role="button">
          <div class="location-card-top">
            <h3>${escapeHtml(loc.title)}</h3>
            <span class="location-year">${loc.year}</span>
          </div>
          <p class="location-place">${escapeHtml(loc.placeName)}</p>
          <span class="island-tag island-tag--${loc.island}">
            <span class="dot dot--${loc.island}"></span>${escapeHtml(loc.islandLabel)}
          </span>
        </li>
      `
      )
      .join("");

    list.querySelectorAll(".location-card").forEach((card) => {
      card.addEventListener("click", () => focusLocation(card.dataset.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          focusLocation(card.dataset.id);
        }
      });
    });
  }

  function focusLocation(id) {
    const loc = LOCATIONS.find((l) => l.id === id);
    if (!loc) return;
    setActiveCard(id);

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile && state.menuOpen) closeMobileMenu();

    map.flyTo([loc.lat, loc.lng], 17, { duration: 0.6 });
    setTimeout(() => openDetail(id), isMobile ? 300 : 0);
  }

  function setActiveCard(id) {
    state.activeId = id;
    document.querySelectorAll(".location-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.id === id);
    });
  }

  function openDetail(id) {
    const loc = LOCATIONS.find((l) => l.id === id);
    if (!loc) return;

    setActiveCard(id);

    document.getElementById("detailIsland").textContent = loc.islandLabel;
    document.getElementById("detailIsland").style.color = ISLAND_COLORS[loc.island];
    document.getElementById("detailTitle").textContent = `${loc.title} (${loc.year})`;
    document.getElementById("detailMeta").textContent = loc.placeName;
    document.getElementById("detailAddress").textContent = loc.address;

    const notesEl = document.getElementById("detailNotes");
    notesEl.textContent = loc.notes || "";
    notesEl.hidden = !loc.notes;

    const embedWrap = document.getElementById("detailVideoEmbed");
    const linkBtn = document.getElementById("detailVideoLink");
    const emptyMsg = document.getElementById("detailVideoEmpty");
    const embedUrl = getEmbeddableUrl(loc.videoUrl);

    if (loc.videoUrl) {
      linkBtn.hidden = false;
      linkBtn.href = loc.videoUrl;
      emptyMsg.hidden = true;
      if (embedUrl) {
        embedWrap.innerHTML = `<iframe src="${embedUrl}" title="Trecho de ${escapeHtml(loc.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        embedWrap.hidden = false;
      } else {
        embedWrap.hidden = true;
        embedWrap.innerHTML = "";
      }
    } else {
      linkBtn.hidden = true;
      embedWrap.hidden = true;
      embedWrap.innerHTML = "";
      emptyMsg.hidden = false;
    }

    const directionsBtn = document.getElementById("detailDirections");
    directionsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}&travelmode=walking`;

    document.getElementById("detailOverlay").hidden = false;
    document.body.classList.add("detail-open");
  }

  function closeDetail() {
    document.getElementById("detailOverlay").hidden = true;
    document.body.classList.remove("detail-open");
  }

  function getEmbeddableUrl(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        const start = u.searchParams.get("t") || u.searchParams.get("start");
        if (id) {
          const startParam = start ? `?start=${parseInt(start, 10) || 0}` : "";
          return `https://www.youtube.com/embed/${id}${startParam}`;
        }
      }
      if (u.hostname === "youtu.be") {
        const id = u.pathname.replace("/", "");
        return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }
})();
