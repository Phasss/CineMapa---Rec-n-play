(function () {
  "use strict";

  const PIN_COLOR = "#ec1e79";
  const MOBILE_BREAKPOINT = 900;

  const state = {
    searchTerm: "",
    activeId: null,
    mobileTab: "mapa"
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
    }).setView([-8.09, -34.905], 12);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    buildGroups();
    fitToAllGroups();
    renderList();
    setupToolbar();
    setupDetailPanel();
    setupTabSwitcher();
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

  function fitToAllGroups() {
    const points = Array.from(groups.values()).map((g) => [g.lat, g.lng]);
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.invalidateSize();
    map.fitBounds(bounds, { padding: [40, 40] });
    setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [40, 40] });
    }, 150);
  }

  function buildPinIcon(group) {
    const count = group.locs.length;

    const badge =
      count > 1
        ? `<span class="pin-badge">${count}</span>`
        : "";

    const html = `
      <span class="pin" style="--pin-color:${PIN_COLOR}">
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
        <p class="popup-meta">${escapeHtml(loc.placeName)}</p>
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

  function setupTabSwitcher() {
    const switcher = document.getElementById("tabSwitcher");
    if (!switcher) return;

    switcher.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    document.getElementById("sidebarClose").addEventListener("click", () => switchTab("mapa"));
  }

  function switchTab(tab) {
    state.mobileTab = tab;
    document.querySelector(".map-layout").classList.toggle("tab-lista", tab === "lista");
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const active = btn.dataset.tab === tab;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  function getFilteredLocations() {
    return LOCATIONS.filter((loc) => {
      const haystack = `${loc.title} ${loc.placeName} ${loc.address}`.toLowerCase();
      return !state.searchTerm || haystack.includes(state.searchTerm);
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
      list.innerHTML = `<li class="empty-state">Nenhuma locação encontrada.<br>Tente buscar por outro filme ou local.</li>`;
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
    if (isMobile) switchTab("mapa");

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

    document.getElementById("detailIsland").textContent = `Locação · ${loc.year}`;
    document.getElementById("detailTitle").textContent = loc.title;
    document.getElementById("detailMeta").textContent = loc.placeName;

    const synopsisEl = document.getElementById("detailSynopsis");
    synopsisEl.textContent = loc.synopsis || "";
    synopsisEl.hidden = !loc.synopsis;

    setCreditRow("detailDirectorRow", "detailDirector", loc.director);
    setCreditRow("detailScreenwriterRow", "detailScreenwriter", loc.screenwriter);
    setCreditRow("detailReleaseRow", "detailRelease", loc.releaseDate);
    document.getElementById("detailCredits").hidden =
      !loc.releaseDate && !loc.director && !loc.screenwriter;

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

  function setCreditRow(rowId, valueId, value) {
    const row = document.getElementById(rowId);
    document.getElementById(valueId).textContent = value || "";
    row.hidden = !value;
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
