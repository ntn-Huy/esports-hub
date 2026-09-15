/**
 * predict.js — Trò chơi dự đoán (pick'em).
 *
 * LƯU Ý QUAN TRỌNG: vì đây là trang web tĩnh (không có máy chủ/database),
 * dự đoán của mỗi người chỉ được lưu trong trình duyệt của chính họ
 * (localStorage) — không có bảng xếp hạng dùng chung giữa nhiều người xem.
 * Đây là điểm có thể nâng cấp sau này bằng cách nối vào một dịch vụ miễn phí
 * như Google Sheet + Apps Script, hoặc Firebase — xem README.md mục "Nâng cấp".
 */

const PREDICT_KEY = "esport_site_predictions_v1";

const Predict = {
  _cache: null,

  getState() {
    if (this._cache) return this._cache;
    let raw = null;
    try { raw = localStorage.getItem(PREDICT_KEY); } catch (e) {}
    if (raw) {
      try { this._cache = JSON.parse(raw); return this._cache; } catch (e) {}
    }
    this._cache = { playerName: "", matchPicks: {}, top4Pick: [], bracketPicks: {} };
    return this._cache;
  },

  save() {
    try { localStorage.setItem(PREDICT_KEY, JSON.stringify(this._cache)); } catch (e) {}
  },

  setPlayerName(name) {
    this.getState().playerName = name;
    this.save();
  },

  pickMatch(matchId, teamId) {
    this.getState().matchPicks[matchId] = teamId;
    this.save();
  },

  pickTop4(order) {
    this.getState().top4Pick = order;
    this.save();
  },

  pickBracket(bracketMatchId, teamId) {
    this.getState().bracketPicks[bracketMatchId] = teamId;
    this.save();
  },

  /** Điểm dự đoán trận đấu: đúng đội thắng = +1 điểm. */
  scoreMatchPicks() {
    const state = this.getState();
    const data = Store.getData();
    let correct = 0, resolved = 0;
    data.matches.forEach((m) => {
      const pick = state.matchPicks[m.id];
      if (!pick || m.status !== "finished" || m.score1 === null) return;
      resolved++;
      const winner = m.score1 > m.score2 ? m.team1 : m.team2;
      if (pick === winner) correct++;
    });
    return { correct, resolved, points: correct * 1 };
  },

  render(tabsRootId, contentRootId) {
    const state = this.getState();
    const data = Store.getData();

    // ---- Name gate ----
    const nameBar = document.getElementById("predict-name-bar");
    if (nameBar) {
      nameBar.innerHTML = state.playerName
        ? `Đang dự đoán với tên: <b>${state.playerName}</b> · <button class="btn btn--ghost btn--sm" id="change-name-btn">Đổi tên</button>`
        : `<input id="name-input" placeholder="Nhập tên hiển thị của bạn..." style="max-width:240px;display:inline-block" /> <button class="btn btn--primary btn--sm" id="save-name-btn">Bắt đầu dự đoán</button>`;
      const nameInput = document.getElementById("name-input");
      const saveBtn = document.getElementById("save-name-btn");
      const changeBtn = document.getElementById("change-name-btn");
      if (saveBtn) saveBtn.addEventListener("click", () => {
        const v = (nameInput.value || "Khách").trim();
        Predict.setPlayerName(v || "Khách");
        Predict.render();
      });
      if (changeBtn) changeBtn.addEventListener("click", () => {
        Predict.setPlayerName("");
        Predict.render();
      });
    }

    // ---- Weekly match picks ----
    const weeks = Store.getWeeks();
    const weekTabs = document.getElementById("predict-week-tabs");
    const weekList = document.getElementById("predict-week-list");
    function renderMatchPicks(w) {
      weekTabs.querySelectorAll(".week-tab").forEach((b) => b.classList.toggle("is-active", Number(b.dataset.week) === w));
      const matches = Store.getMatches({ week: w, stage: "group" });
      weekList.innerHTML = matches.length
        ? matches.map((m) => Predict.matchPickCardHTML(m)).join("")
        : `<div class="empty-state"><b>Chưa có trận</b>Không có trận nào trong tuần này.</div>`;
      weekList.querySelectorAll("[data-pick-match]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const mId = btn.dataset.pickMatch;
          const match = data.matches.find((x) => x.id === mId);
          if (match.status === "finished") return;
          Predict.pickMatch(mId, btn.dataset.team);
          renderMatchPicks(w);
        });
      });
    }
    if (weeks.length) {
      weekTabs.innerHTML = weeks.map((w) => `<button class="week-tab" data-week="${w}">Tuần ${w}</button>`).join("");
      weekTabs.querySelectorAll(".week-tab").forEach((btn) =>
        btn.addEventListener("click", () => renderMatchPicks(Number(btn.dataset.week)))
      );
      renderMatchPicks(weeks[0]);
    }

    // ---- Score summary ----
    const scoreEl = document.getElementById("predict-score");
    if (scoreEl) {
      const s = Predict.scoreMatchPicks();
      scoreEl.innerHTML = `
        <div class="score-banner__stat"><b>${s.points}</b><span>Điểm dự đoán</span></div>
        <div class="score-banner__stat"><b>${s.correct}/${s.resolved}</b><span>Trận đoán đúng</span></div>
        <div class="score-banner__stat"><b>${Object.keys(state.matchPicks).length}</b><span>Trận đã chọn</span></div>
      `;
    }

    // ---- Top 4 prediction ----
    const top4El = document.getElementById("top4-picker");
    if (top4El) {
      const picks = state.top4Pick.length === 4 ? state.top4Pick : ["", "", "", ""];
      top4El.innerHTML = picks
        .map(
          (val, i) => `
        <div class="field-row" style="margin-bottom:8px">
          <div>
            <label>Hạng ${i + 1}</label>
            <select data-rank="${i}">
              <option value="">— Chọn đội —</option>
              ${data.teams.map((t) => `<option value="${t.id}" ${t.id === val ? "selected" : ""}>${t.name}</option>`).join("")}
            </select>
          </div>
        </div>`
        )
        .join("");
      top4El.querySelectorAll("select").forEach((sel) => {
        sel.addEventListener("change", () => {
          const order = Array.from(top4El.querySelectorAll("select")).map((s) => s.value);
          Predict.pickTop4(order);
        });
      });
    }

    // ---- Bracket prediction ----
    const bracketEl = document.getElementById("predict-bracket");
    if (bracketEl && data.season.format.playoffEnabled) {
      const b = data.bracket;
      const renderSlot = (bm, side) => {
        const teamId = side === 1 ? bm.team1 : bm.team2;
        const picked = state.bracketPicks[bm.id] === teamId && teamId;
        const disabled = !teamId ? "disabled" : "";
        return `
          <div class="bracket-slot ${picked ? "is-picked" : ""}" data-bracket-match="${bm.id}" data-team="${teamId || ""}" ${disabled}>
            <span class="name">${Render.teamBadge(teamId, "sm")} ${teamId ? Store.getTeam(teamId)?.short : "TBD"}</span>
          </div>`;
      };
      const col = (label, list) => `
        <div class="bracket-col">
          <div class="bracket-col__label">${label}</div>
          ${list.map((bm) => `<div class="bracket-match">${renderSlot(bm, 1)}${renderSlot(bm, 2)}</div>`).join("")}
        </div>`;
      bracketEl.innerHTML = `
        <div class="bracket">
          ${col("Nhánh thắng", b.upper)}
          ${col("Nhánh thua", b.lower)}
          ${col("Chung kết tổng", [b.grandFinal])}
        </div>`;
      bracketEl.querySelectorAll("[data-bracket-match]").forEach((slot) => {
        slot.addEventListener("click", () => {
          if (slot.hasAttribute("disabled")) return;
          Predict.pickBracket(slot.dataset.bracketMatch, slot.dataset.team);
          Predict.render();
        });
      });
    } else if (bracketEl) {
      bracketEl.innerHTML = `<div class="empty-state"><b>Chưa có playoff</b>Ban quản trị chưa bật vòng playoff cho mùa giải này.</div>`;
    }
  },

  matchPickCardHTML(m) {
    const state = this.getState();
    const t1 = Store.getTeam(m.team1);
    const t2 = Store.getTeam(m.team2);
    const pick = state.matchPicks[m.id];
    const locked = m.status !== "upcoming";
    let resultTag = "";
    if (m.status === "finished" && pick) {
      const winner = m.score1 > m.score2 ? m.team1 : m.team2;
      resultTag = pick === winner
        ? `<span class="predict-result-tag correct">Đoán đúng</span>`
        : `<span class="predict-result-tag wrong">Đoán sai</span>`;
    }
    return `
      <div class="predict-card">
        <div class="predict-teams">
          <div class="predict-team">${Render.teamBadge(m.team1, "sm")} ${t1 ? t1.short : "TBD"}</div>
          <span style="color:var(--text-dim)">vs</span>
          <div class="predict-team">${Render.teamBadge(m.team2, "sm")} ${t2 ? t2.short : "TBD"}</div>
        </div>
        <div class="predict-choice">
          <button class="pick-btn ${pick === m.team1 ? "is-selected" : ""}" data-pick-match="${m.id}" data-team="${m.team1}" ${locked ? "disabled" : ""}>${t1 ? t1.short : "TBD"}</button>
          <button class="pick-btn ${pick === m.team2 ? "is-selected" : ""}" data-pick-match="${m.id}" data-team="${m.team2}" ${locked ? "disabled" : ""}>${t2 ? t2.short : "TBD"}</button>
        </div>
        ${resultTag}
      </div>`;
  },
};
