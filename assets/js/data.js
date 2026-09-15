/**
 * data.js — Dữ liệu mặc định của giải đấu.
 *
 * File này đóng vai trò như "cơ sở dữ liệu" tĩnh của trang web.
 * Khi bạn dùng trang Quản trị (quan-tri.html) để sửa đội / trận đấu,
 * dữ liệu mới được lưu vào localStorage của trình duyệt (chỉ máy bạn thấy).
 * Muốn MỌI người xem đều thấy dữ liệu mới, hãy bấm "Xuất file data.js"
 * trong trang quản trị rồi dán đè nội dung vào chính file này, sau đó
 * commit + push lên GitHub.
 *
 * Sau này nếu muốn nối vào một nguồn dữ liệu động (API, Google Sheet, v.v.)
 * bạn chỉ cần thay nội dung hàm `loadRemoteData()` ở cuối file — phần còn
 * lại của trang web sẽ không cần sửa gì.
 */

const DEFAULT_DATA = {
  // ----- Thông tin bộ môn / mùa giải -----
  esport: {
    id: "lienquan",
    name: "Liên Quân Mobile",
    icon: "⚔️",
  },
  // Danh sách bộ môn sẽ hỗ trợ trong tương lai — chỉ cần thêm phần tử vào đây
  // và nhân bản bộ dữ liệu bên dưới theo từng esport.id khi mở rộng.
  supportedEsports: [
    { id: "lienquan", name: "Liên Quân Mobile", icon: "⚔️", active: true },
    { id: "lol", name: "Liên Minh Huyền Thoại", icon: "🛡️", active: false },
    { id: "valorant", name: "Valorant", icon: "🎯", active: false },
  ],

  season: {
    name: "GIẢI ĐẤU MÙA ĐÔNG 2026",
    subtitle: "VÒNG BẢNG - LƯỢT ĐI",
    // Thể thức: số đội, số vòng bảng, có playoff nhánh thắng/thua hay không
    format: {
      groupStageEnabled: true,
      totalWeeks: 4,
      bestOf: 3, // Bo3 mặc định cho vòng bảng
      playoffEnabled: true,
      playoffType: "double-elim", // "double-elim" | "single-elim"
      playoffBestOf: 5,
    },
  },

  // ----- Danh sách đội tuyển -----
  // "logo" có thể là 1-3 ký tự viết tắt (hiển thị dạng huy hiệu màu) hoặc
  // đường dẫn ảnh (ví dụ "assets/img/tenlogo.png") nếu bạn upload logo riêng.
  teams: [
    { id: "t1", name: "FALCON GAMING", short: "FGC", logo: "FG", color: "#3E8EF7" },
    { id: "t2", name: "CRIMSON WOLVES", short: "CRW", logo: "CW", color: "#F0473B" },
    { id: "t3", name: "ONE STAR ESPORTS", short: "OSE", logo: "OS", color: "#F0A93B" },
    { id: "t4", name: "DRAGON ROOT", short: "DGR", logo: "DR", color: "#8B5CF6" },
    { id: "t5", name: "SILVER SIX", short: "S6", logo: "S6", color: "#34D399" },
    { id: "t6", name: "TITAN POLYTECHNIC", short: "TYT", logo: "TP", color: "#EC4899" },
    { id: "t7", name: "PHOENIX RISING", short: "PHX", logo: "PX", color: "#FB923C" },
    { id: "t8", name: "IRON GUARD", short: "IRG", logo: "IG", color: "#64748B" },
  ],

  // ----- Danh sách trận đấu -----
  // stage: "group" | "playoff-upper" | "playoff-lower" | "grand-final"
  // status: "upcoming" | "live" | "finished"
  matches: [
    {
      id: "m1", week: 1, stage: "group", date: "2026-08-30",
      team1: "t1", team2: "t7", score1: 1, score2: 3, status: "finished",
    },
    {
      id: "m2", week: 1, stage: "group", date: "2026-08-30",
      team1: "t3", team2: "t4", score1: 3, score2: 1, status: "finished",
    },
    {
      id: "m3", week: 1, stage: "group", date: "2026-08-30",
      team1: "t5", team2: "t6", score1: 3, score2: 2, status: "finished",
    },
    {
      id: "m4", week: 2, stage: "group", date: "2026-09-06",
      team1: "t2", team2: "t8", score1: null, score2: null, status: "upcoming",
    },
    {
      id: "m5", week: 2, stage: "group", date: "2026-09-06",
      team1: "t1", team2: "t3", score1: null, score2: null, status: "upcoming",
    },
    {
      id: "m6", week: 2, stage: "group", date: "2026-09-07",
      team1: "t4", team2: "t5", score1: null, score2: null, status: "upcoming",
    },
  ],

  // ----- Nhánh playoff (double-elim mẫu, có thể để trống nếu chưa tới vòng playoff) -----
  // round: số vòng trong nhánh; slotA/slotB: "seed:X" (đội xếp hạng X vòng bảng) hoặc id trận nguồn "m:winner_of_m1"
  bracket: {
    upper: [
      { id: "u1", round: 1, team1: null, team2: null, score1: null, score2: null, status: "upcoming" },
      { id: "u2", round: 1, team1: null, team2: null, score1: null, score2: null, status: "upcoming" },
    ],
    lower: [
      { id: "l1", round: 1, team1: null, team2: null, score1: null, score2: null, status: "upcoming" },
    ],
    grandFinal: { id: "gf", team1: null, team2: null, score1: null, score2: null, status: "upcoming" },
  },
};

/**
 * loadRemoteData — điểm mở rộng cho tương lai.
 * Hiện tại trả về null (nghĩa là dùng DEFAULT_DATA + localStorage).
 * Sau này bạn có thể thay bằng: return fetch("https://.../matches.json").then(r => r.json());
 */
async function loadRemoteData() {
  return null;
}
