/**
 * data.js
 * ĐẤU TRƯỜNG DANH VỌNG MÙA ĐÔNG 2026
 *
 * Cập nhật dữ liệu: 15/09/2026
 *
 * Nguồn đối chiếu:
 * - Liên Quân Mobile / Garena
 * - Lịch thi đấu và kết quả vòng bảng
 *
 * Trạng thái dữ liệu:
 * - Đã cập nhật kết quả đến hết ngày 13/09/2026
 * - Lịch tiếp theo: 18/09 → 20/09/2026
 */

const DEFAULT_DATA = {
  // =========================================================
  // BỘ MÔN
  // =========================================================

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


  // =========================================================
  // MÙA GIẢI
  // =========================================================

  season: {
    id: "dtv-mua-dong-2026",

    name: "ĐẤU TRƯỜNG DANH VỌNG MÙA ĐÔNG 2026",

    shortName: "ĐTDV MÙA ĐÔNG 2026",

    subtitle: "KỶ NGUYÊN DANH VỌNG – ERA OF G10RY",

    status: "ongoing",

    currentAsOf: "2026-09-15",

    format: {
      totalTeams: 9,

      // Không còn Giai đoạn 2 / Top 6 riêng như các mùa trước
      groupStageEnabled: true,
      groupStageType: "round-robin",
      groupStageLegs: 2,

      // -----------------------------------------
      // LƯỢT ĐI
      // -----------------------------------------

      firstLeg: {
        name: "VÒNG BẢNG - LƯỢT ĐI",
        stage: "group-first-leg",
        bestOf: 5,
        startDate: "2026-08-29",
        endDate: "2026-09-20",
        bountyPerMatch: 50000000,
      },

      // -----------------------------------------
      // LƯỢT VỀ
      // -----------------------------------------

      secondLeg: {
        name: "VÒNG BẢNG - LƯỢT VỀ",
        stage: "group-second-leg",
        bestOf: 5,
        startDate: "2026-10-01",
        endDate: "2026-10-18",
        bountyPerMatch: 80000000,
      },

      // 9 đội × 8 đối thủ / 2
      matchesPerLeg: 36,
      totalGroupMatches: 72,

      // -----------------------------------------
      // PLAYOFF
      // -----------------------------------------

      playoffEnabled: true,

      playoffTeams: 6,

      playoffType: "double-elim",

      playoffBestOf: 7,

      playoff: {
        startDate: "2026-10-23",
        endDate: "2026-10-25",

        upperBracketSeeds: [1, 2, 3, 4],

        lowerBracketSeeds: [5, 6],

        seed1CanChooseOpponent: true,

        selectableOpponentsForSeed1: [3, 4],
      },

      // -----------------------------------------
      // CHUNG KẾT
      // -----------------------------------------

      grandFinal: {
        enabled: true,
        bestOf: 7,
        date: "2026-11-07",
      },
    },


    // =======================================================
    // GIẢI THƯỞNG
    // =======================================================

    prizePool: {
      total: 6750000000,

      champion: 1000000000,
      runnerUp: 500000000,
      thirdPlace: 200000000,
      fourthPlace: 150000000,
      fifthPlace: 60000000,
      sixthPlace: 60000000,
    },


    // =======================================================
    // BOUNTY HUNTER
    // =======================================================

    bountyHunter: {
      firstLeg: {
        totalPerMatch: 50000000,

        "3-0": {
          winner: 50000000,
          loser: 0,
        },

        "3-1": {
          winner: 40000000,
          loser: 10000000,
        },

        "3-2": {
          winner: 30000000,
          loser: 20000000,
        },
      },

      secondLeg: {
        totalPerMatch: 80000000,

        "3-0": {
          winner: 80000000,
          loser: 0,
        },

        "3-1": {
          winner: 65000000,
          loser: 15000000,
        },

        "3-2": {
          winner: 50000000,
          loser: 30000000,
        },
      },
    },
  },


  // =========================================================
  // 9 ĐỘI TUYỂN
  // =========================================================

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


  // =========================================================
  // BẢNG XẾP HẠNG
  // CẬP NHẬT SAU NGÀY 13/09/2026
  // =========================================================
  //
  // points:
  // Mỗi chiến thắng BO5 = 3 điểm.
  //
  // Đây là BXH tạm thời, chưa phải BXH cuối lượt đi.
  //

  standings: [
    {
      rank: 1,
      teamId: "t2",
      played: 7,
      wins: 7,
      losses: 0,
      points: 21,
    },

    {
      rank: 2,
      teamId: "t1",
      played: 6,
      wins: 4,
      losses: 2,
      points: 12,
    },

    {
      rank: 3,
      teamId: "t3",
      played: 6,
      wins: 4,
      losses: 2,
      points: 12,
    },

    {
      rank: 4,
      teamId: "t6",
      played: 6,
      wins: 4,
      losses: 2,
      points: 12,
    },

    {
      rank: 5,
      teamId: "t9",
      played: 6,
      wins: 3,
      losses: 3,
      points: 9,
    },

    {
      rank: 6,
      teamId: "t5",
      played: 5,
      wins: 3,
      losses: 2,
      points: 9,
    },

    {
      rank: 7,
      teamId: "t7",
      played: 7,
      wins: 2,
      losses: 5,
      points: 6,
    },

    {
      rank: 8,
      teamId: "t4",
      played: 6,
      wins: 1,
      losses: 5,
      points: 3,
    },

    {
      rank: 9,
      teamId: "t8",
      played: 6,
      wins: 0,
      losses: 6,
      points: 0,
    },
  ],


  // =========================================================
  // TRẬN ĐẤU
  // =========================================================

  matches: [

    // =======================================================
    // TUẦN 1
    // 29/08/2026
    // =======================================================

    {
      id: "m1",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-29",
      time: "13:00",
      team1: "t9",
      team2: "t2",
      score1: 1,
      score2: 3,
      status: "finished",
    },

    {
      id: "m2",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-29",
      time: "16:00",
      team1: "t4",
      team2: "t6",
      score1: 1,
      score2: 3,
      status: "finished",
    },

    {
      id: "m3",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-29",
      time: "19:30",
      team1: "t3",
      team2: "t8",
      score1: 3,
      score2: 0,
      status: "finished",
    },

    // 30/08

    {
      id: "m4",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-30",
      time: "13:00",
      team1: "t7",
      team2: "t1",
      score1: 1,
      score2: 3,
      status: "finished",
    },

    {
      id: "m5",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-30",
      time: "16:00",
      team1: "t5",
      team2: "t8",
      score1: 3,
      score2: 1,
      status: "finished",
    },

    {
      id: "m6",
      week: 1,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-08-30",
      time: "19:30",
      team1: "t2",
      team2: "t3",
      score1: 3,
      score2: 2,
      status: "finished",
    },


    // =======================================================
    // TUẦN 2
    // 03/09 → 06/09
    // =======================================================

    {
      id: "m7",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-03",
      time: "16:00",
      team1: "t6",
      team2: "t9",
      score1: 3,
      score2: 0,
      status: "finished",
    },

    {
      id: "m8",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-03",
      time: "19:30",
      team1: "t4",
      team2: "t7",
      score1: 2,
      score2: 3,
      status: "finished",
    },

    {
      id: "m9",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-04",
      time: "13:00",
      team1: "t8",
      team2: "t2",
      score1: 0,
      score2: 3,
      status: "finished",
    },

    {
      id: "m10",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-04",
      time: "16:00",
      team1: "t7",
      team2: "t5",
      score1: 1,
      score2: 3,
      status: "finished",
    },

    {
      id: "m11",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-04",
      time: "19:00",
      team1: "t1",
      team2: "t6",
      score1: 3,
      score2: 0,
      status: "finished",
    },

    {
      id: "m12",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-05",
      time: "13:00",
      team1: "t9",
      team2: "t4",
      score1: 3,
      score2: 1,
      status: "finished",
    },

    {
      id: "m13",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-05",
      time: "16:00",
      team1: "t7",
      team2: "t2",
      score1: 0,
      score2: 3,
      status: "finished",
    },

    {
      id: "m14",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-05",
      time: "19:00",
      team1: "t5",
      team2: "t1",
      score1: 3,
      score2: 2,
      status: "finished",
    },

    {
      id: "m15",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-06",
      time: "13:00",
      team1: "t8",
      team2: "t9",
      score1: 0,
      score2: 3,
      status: "finished",
    },

    {
      id: "m16",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-06",
      time: "16:00",
      team1: "t3",
      team2: "t6",
      score1: 3,
      score2: 1,
      status: "finished",
    },

    {
      id: "m17",
      week: 2,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-06",
      time: "19:00",
      team1: "t2",
      team2: "t5",
      score1: 3,
      score2: 1,
      status: "finished",
    },


    // =======================================================
    // TUẦN 3
    // 10/09 → 13/09
    // =======================================================

    {
      id: "m18",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-10",
      time: "16:00",
      team1: "t9",
      team2: "t3",
      score1: 2,
      score2: 3,
      status: "finished",
    },

    {
      id: "m19",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-10",
      time: "19:30",
      team1: "t1",
      team2: "t4",
      score1: 3,
      score2: 2,
      status: "finished",
    },

    {
      id: "m20",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-11",
      time: "13:00",
      team1: "t6",
      team2: "t7",
      score1: 3,
      score2: 2,
      status: "finished",
    },

    {
      id: "m21",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-11",
      time: "16:00",
      team1: "t5",
      team2: "t3",
      score1: 0,
      score2: 3,
      status: "finished",
    },

    {
      id: "m22",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-11",
      time: "19:30",
      team1: "t2",
      team2: "t4",
      score1: 3,
      score2: 0,
      status: "finished",
    },

    {
      id: "m23",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-12",
      time: "13:00",
      team1: "t9",
      team2: "t7",
      score1: 3,
      score2: 0,
      status: "finished",
    },

    {
      id: "m24",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-12",
      time: "16:00",
      team1: "t1",
      team2: "t8",
      score1: 3,
      score2: 0,
      status: "finished",
    },

    {
      id: "m25",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-12",
      time: "19:30",
      team1: "t4",
      team2: "t3",
      score1: 3,
      score2: 2,
      status: "finished",
    },

    {
      id: "m26",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-13",
      time: "13:00",
      team1: "t6",
      team2: "t5",
      score1: 3,
      score2: 1,
      status: "finished",
    },

    {
      id: "m27",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-13",
      time: "16:00",
      team1: "t7",
      team2: "t8",
      score1: 3,
      score2: 2,
      status: "finished",
    },

    {
      id: "m28",
      week: 3,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-13",
      time: "19:30",
      team1: "t2",
      team2: "t1",
      score1: 3,
      score2: 0,
      status: "finished",
    },


    // =======================================================
    // TUẦN 4 - UPCOMING
    // 18/09 → 20/09
    // =======================================================

    {
      id: "m29",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-18",
      time: "13:00",
      team1: "t4",
      team2: "t5",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m30",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-18",
      time: "16:00",
      team1: "t8",
      team2: "t6",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m31",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-18",
      time: "19:30",
      team1: "t1",
      team2: "t9",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m32",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-19",
      time: "13:00",
      team1: "t3",
      team2: "t7",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m33",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-19",
      time: "16:00",
      team1: "t5",
      team2: "t9",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m34",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-19",
      time: "19:30",
      team1: "t6",
      team2: "t2",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m35",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-20",
      time: "16:00",
      team1: "t8",
      team2: "t4",
      score1: null,
      score2: null,
      status: "upcoming",
    },

    {
      id: "m36",
      week: 4,
      leg: 1,
      stage: "group-first-leg",
      date: "2026-09-20",
      time: "19:30",
      team1: "t3",
      team2: "t1",
      score1: null,
      score2: null,
      status: "upcoming",
    },


    // =======================================================
    // LƯỢT VỀ
    // 01/10 → 18/10
    // =======================================================
    //
    // Chưa diễn ra tại thời điểm cập nhật.
    //
    // Các trận sẽ được bổ sung vào đây khi lịch/kết quả
    // được cập nhật.
    // =======================================================


    // =======================================================
    // PLAYOFF
    // =======================================================
    //
    // Top 1-4: Nhánh trên
    // Top 5-6: Nhánh dưới
    //
    // Seed #1 được chọn #3 hoặc #4 làm đối thủ.
    // =======================================================

  ],


  // =========================================================
  // PLAYOFF BRACKET
  // =========================================================

  bracket: {
    type: "double-elim",

    upper: [
      {
        id: "u1",
        round: 1,

        // Seed #1 chọn Seed #3 hoặc #4
        team1: "seed:1",
        team2: null,

        score1: null,
        score2: null,

        status: "upcoming",

        bestOf: 7,
      },

      {
        id: "u2",
        round: 1,

        team1: null,
        team2: "seed:2",

        score1: null,
        score2: null,

        status: "upcoming",

        bestOf: 7,
      },

      {
        id: "u3",
        round: 2,

        team1: null,
        team2: null,

        score1: null,
        score2: null,

        status: "upcoming",

        bestOf: 7,
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

        bestOf: 7,
      },

      {
        id: "l2",
        round: 2,

        team1: null,
        team2: null,

        score1: null,
        score2: null,

        status: "upcoming",

        bestOf: 7,
      },

      {
        id: "l3",
        round: 3,

        team1: null,
        team2: null,

        score1: null,
        score2: null,

        status: "upcoming",

        bestOf: 7,
      },
    ],


    grandFinal: {
      id: "gf",

      team1: null,
      team2: null,

      score1: null,
      score2: null,

      status: "upcoming",

      bestOf: 7,

      date: "2026-11-07",
    },
  },


  // =========================================================
  // META / THÔNG TIN CẬP NHẬT
  // =========================================================

  meta: {
    lastUpdated: "2026-09-15",

    currentStage: "group-first-leg",

    currentWeek: 4,

    completedThrough: "2026-09-13",

    nextMatchDate: "2026-09-18",

    nextWeek: 4,

    dataSource: "Garena Liên Quân Mobile",

    seasonTheme: "Kỷ nguyên Danh vọng – Era of G10RY",

    notes: [
      "ĐTDV Mùa Đông 2026 có 9 đội tuyển.",
      "Vòng bảng thi đấu vòng tròn 2 lượt.",
      "Vòng bảng sử dụng BO5.",
      "Top 6 vòng bảng vào Playoffs.",
      "Playoffs sử dụng nhánh thắng - nhánh thua.",
      "Playoffs sử dụng BO7.",
      "Chung kết Quốc gia diễn ra ngày 07/11/2026 và sử dụng BO7.",
      "Đội đứng đầu vòng bảng được quyền chọn đội hạng 3 hoặc hạng 4 làm đối thủ đầu tiên tại Playoffs.",
      "Lượt đi có Bounty Hunter 50 triệu đồng/trận.",
      "Lượt về có Bounty Hunter 80 triệu đồng/trận.",
    ],
  },
};


/**
 * loadRemoteData
 *
 * Hiện tại dùng dữ liệu tĩnh + localStorage.
 *
 * Có thể thay bằng API trong tương lai:
 *
 * async function loadRemoteData() {
 *   const response = await fetch(
 *     "https://example.com/api/dtdv-mua-dong-2026.json"
 *   );
 *
 *   return response.json();
 * }
 */

async function loadRemoteData() {
  return null;
}
