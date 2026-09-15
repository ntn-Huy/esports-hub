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
  name: "ĐẤU TRƯỜNG DANH VỌNG MÙA ĐÔNG 2026",
  subtitle: "KỶ NGUYÊN DANH VỌNG – ERA OF G10RY",

  format: {
    totalTeams: 9,

    // Vòng bảng: 2 lượt, mỗi đội gặp nhau 2 lần
    groupStageEnabled: true,
    groupStageType: "round-robin",
    groupStageRounds: 2,
    firstLeg: {
      name: "VÒNG BẢNG - LƯỢT ĐI",
      bestOf: 5,
      startDate: "2026-08-29",
      endDate: "2026-09-20",
      totalMatches: 36,
    },
    secondLeg: {
      name: "VÒNG BẢNG - LƯỢT VỀ",
      bestOf: 5,
      startDate: "2026-10-01",
      endDate: "2026-10-18",
      totalMatches: 36,
    },

    // Không có vòng Top 6 riêng ở Giai đoạn 2
    top6StageEnabled: false,

    playoffEnabled: true,
    playoffTeams: 6,
    playoffType: "double-elim",
    playoffBestOf: 7,
    playoffStartDate: "2026-10-23",
    playoffEndDate: "2026-10-25",

    grandFinalEnabled: true,
    grandFinalBestOf: 7,
    grandFinalDate: "2026-11-07",
  },
},

// ----- 9 ĐỘI TUYỂN ĐTDV MÙA ĐÔNG 2026 -----
teams: [
  {
    id: "t1",
    name: "FPT x FLASH",
    short: "FPT",
    logo: "FF",
    color: "#FF8A00",
  },
  {
    id: "t2",
    name: "SAIGON PHANTOM",
    short: "SGP",
    logo: "SP",
    color: "#E53935",
  },
  {
    id: "t3",
    name: "FPT POLYTECHNIC",
    short: "FPL",
    logo: "FP",
    color: "#1976D2",
  },
  {
    id: "t4",
    name: "GAM ESPORTS",
    short: "GAM",
    logo: "GM",
    color: "#FFD600",
  },
  {
    id: "t5",
    name: "ONE STAR ESPORTS",
    short: "1S",
    logo: "OS",
    color: "#F0A93B",
  },
  {
    id: "t6",
    name: "BOX GAMING",
    short: "BOX",
    logo: "BX",
    color: "#111827",
  },
  {
    id: "t7",
    name: "TEAM SECRET",
    short: "TSS",
    logo: "TS",
    color: "#00AEEF",
  },
  {
    id: "t8",
    name: "REX REGUM QEON",
    short: "RRQ",
    logo: "RQ",
    color: "#F6C344",
  },
  {
    id: "t9",
    name: "BOOM ESPORTS",
    short: "BME",
    logo: "BM",
    color: "#00C853",
  },
],

// ----- TRẬN ĐẤU -----
// stage:
// "group-first-leg"
// "group-second-leg"
// "playoff-upper"
// "playoff-lower"
// "grand-final"
//
// status:
// "upcoming" | "live" | "finished"
matches: [
  // Lượt đi - Tuần 1
  {
    id: "m1",
    week: 1,
    stage: "group-first-leg",
    date: "2026-08-29",
    team1: "t9",
    team2: "t2",
    score1: 1,
    score2: 3,
    status: "finished",
  },
  {
    id: "m2",
    week: 1,
    stage: "group-first-leg",
    date: "2026-08-29",
    team1: "t4",
    team2: "t6",
    score1: 1,
    score2: 3,
    status: "finished",
  },
  {
    id: "m3",
    week: 1,
    stage: "group-first-leg",
    date: "2026-08-29",
    team1: "t3",
    team2: "t8",
    score1: 3,
    score2: 0,
    status: "finished",
  },

  {
    id: "m4",
    week: 1,
    stage: "group-first-leg",
    date: "2026-08-30",
    team1: "t7",
    team2: "t1",
    score1: 1,
    score2: 3,
    status: "finished",
  },
  {
    id: "m5",
    week: 1,
    stage: "group-first-leg",
    date: "2026-08-30",
    team1: "t5",
    team2: "t8",
    score1: 3,
    score2: 1,
    status: "finished",
  },
  {
    id: "m6",
    week: 1,
    stage: "group-first-leg",
    date: "2026-08-30",
    team1: "t2",
    team2: "t3",
    score1: 3,
    score2: 2,
    status: "finished",
  },

  // Lượt đi - Tuần 2
  {
    id: "m7",
    week: 2,
    stage: "group-first-leg",
    date: "2026-09-03",
    team1: "t6",
    team2: "t9",
    score1: 3,
    score2: 0,
    status: "finished",
  },
  {
    id: "m8",
    week: 2,
    stage: "group-first-leg",
    date: "2026-09-03",
    team1: "t4",
    team2: "t7",
    score1: 2,
    score2: 3,
    status: "finished",
  },

  {
    id: "m9",
    week: 2,
    stage: "group-first-leg",
    date: "2026-09-04",
    team1: "t8",
    team2: "t2",
    score1: null,
    score2: null,
    status: "upcoming",
  },
  {
    id: "m10",
    week: 2,
    stage: "group-first-leg",
    date: "2026-09-04",
    team1: "t7",
    team2: "t5",
    score1: null,
    score2: null,
    status: "upcoming",
  },
  {
    id: "m11",
    week: 2,
    stage: "group-first-leg",
    date: "2026-09-04",
    team1: "t1",
    team2: "t6",
    score1: null,
    score2: null,
    status: "upcoming",
  },
  {
    id: "m12",
    week: 2,
    stage: "group-first-leg",
    date: "2026-09-05",
    team1: "t9",
    team2: "t4",
    score1: null,
    score2: null,
    status: "upcoming",
  },

  // Lượt về: tạo tiếp các trận theo lịch chính thức
  // ...
],

// ----- PLAYOFF DOUBLE-ELIMINATION -----
// Top 1-4: Nhánh trên
// Top 5-6: Nhánh dưới
//
// Đội #1 được quyền chọn #3 hoặc #4 làm đối thủ trận đầu tiên.
bracket: {
  upper: [
    {
      id: "u1",
      round: 1,
      team1: "seed:1",
      team2: null, // seed:3 hoặc seed:4 do seed #1 lựa chọn
      score1: null,
      score2: null,
      status: "upcoming",
    },
    {
      id: "u2",
      round: 1,
      team1: null, // đội còn lại trong Top 3-4
      team2: "seed:2",
      score1: null,
      score2: null,
      status: "upcoming",
    },
  ],

  lower: [
    {
      id: "l1",
      round: 1,
      team1: "seed:5",
      team2: "seed:6",
      score1: null,
      score2: null,
      status: "upcoming",
    },
    {
      id: "l2",
      round: 2,
      team1: null, // loser từ nhánh trên
      team2: null, // winner từ nhánh dưới
      score1: null,
      score2: null,
      status: "upcoming",
    },
  ],

  grandFinal: {
    id: "gf",
    team1: null,
    team2: null,
    score1: null,
    score2: null,
    status: "upcoming",
  },
},

/**
 * loadRemoteData — điểm mở rộng cho tương lai.
 * Hiện tại trả về null (nghĩa là dùng DEFAULT_DATA + localStorage).
 * Sau này bạn có thể thay bằng: return fetch("https://.../matches.json").then(r => r.json());
 */
async function loadRemoteData() {
  return null;
}
