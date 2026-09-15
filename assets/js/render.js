/**
 * render.js — Các hàm dựng giao diện dùng chung (thanh điều hướng, huy hiệu đội,
 * thẻ trận đấu...). Mỗi trang gọi những hàm này để không lặp lại code HTML.
 */

const Render = {
  init(activePage) {
    this.renderNav(activePage);
    this.renderEsportSwitch();
  },

  renderNav(active) {
    const el = document.getElementById("site-nav");
    if (!el) return;
    const data = Store.getData();
    const links = [
      { href: "index.html", label: "Trang chủ", key: "home" },
      { href: "lich-thi-dau.html", label: "Lịch & Kết quả", key: "schedule" },
      { href: "du-doan.html", label: "Dự đoán", key: "predict" },
      { href: "quan-tri.html", label: "Quản trị", key: "admin" },
    ];
    el.innerHTML = `
      <div class="nav-brand">
        <span class="nav-brand-icon">${data.esport.icon}</span>
        <span class="nav-brand-text">${data.season.name}</span>
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Mở menu">☰</button>
      <div class="nav-links" id="nav-links">
        ${links
          .map(
            (l) =>
              `<a href="${l.href}" class="nav-link${l.key === active ? " is-active" : ""}">${l.label}</a>`
          )
          .join("")}
      </div>
    `;
    const toggle = document.getElementById("nav-toggle");
    const linkWrap = document.getElementById("nav-links");
    if (toggle && linkWrap) {
      toggle.addEventListener("click", () => linkWrap.classList.toggle("is-open"));
    }
  },

  renderEsportSwitch() {
    const el = document.getElementById("esport-switch");
    if (!el) return;
    const data = Store.getData();
    el.innerHTML = data.supportedEsports
      .map(
        (e) => `
        <button class="esport-pill${e.active ? " is-active" : " is-disabled"}" ${
          e.active ? "" : 'disabled title="Sắp ra mắt"'
        }>
          <span>${e.icon}</span> ${e.name}
        </button>`
      )
      .join("");
  },

  teamBadge(teamId, size = "md") {
    const t = Store.getTeam(teamId);
    if (!t) {
      return `<div class="team-badge team-badge--${size} team-badge--tbd"><span>?</span></div>`;
    }
    if (/^(https?:|assets\/)/.test(t.logo || "")) {
      return `<div class="team-badge team-badge--${size}"><img src="${t.logo}" alt="${t.name}"></div>`;
    }
    return `<div class="team-badge team-badge--${size}" style="--badge-color:${t.color || "#3E8EF7"}"><span>${
      t.logo || t.short || "?"
    }</span></div>`;
  },

  teamName(teamId) {
    const t = Store.getTeam(teamId);
    return t ? t.name : "Chưa xác định";
  },

  /** Thẻ trận đấu dạng banner chéo giống ảnh tham khảo. */
  matchCard(m, { showWeek = false } = {}) {
    const t1 = Store.getTeam(m.team1);
    const t2 = Store.getTeam(m.team2);
    const finished = m.status === "finished";
    const live = m.status === "live";
    const s1 = m.score1 ?? "-";
    const s2 = m.score2 ?? "-";
    const t1Win = finished && m.score1 > m.score2;
    const t2Win = finished && m.score2 > m.score1;
    const statusLabel = live ? "ĐANG DIỄN RA" : finished ? "KẾT THÚC" : this.formatDate(m.date);

    return `
      <div class="match-card ${live ? "match-card--live" : ""}">
        <div class="match-card__status">${statusLabel}${showWeek ? ` · Tuần ${m.week}` : ""}</div>
        <div class="match-card__row">
          <div class="match-card__side ${t1Win ? "is-winner" : ""}">
            ${this.teamBadge(m.team1)}
            <span class="match-card__name">${t1 ? t1.short : "TBD"}</span>
          </div>
          <div class="match-card__score">
            <span class="${t1Win ? "is-winner" : ""}">${s1}</span>
            <span class="match-card__vs">:</span>
            <span class="${t2Win ? "is-winner" : ""}">${s2}</span>
          </div>
          <div class="match-card__side match-card__side--right ${t2Win ? "is-winner" : ""}">
            <span class="match-card__name">${t2 ? t2.short : "TBD"}</span>
            ${this.teamBadge(m.team2)}
          </div>
        </div>
      </div>
    `;
  },

  formatDate(iso) {
    if (!iso) return "Chưa xếp lịch";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  },
};
