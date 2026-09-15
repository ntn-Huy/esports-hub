/**
 * store.js — Lớp truy xuất dữ liệu dùng chung cho mọi trang.
 *
 * Ưu tiên dữ liệu:
 *   1. Bản chỉnh sửa lưu trong localStorage (do trang Quản trị ghi ra)
 *   2. Nếu chưa có gì trong localStorage -> dùng DEFAULT_DATA từ data.js
 *
 * Nhờ vậy trang Quản trị có thể "tự nhập trên web" mà không cần máy chủ:
 * mọi thay đổi được lưu ngay trên trình duyệt của bạn. Khi sẵn sàng chia sẻ
 * cho tất cả người xem, dùng nút "Xuất file data.js" để lấy đoạn code mới
 * rồi dán vào assets/js/data.js và đẩy (push) lên GitHub.
 */

const STORAGE_KEY = "esport_site_data_v1";

const Store = {
  _cache: null,

  getData() {
    if (this._cache) return this._cache;
    let raw = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage có thể bị chặn (chế độ ẩn danh nghiêm ngặt) */
    }
    if (raw) {
      try {
        this._cache = JSON.parse(raw);
        return this._cache;
      } catch (e) {
        console.warn("Dữ liệu lưu trong trình duyệt bị lỗi, dùng dữ liệu mặc định.", e);
      }
    }
    // deep clone để không vô tình sửa DEFAULT_DATA gốc
    this._cache = JSON.parse(JSON.stringify(DEFAULT_DATA));
    return this._cache;
  },

  save(data) {
    this._cache = data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      alert("Không thể lưu vào trình duyệt (bộ nhớ đầy hoặc bị chặn). Hãy xuất file để sao lưu thủ công.");
    }
  },

  resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    this._cache = null;
  },

  // ---- Helper truy vấn ----
  getTeam(id) {
    return this.getData().teams.find((t) => t.id === id) || null;
  },

  /** Trận chưa gán "stage" (vd: nhập tay thiếu trường) được coi là "group" mặc định. */
  matchStage(m) {
    return m.stage || "group";
  },

  getMatches({ week, stage } = {}) {
    let matches = this.getData().matches.slice();
    // So sánh == (không ==) để không bị lệch nếu tuần được lưu dạng chuỗi "1" thay vì số 1
    if (week) matches = matches.filter((m) => m.week == week);
    if (stage) matches = matches.filter((m) => this.matchStage(m) === stage);
    return matches.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  },

  getWeeks() {
    // Number(...) để gộp lại nếu vài trận lỡ lưu "week" dạng chuỗi thay vì số
    const weeks = new Set(this.getData().matches.map((m) => Number(m.week)));
    return Array.from(weeks).sort((a, b) => a - b);
  },

  /** Tính bảng xếp hạng vòng bảng: thắng trận (2 điểm), thua (0), hiệu số ván. */
  computeStandings() {
    const data = this.getData();
    const table = {};
    data.teams.forEach((t) => {
      table[t.id] = {
        team: t, played: 0, win: 0, loss: 0,
        mapWin: 0, mapLoss: 0, points: 0,
      };
    });
    data.matches
      .filter((m) => this.matchStage(m) === "group" && m.status === "finished" && m.score1 !== null && m.score2 !== null)
      .forEach((m) => {
        const a = table[m.team1];
        const b = table[m.team2];
        if (!a || !b) return;
        a.played++; b.played++;
        a.mapWin += m.score1; a.mapLoss += m.score2;
        b.mapWin += m.score2; b.mapLoss += m.score1;
        if (m.score1 > m.score2) { a.win++; b.loss++; a.points += 2; }
        else if (m.score2 > m.score1) { b.win++; a.loss++; b.points += 2; }
      });
    return Object.values(table).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const diffA = a.mapWin - a.mapLoss;
      const diffB = b.mapWin - b.mapLoss;
      return diffB - diffA;
    });
  },

  exportAsJsFile() {
    const data = this.getData();
    const body =
      "/**\n * data.js — Dữ liệu mặc định của giải đấu.\n" +
      " * (Đã xuất tự động từ trang Quản trị — dán đè vào assets/js/data.js rồi commit lên GitHub)\n */\n\n" +
      "const DEFAULT_DATA = " + JSON.stringify(data, null, 2) + ";\n\n" +
      "async function loadRemoteData() {\n  return null;\n}\n";
    return body;
  },

  downloadExport() {
    const blob = new Blob([this.exportAsJsFile()], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
};
