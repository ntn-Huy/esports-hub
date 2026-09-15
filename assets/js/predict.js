/**
 * predict.js — Trò chơi dự đoán (pick'em)
 *
 * LƯU Ý:
 * Vì đây là trang web tĩnh (không có máy chủ/database),
 * dự đoán của mỗi người chỉ được lưu trong trình duyệt
 * của chính họ bằng localStorage.
 *
 * Không có bảng xếp hạng dùng chung giữa nhiều người xem.
 */

const PREDICT_KEY = "esport_site_predictions_v1";

const Predict = {
  _cache: null,

  // =========================================================
  // STATE
  // =========================================================

  getState() {
    if (this._cache) return this._cache;

    let raw = null;

    try {
      raw = localStorage.getItem(PREDICT_KEY);
    } catch (e) {}

    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        this._cache = {
          playerName: parsed.playerName || "",
          matchPicks: parsed.matchPicks || {},
          top4Pick: Array.isArray(parsed.top4Pick)
            ? parsed.top4Pick
            : [],
          bracketPicks: parsed.bracketPicks || {},
        };

        return this._cache;
      } catch (e) {
        console.warn("Dữ liệu dự đoán bị lỗi, tạo lại state.");
      }
    }

    this._cache = {
      playerName: "",
      matchPicks: {},
      top4Pick: [],
      bracketPicks: {},
    };

    return this._cache;
  },

  save() {
    try {
      localStorage.setItem(
        PREDICT_KEY,
        JSON.stringify(this._cache)
      );
    } catch (e) {
      console.warn("Không thể lưu dữ liệu dự đoán.", e);
    }
  },

  // =========================================================
  // PLAYER NAME
  // =========================================================

  setPlayerName(name) {
    const state = this.getState();

    state.playerName = String(name || "").trim();

    this.save();
  },

  // =========================================================
  // MATCH PICK
  // =========================================================

  pickMatch(matchId, teamId) {
    const state = this.getState();

    if (!matchId || !teamId) return;

    state.matchPicks[matchId] = teamId;

    this.save();
  },

  // =========================================================
  // TOP 4
  // =========================================================

  pickTop4(order) {
    const state = this.getState();

    if (!Array.isArray(order)) return;

    state.top4Pick = order.slice(0, 4);

    this.save();
  },

  // =========================================================
  // BRACKET
  // =========================================================

  pickBracket(bracketMatchId, teamId) {
    const state = this.getState();

    if (!bracketMatchId || !teamId) return;

    state.bracketPicks[bracketMatchId] = teamId;

    this.save();
  },

  // =========================================================
  // RESET
  // =========================================================

  resetPredictions() {
    this._cache = {
      playerName: this.getState().playerName || "",
      matchPicks: {},
      top4Pick: [],
      bracketPicks: {},
    };

    this.save();
  },

  // =========================================================
  // HELPER
  // =========================================================

  isGroupMatch(m) {
    if (!m) return false;

    const stage = m.stage || "group";

    return (
      stage === "group" ||
      stage === "group-first-leg" ||
      stage === "group-second-leg"
    );
  },

  getGroupMatchesForWeek(week) {
    const data = Store.getData();

    return data.matches
      .filter((m) => {
        return (
          Number(m.week) === Number(week) &&
          this.isGroupMatch(m)
        );
      })
      .sort((a, b) => {
        const dateCompare = (a.date || "").localeCompare(
          b.date || ""
        );

        if (dateCompare !== 0) {
          return dateCompare;
        }

        return (a.time || "").localeCompare(b.time || "");
      });
  },

  getBracketTeam(teamId) {
    if (!teamId) return null;

    const data = Store.getData();

    // Đội thật
    if (!String(teamId).startsWith("seed:")) {
      return Store.getTeam(teamId);
    }

    // Seed tạm thời
    const seed = String(teamId).replace("seed:", "");

    const standings = Array.isArray(data.standings)
      ? data.standings
      : [];

    const standing = standings.find(
      (s) => String(s.rank) === String(seed)
    );

    if (!standing) {
      return null;
    }

    return Store.getTeam(standing.teamId);
  },

  resolveSeed(teamId) {
    if (!teamId) return null;

    if (!String(teamId).startsWith("seed:")) {
      return teamId;
    }

    const seed = String(teamId).replace("seed:", "");

    const data = Store.getData();

    const standing = (data.standings || []).find(
      (s) => String(s.rank) === String(seed)
    );

    return standing ? standing.teamId : null;
  },

  // =========================================================
  // SCORE
  // =========================================================

  scoreMatchPicks() {
    const state = this.getState();
    const data = Store.getData();

    let correct = 0;
    let resolved = 0;

    (data.matches || []).forEach((m) => {
      const pick = state.matchPicks[m.id];

      if (
        !pick ||
        m.status !== "finished" ||
        m.score1 === null ||
        m.score2 === null
      ) {
        return;
      }

      resolved++;

      let winner = null;

      if (m.score1 > m.score2) {
        winner = m.team1;
      } else if (m.score2 > m.score1) {
        winner = m.team2;
      }

      if (winner && pick === winner) {
        correct++;
      }
    });

    return {
      correct,
      resolved,
      points: correct,
    };
  },

  // =========================================================
  // MAIN RENDER
  // =========================================================

  render(tabsRootId, contentRootId) {
    const state = this.getState();
    const data = Store.getData();

    // -------------------------------------------------------
    // NAME GATE
    // -------------------------------------------------------

    const nameBar = document.getElementById(
      "predict-name-bar"
    );

    if (nameBar) {
      if (state.playerName) {
        nameBar.innerHTML = `
          <div class="predict-name-current">
            Đang dự đoán với tên:
            <b>${this.escapeHTML(state.playerName)}</b>
            ·
            <button
              class="btn btn--ghost btn--sm"
              id="change-name-btn"
              type="button"
            >
              Đổi tên
            </button>
          </div>
        `;
      } else {
        nameBar.innerHTML = `
          <div class="predict-name-form">
            <input
              id="name-input"
              placeholder="Nhập tên hiển thị của bạn..."
              maxlength="50"
              style="max-width:240px;display:inline-block"
            />

            <button
              class="btn btn--primary btn--sm"
              id="save-name-btn"
              type="button"
            >
              Bắt đầu dự đoán
            </button>
          </div>
        `;
      }

      const nameInput =
        document.getElementById("name-input");

      const saveBtn =
        document.getElementById("save-name-btn");

      const changeBtn =
        document.getElementById("change-name-btn");

      if (saveBtn && nameInput) {
        saveBtn.addEventListener("click", () => {
          const value =
            (nameInput.value || "Khách").trim();

          this.setPlayerName(value || "Khách");

          this.render(tabsRootId, contentRootId);
        });

        nameInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            saveBtn.click();
          }
        });
      }

      if (changeBtn) {
        changeBtn.addEventListener("click", () => {
          this.setPlayerName("");

          this.render(tabsRootId, contentRootId);
        });
      }
    }

    // -------------------------------------------------------
    // WEEKLY MATCH PICKS
    // -------------------------------------------------------

    const weeks = Store.getWeeks();

    const weekTabs =
      document.getElementById("predict-week-tabs");

    const weekList =
      document.getElementById("predict-week-list");

    const renderMatchPicks = (week) => {
      if (!weekTabs || !weekList) return;

      weekTabs
        .querySelectorAll(".week-tab")
        .forEach((button) => {
          button.classList.toggle(
            "is-active",
            Number(button.dataset.week) === Number(week)
          );
        });

      const matches =
        this.getGroupMatchesForWeek(week);

      if (!matches.length) {
        weekList.innerHTML = `
          <div class="empty-state">
            <b>Chưa có trận</b>
            Không có trận nào trong tuần này.
          </div>
        `;

        return;
      }

      weekList.innerHTML = matches
        .map((m) => this.matchPickCardHTML(m))
        .join("");

      weekList
        .querySelectorAll("[data-pick-match]")
        .forEach((button) => {
          button.addEventListener("click", () => {
            const matchId =
              button.dataset.pickMatch;

            const teamId =
              button.dataset.team;

            const match =
              data.matches.find(
                (m) => m.id === matchId
              );

            if (!match) return;

            // Không cho chọn trận đã kết thúc
            if (match.status !== "upcoming") {
              return;
            }

            this.pickMatch(
              matchId,
              teamId
            );

            renderMatchPicks(week);

            this.updateScoreSummary();
          });
        });
    };

    if (weekTabs && weekList) {
      if (weeks.length) {
        weekTabs.innerHTML = weeks
          .map(
            (week) => `
              <button
                class="week-tab"
                data-week="${week}"
                type="button"
              >
                Tuần ${week}
              </button>
            `
          )
          .join("");

        weekTabs
          .querySelectorAll(".week-tab")
          .forEach((button) => {
            button.addEventListener(
              "click",
              () => {
                renderMatchPicks(
                  Number(button.dataset.week)
                );
              }
            );
          });

        // Chọn tuần hiện tại nếu có,
        // nếu không thì lấy tuần đầu tiên.
        const currentWeek =
          data.meta &&
          data.meta.currentWeek
            ? Number(data.meta.currentWeek)
            : weeks[0];

        const defaultWeek =
          weeks.includes(currentWeek)
            ? currentWeek
            : weeks[0];

        renderMatchPicks(defaultWeek);
      } else {
        weekTabs.innerHTML = "";

        weekList.innerHTML = `
          <div class="empty-state">
            <b>Chưa có lịch</b>
            Chưa có trận đấu nào.
          </div>
        `;
      }
    }

    // -------------------------------------------------------
    // SCORE SUMMARY
    // -------------------------------------------------------

    this.updateScoreSummary();

    // -------------------------------------------------------
    // TOP 4
    // -------------------------------------------------------

    this.renderTop4(data);

    // -------------------------------------------------------
    // PLAYOFF BRACKET
    // -------------------------------------------------------

    this.renderBracket(data);
  },

  // =========================================================
  // SCORE SUMMARY
  // =========================================================

  updateScoreSummary() {
    const state = this.getState();

    const scoreEl =
      document.getElementById("predict-score");

    if (!scoreEl) return;

    const score =
      this.scoreMatchPicks();

    const totalPicks =
      Object.keys(state.matchPicks || {}).length;

    scoreEl.innerHTML = `
      <div class="score-banner__stat">
        <b>${score.points}</b>
        <span>Điểm dự đoán</span>
      </div>

      <div class="score-banner__stat">
        <b>${score.correct}/${score.resolved}</b>
        <span>Trận đoán đúng</span>
      </div>

      <div class="score-banner__stat">
        <b>${totalPicks}</b>
        <span>Trận đã chọn</span>
      </div>
    `;
  },

  // =========================================================
  // TOP 4 RENDER
  // =========================================================

  renderTop4(data) {
    const top4El =
      document.getElementById("top4-picker");

    if (!top4El) return;

    const state = this.getState();

    let picks =
      Array.isArray(state.top4Pick)
        ? state.top4Pick.slice(0, 4)
        : [];

    while (picks.length < 4) {
      picks.push("");
    }

    top4El.innerHTML = picks
      .map((value, index) => {
        const options = data.teams
          .map((team) => {
            const selected =
              team.id === value
                ? "selected"
                : "";

            return `
              <option
                value="${this.escapeAttr(team.id)}"
                ${selected}
              >
                ${this.escapeHTML(team.name)}
              </option>
            `;
          })
          .join("");

        return `
          <div
            class="field-row"
            style="margin-bottom:8px"
          >
            <div>
              <label>Hạng ${index + 1}</label>

              <select
                data-rank="${index}"
              >
                <option value="">
                  — Chọn đội —
                </option>

                ${options}
              </select>
            </div>
          </div>
        `;
      })
      .join("");

    top4El
      .querySelectorAll("select")
      .forEach((select) => {
        select.addEventListener("change", () => {
          const selects =
            Array.from(
              top4El.querySelectorAll("select")
            );

          let order =
            selects.map(
              (s) => s.value
            );

          // Không cho chọn cùng một đội
          // nhiều lần.
          const changedIndex =
            Number(select.dataset.rank);

          const changedValue =
            select.value;

          if (
            changedValue &&
            order.filter(
              (id) => id === changedValue
            ).length > 1
          ) {
            order[changedIndex] = "";

            select.value = "";

            alert(
              "Bạn không thể chọn cùng một đội cho nhiều vị trí."
            );
          }

          this.pickTop4(order);
        });
      });
  },

  // =========================================================
  // BRACKET RENDER
  // =========================================================

  renderBracket(data) {
    const bracketEl =
      document.getElementById("predict-bracket");

    if (!bracketEl) return;

    if (
      !data.season ||
      !data.season.format ||
      !data.season.format.playoffEnabled
    ) {
      bracketEl.innerHTML = `
        <div class="empty-state">
          <b>Chưa có playoff</b>
          Ban quản trị chưa bật vòng playoff
          cho mùa giải này.
        </div>
      `;

      return;
    }

    const bracket = data.bracket;

    if (!bracket) {
      bracketEl.innerHTML = `
        <div class="empty-state">
          <b>Chưa có bracket</b>
          Chưa có dữ liệu playoff.
        </div>
      `;

      return;
    }

    const state = this.getState();

    // -------------------------------------------------------
    // SLOT
    // -------------------------------------------------------

    const renderSlot = (bracketMatch, side) => {
      if (!bracketMatch) return "";

      const teamId =
        side === 1
          ? bracketMatch.team1
          : bracketMatch.team2;

      if (!teamId) {
        return `
          <div
            class="bracket-slot is-disabled"
            data-bracket-match="${this.escapeAttr(
              bracketMatch.id
            )}"
            data-team=""
            aria-disabled="true"
          >
            <span class="name">
              TBD
            </span>
          </div>
        `;
      }

      const resolvedTeamId =
        this.resolveSeed(teamId);

      const team =
        this.getBracketTeam(teamId);

      const displayName =
        team
          ? team.short || team.name
          : teamId;

      const picked =
        state.bracketPicks[
          bracketMatch.id
        ] === teamId;

      const hasResolvedTeam =
        !!resolvedTeamId;

      const pickedClass =
        picked
          ? "is-picked"
          : "";

      return `
        <div
          class="bracket-slot ${pickedClass}"
          data-bracket-match="${this.escapeAttr(
            bracketMatch.id
          )}"
          data-team="${this.escapeAttr(teamId)}"
          role="button"
          tabindex="0"
          aria-pressed="${picked}"
        >
          <span class="name">
            ${
              hasResolvedTeam &&
              typeof Render !== "undefined" &&
              Render.teamBadge
                ? Render.teamBadge(
                    resolvedTeamId,
                    "sm"
                  )
                : ""
            }

            ${this.escapeHTML(displayName)}
          </span>
        </div>
      `;
    };

    // -------------------------------------------------------
    // COLUMN
    // -------------------------------------------------------

    const renderColumn = (
      label,
      list
    ) => {
      if (!Array.isArray(list)) {
        list = [];
      }

      return `
        <div class="bracket-col">
          <div class="bracket-col__label">
            ${this.escapeHTML(label)}
          </div>

          ${
            list.length
              ? list
                  .map(
                    (bm) => `
                      <div class="bracket-match">
                        ${renderSlot(bm, 1)}
                        ${renderSlot(bm, 2)}
                      </div>
                    `
                  )
                  .join("")
              : `
                <div class="empty-state">
                  Chưa có dữ liệu
                </div>
              `
          }
        </div>
      `;
    };

    // -------------------------------------------------------
    // HTML
    // -------------------------------------------------------

    bracketEl.innerHTML = `
      <div class="bracket">
        ${renderColumn(
          "Nhánh thắng",
          bracket.upper || []
        )}

        ${renderColumn(
          "Nhánh thua",
          bracket.lower || []
        )}

        ${renderColumn(
          "Chung kết tổng",
          bracket.grandFinal
            ? [bracket.grandFinal]
            : []
        )}
      </div>
    `;

    // -------------------------------------------------------
    // CLICK
    // -------------------------------------------------------

    bracketEl
      .querySelectorAll(
        "[data-bracket-match]"
      )
      .forEach((slot) => {
        const handlePick = () => {
          const matchId =
            slot.dataset.bracketMatch;

          const teamId =
            slot.dataset.team;

          if (!matchId || !teamId) {
            return;
          }

          this.pickBracket(
            matchId,
            teamId
          );

          this.render();
        };

        slot.addEventListener(
          "click",
          handlePick
        );

        slot.addEventListener(
          "keydown",
          (event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              handlePick();
            }
          }
        );
      });
  },

  // =========================================================
  // MATCH CARD
  // =========================================================

  matchPickCardHTML(m) {
    const state = this.getState();

    const t1 =
      Store.getTeam(m.team1);

    const t2 =
      Store.getTeam(m.team2);

    const pick =
      state.matchPicks[m.id];

    const isUpcoming =
      m.status === "upcoming";

    const locked =
      !isUpcoming;

    let resultTag = "";

    // -------------------------------------------------------
    // RESULT
    // -------------------------------------------------------

    if (
      m.status === "finished" &&
      pick &&
      m.score1 !== null &&
      m.score2 !== null
    ) {
      let winner = null;

      if (m.score1 > m.score2) {
        winner = m.team1;
      } else if (m.score2 > m.score1) {
        winner = m.team2;
      }

      if (winner) {
        resultTag =
          pick === winner
            ? `
              <span
                class="predict-result-tag correct"
              >
                Đoán đúng
              </span>
            `
            : `
              <span
                class="predict-result-tag wrong"
              >
                Đoán sai
              </span>
            `;
      }
    }

    // -------------------------------------------------------
    // STATUS
    // -------------------------------------------------------

    let statusHTML = "";

    if (m.status === "finished") {
      statusHTML = `
        <div class="predict-match-status">
          Đã kết thúc
          ${
            m.score1 !== null &&
            m.score2 !== null
              ? ` · ${m.score1} - ${m.score2}`
              : ""
          }
        </div>
      `;
    } else if (m.status === "upcoming") {
      statusHTML = `
        <div class="predict-match-status">
          ${this.formatDate(m.date)}
          ${m.time ? ` · ${this.escapeHTML(m.time)}` : ""}
        </div>
      `;
    } else {
      statusHTML = `
        <div class="predict-match-status">
          ${this.escapeHTML(
            m.status || "Chưa xác định"
          )}
        </div>
      `;
    }

    // -------------------------------------------------------
    // TEAM NAMES
    // -------------------------------------------------------

    const team1Name =
      t1
        ? t1.short || t1.name
        : "TBD";

    const team2Name =
      t2
        ? t2.short || t2.name
        : "TBD";

    // -------------------------------------------------------
    // CARD
    // -------------------------------------------------------

    return `
      <div
        class="predict-card"
        data-match-id="${this.escapeAttr(m.id)}"
      >
        <div class="predict-teams">

          <div class="predict-team">
            ${
              typeof Render !== "undefined" &&
              Render.teamBadge
                ? Render.teamBadge(
                    m.team1,
                    "sm"
                  )
                : ""
            }

            ${this.escapeHTML(team1Name)}
          </div>

          <span
            style="color:var(--text-dim)"
          >
            vs
          </span>

          <div class="predict-team">
            ${
              typeof Render !== "undefined" &&
              Render.teamBadge
                ? Render.teamBadge(
                    m.team2,
                    "sm"
                  )
                : ""
            }

            ${this.escapeHTML(team2Name)}
          </div>

        </div>

        ${statusHTML}

        <div class="predict-choice">

          <button
            class="pick-btn ${
              pick === m.team1
                ? "is-selected"
                : ""
            }"
            data-pick-match="${this.escapeAttr(
              m.id
            )}"
            data-team="${this.escapeAttr(
              m.team1
            )}"
            ${
              locked
                ? "disabled"
                : ""
            }
            type="button"
          >
            ${this.escapeHTML(team1Name)}
          </button>

          <button
            class="pick-btn ${
              pick === m.team2
                ? "is-selected"
                : ""
            }"
            data-pick-match="${this.escapeAttr(
              m.id
            )}"
            data-team="${this.escapeAttr(
              m.team2
            )}"
            ${
              locked
                ? "disabled"
                : ""
            }
            type="button"
          >
            ${this.escapeHTML(team2Name)}
          </button>

        </div>

        ${
          pick && m.status === "upcoming"
            ? `
              <div class="predict-selected">
                Đã chọn:
                <b>
                  ${
                    pick === m.team1
                      ? this.escapeHTML(team1Name)
                      : this.escapeHTML(team2Name)
                  }
                </b>
              </div>
            `
            : ""
        }

        ${resultTag}
      </div>
    `;
  },

  // =========================================================
  // FORMAT DATE
  // =========================================================

  formatDate(date) {
    if (!date) return "";

    const parts =
      String(date).split("-");

    if (parts.length !== 3) {
      return this.escapeHTML(date);
    }

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  },

  // =========================================================
  // ESCAPE HTML
  // =========================================================

  escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  escapeAttr(value) {
    return this.escapeHTML(value);
  },
};
