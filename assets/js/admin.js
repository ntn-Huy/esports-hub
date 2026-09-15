/**
 * admin.js — Trang quản trị.
 * Mọi thay đổi ở đây được ghi ngay vào localStorage qua Store.save().
 * Đây KHÔNG phải là hệ thống đăng nhập bảo mật thật sự — mật khẩu chỉ để
 * tránh người xem thường vô tình bấm nhầm vào khu vực chỉnh sửa. Vì trang
 * là tĩnh (static), bất kỳ ai xem mã nguồn cũng có thể thấy mật khẩu, nên
 * đừng dùng để bảo vệ dữ liệu thật sự nhạy cảm.
 */

const ADMIN_PASSWORD = "bqt2026"; // Đổi mật khẩu này tùy ý trước khi công khai repo

const Admin = {
  uid(prefix) {
    return prefix + Math.random().toString(36).slice(2, 8);
  },

  init() {
    const gate = document.getElementById("admin-gate");
    const panel = document.getElementById("admin-panel");
    const savedAuth = sessionStorage.getItem("admin_auth") === "1";
    if (savedAuth) {
      gate.style.display = "none";
      panel.style.display = "block";
      this.renderAll();
      return;
    }
    document.getElementById("admin-login-btn").addEventListener("click", () => {
      const val = document.getElementById("admin-password").value;
      if (val === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin_auth", "1");
        gate.style.display = "none";
        panel.style.display = "block";
        this.renderAll();
      } else {
        document.getElementById("admin-login-error").textContent = "Sai mật khẩu.";
      }
    });
  },

  renderAll() {
    this.renderSeasonForm();
    this.renderTeams();
    this.renderMatches();
    this.renderBracket();
  },

  // ---------------- Season / format ----------------
  renderSeasonForm() {
    const data = Store.getData();
    const root = document.getElementById("season-form");
    root.innerHTML = `
      <div class="field-row">
        <div><label>Tên mùa giải</label><input id="f-season-name" value="${data.season.name}"></div>
        <div><label>Phụ đề (vd: Vòng bảng - Lượt đi)</label><input id="f-season-sub" value="${data.season.subtitle}"></div>
      </div>
      <div class="field-row">
        <div><label>Số tuần vòng bảng</label><input id="f-weeks" type="number" min="1" value="${data.season.format.totalWeeks}"></div>
        <div><label>Bo mấy ván (vòng bảng)</label>
          <select id="f-bo">
            <option value="1" ${data.season.format.bestOf === 1 ? "selected" : ""}>Bo1</option>
            <option value="3" ${data.season.format.bestOf === 3 ? "selected" : ""}>Bo3</option>
            <option value="5" ${data.season.format.bestOf === 5 ? "selected" : ""}>Bo5</option>
          </select>
        </div>
        <div><label>Bật vòng Playoff?</label>
          <select id="f-playoff-enabled">
            <option value="1" ${data.season.format.playoffEnabled ? "selected" : ""}>Có</option>
            <option value="0" ${!data.season.format.playoffEnabled ? "selected" : ""}>Chưa</option>
          </select>
        </div>
        <div><label>Thể thức Playoff</label>
          <select id="f-playoff-type">
            <option value="double-elim" ${data.season.format.playoffType === "double-elim" ? "selected" : ""}>Nhánh thắng/thua (Double-elim)</option>
            <option value="single-elim" ${data.season.format.playoffType === "single-elim" ? "selected" : ""}>Loại trực tiếp (Single-elim)</option>
          </select>
        </div>
      </div>
      <button class="btn btn--primary btn--sm" id="save-season-btn">Lưu thể thức</button>
      <p class="hint">Đổi số tuần sẽ không tự xóa/thêm trận — hãy vào tab "Trận đấu" để thêm trận cho tuần mới.</p>
    `;
    document.getElementById("save-season-btn").addEventListener("click", () => {
      const d = Store.getData();
      d.season.name = document.getElementById("f-season-name").value.trim() || d.season.name;
      d.season.subtitle = document.getElementById("f-season-sub").value.trim();
      d.season.format.totalWeeks = Number(document.getElementById("f-weeks").value) || 1;
      d.season.format.bestOf = Number(document.getElementById("f-bo").value);
      d.season.format.playoffEnabled = document.getElementById("f-playoff-enabled").value === "1";
      d.season.format.playoffType = document.getElementById("f-playoff-type").value;
      Store.save(d);
      this.toast("Đã lưu thể thức mùa giải.");
    });
  },

  // ---------------- Teams ----------------
  renderTeams() {
    const data = Store.getData();
    const listEl = document.getElementById("teams-list");
    listEl.innerHTML = `
      <table class="table-simple">
        <thead><tr><th>Huy hiệu</th><th>Tên đầy đủ</th><th>Viết tắt</th><th>Mã màu</th><th></th></tr></thead>
        <tbody>
          ${data.teams
            .map(
              (t) => `
            <tr>
              <td>${Render.teamBadge(t.id, "sm")}</td>
              <td>${t.name}</td>
              <td>${t.short}</td>
              <td><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${t.color};vertical-align:middle;margin-right:6px"></span>${t.color}</td>
              <td>
                <button class="btn btn--ghost btn--sm" data-edit-team="${t.id}">Sửa</button>
                <button class="btn btn--danger btn--sm" data-del-team="${t.id}">Xóa</button>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
    listEl.querySelectorAll("[data-edit-team]").forEach((btn) =>
      btn.addEventListener("click", () => this.fillTeamForm(btn.dataset.editTeam))
    );
    listEl.querySelectorAll("[data-del-team]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (!confirm("Xóa đội này? Các trận đấu liên quan sẽ hiện 'TBD'.")) return;
        const d = Store.getData();
        d.teams = d.teams.filter((t) => t.id !== btn.dataset.delTeam);
        Store.save(d);
        this.renderTeams();
        this.renderMatches();
      })
    );
  },

  fillTeamForm(teamId) {
    const t = Store.getTeam(teamId);
    document.getElementById("t-id").value = t ? t.id : "";
    document.getElementById("t-name").value = t ? t.name : "";
    document.getElementById("t-short").value = t ? t.short : "";
    document.getElementById("t-logo").value = t ? t.logo : "";
    document.getElementById("t-color").value = t ? t.color : "#3E8EF7";
    document.getElementById("team-form-title").textContent = t ? "Sửa đội: " + t.name : "Thêm đội mới";
  },

  bindTeamForm() {
    document.getElementById("team-form-clear").addEventListener("click", () => this.fillTeamForm(null));
    document.getElementById("team-form-save").addEventListener("click", () => {
      const id = document.getElementById("t-id").value || this.uid("t");
      const name = document.getElementById("t-name").value.trim();
      const short = document.getElementById("t-short").value.trim().toUpperCase();
      const logo = document.getElementById("t-logo").value.trim() || short.slice(0, 2);
      const color = document.getElementById("t-color").value || "#3E8EF7";
      if (!name || !short) { this.toast("Cần nhập tên và viết tắt.", true); return; }
      const d = Store.getData();
      const existing = d.teams.find((t) => t.id === id);
      if (existing) {
        Object.assign(existing, { name, short, logo, color });
      } else {
        d.teams.push({ id, name, short, logo, color });
      }
      Store.save(d);
      this.fillTeamForm(null);
      this.renderTeams();
      this.renderMatches();
      this.toast("Đã lưu đội tuyển.");
    });
  },

  // ---------------- Matches ----------------
  renderMatches() {
    const data = Store.getData();
    const listEl = document.getElementById("matches-list");
    const teamOptions = (sel) =>
      `<option value="">— chọn đội —</option>` +
      data.teams.map((t) => `<option value="${t.id}" ${t.id === sel ? "selected" : ""}>${t.short}</option>`).join("");

    listEl.innerHTML = `
      <table class="table-simple">
        <thead><tr><th>Tuần</th><th>Ngày</th><th>Đội 1</th><th>Tỉ số</th><th>Đội 2</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          ${data.matches
            .map(
              (m) => `
            <tr data-row-match="${m.id}">
              <td>${m.week}</td>
              <td>${m.date || ""}</td>
              <td>${m.team1 ? Store.getTeam(m.team1)?.short || "?" : "TBD"}</td>
              <td>${m.score1 ?? "-"} : ${m.score2 ?? "-"}</td>
              <td>${m.team2 ? Store.getTeam(m.team2)?.short || "?" : "TBD"}</td>
              <td>${m.status}</td>
              <td>
                <button class="btn btn--ghost btn--sm" data-edit-match="${m.id}">Sửa</button>
                <button class="btn btn--danger btn--sm" data-del-match="${m.id}">Xóa</button>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
    listEl.querySelectorAll("[data-edit-match]").forEach((btn) =>
      btn.addEventListener("click", () => this.fillMatchForm(btn.dataset.editMatch))
    );
    listEl.querySelectorAll("[data-del-match]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (!confirm("Xóa trận đấu này?")) return;
        const d = Store.getData();
        d.matches = d.matches.filter((m) => m.id !== btn.dataset.delMatch);
        Store.save(d);
        this.renderMatches();
      })
    );
    // refresh team dropdowns in the form each time teams change
    document.getElementById("m-team1").innerHTML = teamOptions(document.getElementById("m-team1").value);
    document.getElementById("m-team2").innerHTML = teamOptions(document.getElementById("m-team2").value);
  },

  fillMatchForm(matchId) {
    const data = Store.getData();
    const m = data.matches.find((x) => x.id === matchId);
    document.getElementById("m-id").value = m ? m.id : "";
    document.getElementById("m-week").value = m ? m.week : 1;
    document.getElementById("m-date").value = m ? m.date : "";
    document.getElementById("m-stage").value = m ? m.stage : "group";
    document.getElementById("m-team1").value = m ? m.team1 : "";
    document.getElementById("m-team2").value = m ? m.team2 : "";
    document.getElementById("m-score1").value = m && m.score1 !== null ? m.score1 : "";
    document.getElementById("m-score2").value = m && m.score2 !== null ? m.score2 : "";
    document.getElementById("m-status").value = m ? m.status : "upcoming";
    document.getElementById("match-form-title").textContent = m ? "Sửa trận đấu" : "Thêm trận mới";
  },

  bindMatchForm() {
    document.getElementById("match-form-clear").addEventListener("click", () => this.fillMatchForm(null));
    document.getElementById("match-form-save").addEventListener("click", () => {
      const id = document.getElementById("m-id").value || this.uid("m");
      const week = Number(document.getElementById("m-week").value) || 1;
      const date = document.getElementById("m-date").value;
      const stage = document.getElementById("m-stage").value;
      const team1 = document.getElementById("m-team1").value || null;
      const team2 = document.getElementById("m-team2").value || null;
      const s1raw = document.getElementById("m-score1").value;
      const s2raw = document.getElementById("m-score2").value;
      const score1 = s1raw === "" ? null : Number(s1raw);
      const score2 = s2raw === "" ? null : Number(s2raw);
      const status = document.getElementById("m-status").value;
      const d = Store.getData();
      const existing = d.matches.find((m) => m.id === id);
      const payload = { id, week, date, stage, team1, team2, score1, score2, status };
      if (existing) Object.assign(existing, payload);
      else d.matches.push(payload);
      Store.save(d);
      this.fillMatchForm(null);
      this.renderMatches();
      this.toast("Đã lưu trận đấu.");
    });
  },

  // ---------------- Bracket ----------------
  renderBracket() {
    const data = Store.getData();
    const root = document.getElementById("bracket-editor");
    if (!data.season.format.playoffEnabled) {
      root.innerHTML = `<p class="hint">Vòng Playoff đang tắt — bật ở tab "Mùa giải" để chỉnh nhánh đấu.</p>`;
      return;
    }
    const teamSelect = (val, key, groupKey, idx) =>
      `<select data-bracket="${groupKey}" data-idx="${idx}" data-field="${key}">
        <option value="">— TBD —</option>
        ${data.teams.map((t) => `<option value="${t.id}" ${t.id === val ? "selected" : ""}>${t.short}</option>`).join("")}
      </select>`;
    const scoreInput = (val, key, groupKey, idx) =>
      `<input type="number" min="0" style="width:64px" value="${val ?? ""}" data-bracket="${groupKey}" data-idx="${idx}" data-field="${key}">`;

    const row = (bm, groupKey, idx) => `
      <div class="panel" style="margin-bottom:10px">
        <div class="field-row">
          <div><label>Đội 1</label>${teamSelect(bm.team1, "team1", groupKey, idx)}</div>
          <div><label>Tỉ số 1</label>${scoreInput(bm.score1, "score1", groupKey, idx)}</div>
          <div><label>Đội 2</label>${teamSelect(bm.team2, "team2", groupKey, idx)}</div>
          <div><label>Tỉ số 2</label>${scoreInput(bm.score2, "score2", groupKey, idx)}</div>
        </div>
      </div>`;

    root.innerHTML = `
      <h4 style="margin-bottom:8px">Nhánh thắng</h4>
      ${data.bracket.upper.map((bm, i) => row(bm, "upper", i)).join("")}
      <h4 style="margin:16px 0 8px">Nhánh thua</h4>
      ${data.bracket.lower.map((bm, i) => row(bm, "lower", i)).join("")}
      <h4 style="margin:16px 0 8px">Chung kết tổng</h4>
      ${row(data.bracket.grandFinal, "grandFinal", -1)}
      <button class="btn btn--primary btn--sm" id="save-bracket-btn" style="margin-top:12px">Lưu nhánh đấu</button>
    `;
    document.getElementById("save-bracket-btn").addEventListener("click", () => {
      const d = Store.getData();
      root.querySelectorAll("[data-bracket]").forEach((el) => {
        const group = el.dataset.bracket;
        const idx = Number(el.dataset.idx);
        const field = el.dataset.field;
        const val = el.tagName === "SELECT" ? (el.value || null) : el.value === "" ? null : Number(el.value);
        const target = group === "grandFinal" ? d.bracket.grandFinal : d.bracket[group][idx];
        target[field] = val;
        if (target.score1 !== null && target.score2 !== null) target.status = "finished";
      });
      Store.save(d);
      this.toast("Đã lưu nhánh playoff.");
    });
  },

  // ---------------- Import / export ----------------
  bindDataTools() {
    document.getElementById("export-js-btn").addEventListener("click", () => Store.downloadExport());
    document.getElementById("export-json-btn").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(Store.getData(), null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "backup.json"; document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
    document.getElementById("import-json-input").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          Store.save(parsed);
          this.renderAll();
          this.toast("Đã nhập dữ liệu thành công.");
        } catch (err) {
          this.toast("File JSON không hợp lệ.", true);
        }
      };
      reader.readAsText(file);
    });
    document.getElementById("reset-data-btn").addEventListener("click", () => {
      if (!confirm("Xóa toàn bộ chỉnh sửa và quay về dữ liệu mặc định trong data.js?")) return;
      Store.resetToDefault();
      this.renderAll();
      this.toast("Đã khôi phục dữ liệu mặc định.");
    });
  },

  toast(msg, isError = false) {
    const el = document.getElementById("admin-toast");
    el.textContent = msg;
    el.style.color = isError ? "var(--loss)" : "var(--win)";
    el.style.opacity = "1";
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => (el.style.opacity = "0"), 2400);
  },
};
