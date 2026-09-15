/**
 * data.js — Dữ liệu mặc định của giải đấu.
 *
 * ĐẤU TRƯỜNG DANH VỌNG MÙA ĐÔNG 2026
 * Liên Quân Mobile Việt Nam
 */

const DEFAULT_DATA = {
  // ----- Thông tin bộ môn / mùa giải -----
  esport: {
    id: "lienquan",
    name: "Liên Quân Mobile",
    icon: "⚔️",
  },

  supportedEsports: [
    {
      id: "lienquan",
      name: "Liên Quân Mobile",
      icon: "⚔️",
      active: true,
    },
    {
      id: "lol",
      name: "Liên Minh Huyền Thoại",
      icon: "🛡️",
      active: false,
    },
    {
      id: "valorant",
      name: "Valorant",
      icon: "🎯",
      active: false,
    },
  ],

  // ----- Mùa giải -----
  season: {
    id: "dtv-mua-dong-2026",
    name: "ĐẤU TRƯỜNG DANH VỌNG MÙA ĐÔNG 2026",
    shortName: "ĐTDV MÙA ĐÔNG 2026",
    subtitle: "ERA OF G10RY",

    format: {
      totalTeams: 9,

      // Vòng bảng thi đấu vòng tròn 2 lượt
      groupStageEnabled: true,
      groupStageType: "round-robin",
      groupStageLegs: 2,

      firstLeg: {
        name: "VÒNG BẢNG - LƯỢT ĐI",
        bestOf: 5,
        startDate: "2026-08-29",
        endDate: "2026-09-20",
      },

      secondLeg: {
        name: "VÒNG BẢNG - LƯỢT VỀ",
        bestOf: 5,
        startDate: "2026-10-01",
        endDate: "2026-10-18",
      },

      // 9 đội, mỗi đội gặp 8 đội còn lại ở mỗi lượt
      matchesPerLeg: 36,
      totalGroupMatches: 72,

      // Top 6 vào Playoffs
      playoffEnabled: true,
      playoffTeams: 6,
      playoffType: "double-elim",
      playoffBestOf: 7,

      playoff: {
        startDate: "2026-10-23",
        endDate: "2026-10-25",
      },

      grandFinal: {
        enabled: true,
        bestOf: 7,
        date: "2026-11-07",
      },
    },
  },

  // ----- Danh sách 9 đội tuyển -----
  //
  // logo:
  // - Có thể dùng chữ viết tắt nếu chưa upload logo.
  // - Có thể thay bằng đường dẫn:
  //   "assets/img/team-logo.png"
  //
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
      short: "TS",
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

  // ----- Danh sách trận đấu -----
  //
  // stage:
  // "group-first-leg"
  // "group-second-leg"
  // "playoff-upper"
  // "playoff-lower"
  // "grand-final"
  //
  // status:
  // "upcoming"
  // "live"
  // "finished"
  //
  matches: [

    // ==========================================
    // VÒNG BẢNG - LƯỢT ĐI
    // ==========================================

    {
      id: "m1",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-29",
      team1: "t9",
      team2: "t2",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m2",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-29",
      team1: "t4",
      team2: "t6",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m3",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-29",
      team1: "t3",
      team2: "t8",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m4",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-30",
      team1: "t7",
      team2: "t1",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m5",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-30",
      team1: "t5",
      team2: "t8",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m6",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-30",
      team1: "t2",
      team2: "t3",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    // ==========================================
    // Các trận còn lại của lượt đi
    // ==========================================
    //
    // Có thể bổ sung tiếp khi có lịch chính thức.
    //

    // ==========================================
    // VÒNG BẢNG - LƯỢT VỀ
    // ==========================================

    // Sẽ bổ sung theo lịch chính thức.
    // Không tự tạo ngày / cặp đấu / tỷ số.


    // ==========================================
    // PLAYOFF - NHÁNH TRÊN
    // ==========================================

    {
      id: "u1",
      round: 1,
      stage: "playoff-upper",
      team1: "seed:1",
      team2: null,
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "u2",
      round: 1,
      stage: "playoff-upper",
      team1: null,
      team2: "seed:2",
      score1: null,
      score2: null,
      status: "upcoming",
    },


    // ==========================================
    // PLAYOFF - NHÁNH DƯỚI
    // ==========================================

    {
      id: "l1",
      round: 1,
      stage: "playoff-lower",
      team1: "seed:5",
      team2: "seed:6",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "l2",
      round: 2,
      stage: "playoff-lower",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      status: "upcoming",
    },


    // ==========================================
    // GRAND FINAL
    // ==========================================

    {
      id: "gf",
      stage: "grand-final",
      team1: null,
      team2: null,
      score1: null,
      score2: null,
      status: "upcoming",
    },
  ],


  // ----- BXH mặc định -----
  //
  // Có thể để trống để JavaScript tự tính từ matches.
  //
  standings: [],


  // ----- Nhánh Playoff -----
  bracket: {
    type: "double-elim",

    upper: [
      {
        id: "u1",
        round: 1,
        team1: "seed:1",
        team2: null,
        score1: null,
        score2: null,
        status: "upcoming",
      },

      {
        id: "u2",
        round: 1,
        team1: null,
        team2: "seed:2",
        score1: null,
        score2: null,
        status: "upcoming",
      },

      {
        id: "u3",
        round: 2,
        team1: null,
        team2: null,
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
        team1: null,
        team2: null,
        score1: null,
        score2: null,
        status: "upcoming",
      },

      {
        id: "l3",
        round: 3,
        team1: null,
        team2: null,
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
};


/**
 * loadRemoteData — điểm mở rộng cho tương lai.
 *
 * Hiện tại trả về null:
 * => dùng DEFAULT_DATA + localStorage.
 *
 * Sau này có thể thay bằng API:
 *
 * return fetch("https://example.com/data.json")
 *   .then(response => response.json());
 */
async function loadRemoteData() {
  return null;
}
