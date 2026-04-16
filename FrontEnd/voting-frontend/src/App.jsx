import { useState, useCallback } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8080/voter";

// ─── API HELPER ───────────────────────────────────────────────────────────────
async function callAPI(path, method = "GET", body = null, queryParams = null) {
  let url = API_BASE + path;
  if (queryParams) url += "?" + new URLSearchParams(queryParams).toString();
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    return { ok: res.ok, data, status: res.status };
  } catch {
    return {
      ok: false,
      data: "Network error — is Spring Boot running on localhost:8080?",
      status: 0,
    };
  }
}

// ─── RESPONSE BOX ─────────────────────────────────────────────────────────────
// Green box on success, red box on error — renders directly below every form
function ResponseBox({ res }) {
  if (!res) return null;

  const isOk    = res.ok;
  const bg      = isOk ? "#052e16" : "#2d0a0a";
  const border  = isOk ? "#166534" : "#7f1d1d";
  const iconClr = isOk ? "#4ade80" : "#f87171";
  const titleClr= isOk ? "#86efac" : "#fca5a5";
  const bodyClr = isOk ? "#bbf7d0" : "#fecaca";

  let detail = null;
  const d = res.data;

  if (d !== null && d !== undefined && d !== "") {
    if (typeof d === "object") {
      // [names[], ids[]] — candidate list or booth list
      if (Array.isArray(d) && d.length === 2 && Array.isArray(d[0])) {
        detail = (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {d[0].map((name, i) => (
              <span key={i} style={{
                background: isOk ? "#14532d" : "#3b0f0f",
                border: `1px solid ${isOk ? "#166534" : "#7f1d1d"}`,
                borderRadius: 20, padding: "3px 10px",
                fontSize: 12, color: bodyClr,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                #{d[1][i]} {name}
              </span>
            ))}
          </div>
        );
      } else {
        detail = (
          <pre style={{
            marginTop: 8, fontSize: 12, color: bodyClr,
            whiteSpace: "pre-wrap", lineHeight: 1.6,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {JSON.stringify(d, null, 2)}
          </pre>
        );
      }
    } else {
      const str = String(d).trim();
      if (str) {
        detail = (
          <p style={{
            marginTop: 6, fontSize: 13, color: bodyClr,
            fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6,
          }}>
            {str}
          </p>
        );
      }
    }
  }

  return (
    <div style={{
      marginTop: 14, padding: "14px 16px",
      background: bg, border: `1px solid ${border}`,
      borderRadius: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16, color: iconClr }}>
          {isOk ? "✔" : "✖"}
        </span>
        <span style={{
          fontSize: 13, fontWeight: 700, color: titleClr,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {isOk ? "Success" : `Error${res.status ? ` (${res.status})` : ""}`}
        </span>
      </div>
      {detail}
    </div>
  );
}

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{
        fontSize: 11, color: "#6b7280", letterSpacing: "0.07em",
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        background: "#0f0f18",
        border: `1px solid ${focused ? "#6366f1" : "#2d2d42"}`,
        borderRadius: 8, color: "#e2e8f0", padding: "9px 12px",
        fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
        outline: "none", width: "100%", transition: "border-color .15s",
      }}
    />
  );
}

function Btn({ onClick, children, color = "#6366f1", loading = false, disabled = false, small = false }) {
  const off = disabled || loading;
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={off}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: off ? "#1a1a28" : hov ? `${color}33` : `${color}1a`,
        border: `1px solid ${off ? "#2d2d42" : color}`,
        color: off ? "#4b5563" : color,
        padding: small ? "6px 14px" : "9px 20px",
        borderRadius: 8,
        cursor: off ? "not-allowed" : "pointer",
        fontSize: small ? 12 : 13,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600, whiteSpace: "nowrap", transition: "background .15s",
      }}
    >
      {loading ? "⟳ wait…" : children}
    </button>
  );
}

function Card({ children, accent = "#6366f1" }) {
  return (
    <div style={{
      background: "linear-gradient(145deg,#13131e,#0d0d18)",
      border: `1px solid ${accent}28`,
      borderRadius: 14, padding: "22px 26px", marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function SecTitle({ icon, label, color = "#6366f1" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <span style={{ fontSize: 17 }}>{icon}</span>
      <span style={{
        fontSize: 15, fontWeight: 700, color,
        fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.03em",
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(to right,${color}44,transparent)`,
      }} />
    </div>
  );
}

function Chip({ id, name, color = "#6366f1" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: `${color}12`, border: `1px solid ${color}33`,
      borderRadius: 20, padding: "4px 12px", margin: "3px",
    }}>
      <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>
        #{id}
      </span>
      <span style={{ fontSize: 13, color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace" }}>
        {name}
      </span>
    </span>
  );
}

function StatPill({ value, label, color }) {
  return (
    <div style={{
      background: "#0f0f18", border: `1px solid ${color}28`,
      borderRadius: 10, padding: "12px 16px",
      textAlign: "center", minWidth: 80,
    }}>
      <div style={{
        fontSize: 26, fontWeight: 700, color,
        fontFamily: "'JetBrains Mono', monospace", lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>{label}</div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <p style={{
      color: "#4b5563", fontSize: 13,
      fontFamily: "'JetBrains Mono', monospace", margin: 0,
    }}>
      {text}
    </p>
  );
}

function HistoryRow({ leftTop, leftBottom, count, color, highlight }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "#0f0f18", borderRadius: 10, padding: "14px 20px",
      border: highlight ? `1px solid ${color}44` : "1px solid #1a1a2e",
    }}>
      <div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>{leftTop}</div>
        <div style={{ fontSize: 11, color: "#374151" }}>{leftBottom}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{
          fontSize: 38, fontWeight: 700, color,
          lineHeight: 1, fontFamily: "'JetBrains Mono', monospace",
        }}>
          {count}
        </div>
        <div style={{ fontSize: 11, color: "#4b5563" }}>votes</div>
      </div>
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{
      marginTop: 14, padding: "12px 16px",
      background: "#0f0f18", borderRadius: 8,
      fontSize: 12, color: "#4b5563",
      lineHeight: 1.8, fontFamily: "'JetBrains Mono', monospace",
    }}>
      {children}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "register",   label: "Register Voter",   icon: "👤" },
  { id: "candidates", label: "Candidates",        icon: "🏅" },
  { id: "booths",     label: "Poll Booths",       icon: "🏛️" },
  { id: "vote",       label: "Cast Vote",         icon: "🗳️" },
  { id: "tally",      label: "Vote Tally",        icon: "📊" },
  { id: "candcount",  label: "Candidate Count",   icon: "🔢" },
];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function VotingApp() {
  const [tab,  setTab]  = useState("register");
  const [busy, setBusy] = useState({});

  // persistent lists — survive tab switches
  const [voters,           setVoters]           = useState([]);
  const [candidates,       setCandidates]       = useState([]);
  const [booths,           setBooths]           = useState([]);
  const [tallyHistory,     setTallyHistory]     = useState([]);
  const [candCountHistory, setCandCountHistory] = useState([]);

  // inline response state — one per action
  const [res, setRes] = useState({
    voter:     null,
    addCand:   null,
    loadCand:  null,
    addBooth:  null,
    loadBooth: null,
    vote:      null,
    tally:     null,
    candCount: null,
  });

  // form values
  const [voterAddr,      setVoterAddr]      = useState("");
  const [candName,       setCandName]       = useState("");
  const [candId,         setCandId]         = useState("");
  const [boothName,      setBoothName]      = useState("");
  const [boothId,        setBoothId]        = useState("");
  const [votePollId,     setVotePollId]     = useState("");  // for cast vote
  const [voteCandId,     setVoteCandId]     = useState("");  // for cast vote (new!)
  const [tallyId,        setTallyId]        = useState("");
  const [candCountId,    setCandCountId]    = useState("");

  const setLoad = (k, v) => setBusy(b => ({ ...b, [k]: v }));
  const setR    = (k, v) => setRes(r => ({ ...r, [k]: v }));

  // ── REGISTER VOTER ────────────────────────────────────────────────────────
  // POST /voter/add/voter
  // Body: { voterWalletAddress: string }
  const registerVoter = useCallback(async () => {
    if (!voterAddr.trim()) {
      setR("voter", { ok: false, data: "Wallet address cannot be empty.", status: 0 });
      return;
    }
    setLoad("voter", true); setR("voter", null);
    const r = await callAPI("/add/voter", "POST", { voterWalletAddress: voterAddr.trim() });
    setLoad("voter", false);
    setR("voter", r);
    if (r.ok) {
      setVoters(prev => [...prev, voterAddr.trim()]);
      setVoterAddr("");
    }
  }, [voterAddr]);

  // ── ADD CANDIDATE ─────────────────────────────────────────────────────────
  // POST /voter/add/candidate
  // Body: { candidateName: string, candidateId: number }
  const addCandidate = useCallback(async () => {
    if (!candName.trim() || !candId.trim()) {
      setR("addCand", { ok: false, data: "Both candidate name and ID are required.", status: 0 });
      return;
    }
    setLoad("addCand", true); setR("addCand", null);
    const r = await callAPI("/add/candidate", "POST", {
      candidateName: candName.trim(),
      candidateId:   parseInt(candId, 10),
    });
    setLoad("addCand", false);
    setR("addCand", r);
    if (r.ok) {
      setCandidates(prev => [...prev, { name: candName.trim(), id: parseInt(candId, 10) }]);
      setCandName(""); setCandId("");
    }
  }, [candName, candId]);

  // ── LOAD CANDIDATE LIST ───────────────────────────────────────────────────
  // GET /voter/show/candidate-list
  const loadCandidates = useCallback(async () => {
    setLoad("loadCand", true); setR("loadCand", null);
    const r = await callAPI("/show/candidate-list");
    setLoad("loadCand", false);
    setR("loadCand", r);
    if (r.ok && Array.isArray(r.data) && r.data.length === 2) {
      setCandidates(r.data[0].map((name, i) => ({ name, id: r.data[1][i] })));
    }
  }, []);

  // ── ADD POLL BOOTH ────────────────────────────────────────────────────────
  // POST /voter/add/poll/booth
  // Body: { pollName: string, pollId: number }
  const addBooth = useCallback(async () => {
    if (!boothName.trim() || !boothId.trim()) {
      setR("addBooth", { ok: false, data: "Both booth name and ID are required.", status: 0 });
      return;
    }
    setLoad("addBooth", true); setR("addBooth", null);
    const r = await callAPI("/add/poll/booth", "POST", {
      pollName: boothName.trim(),
      pollId:   parseInt(boothId, 10),
    });
    setLoad("addBooth", false);
    setR("addBooth", r);
    if (r.ok) {
      setBooths(prev => [...prev, { name: boothName.trim(), id: parseInt(boothId, 10) }]);
      setBoothName(""); setBoothId("");
    }
  }, [boothName, boothId]);

  // ── LOAD POLL BOOTH LIST ──────────────────────────────────────────────────
  // GET /voter/show/poll-booth
  const loadBooths = useCallback(async () => {
    setLoad("loadBooth", true); setR("loadBooth", null);
    const r = await callAPI("/show/poll-booth");
    setLoad("loadBooth", false);
    setR("loadBooth", r);
    if (r.ok && Array.isArray(r.data) && r.data.length === 2) {
      setBooths(r.data[0].map((name, i) => ({ name, id: r.data[1][i] })));
    }
  }, []);

  // ── CAST VOTE ─────────────────────────────────────────────────────────────
  // POST /voter/do/vote?pollId={id}&candidateId={id}
  // NOTE: controller now requires BOTH pollId AND candidateId
  const castVote = useCallback(async () => {
    if (!votePollId.trim() || !voteCandId.trim()) {
      setR("vote", { ok: false, data: "Both Poll Booth ID and Candidate ID are required.", status: 0 });
      return;
    }
    setLoad("vote", true); setR("vote", null);
    const r = await callAPI("/do/vote", "POST", null, {
      pollId:      votePollId.trim(),
      candidateId: voteCandId.trim(),
    });
    setLoad("vote", false);
    setR("vote", r);
    if (r.ok) {
      setVotePollId("");
      setVoteCandId("");
    }
  }, [votePollId, voteCandId]);

  // ── COUNT VOTES BY POLL BOOTH ─────────────────────────────────────────────
  // GET /voter/count/vote?pollId={id}
  const countVotesByBooth = useCallback(async () => {
    if (!tallyId.trim()) {
      setR("tally", { ok: false, data: "Poll Booth ID cannot be empty.", status: 0 });
      return;
    }
    setLoad("tally", true); setR("tally", null);
    const r = await callAPI("/count/vote", "GET", null, { pollId: tallyId.trim() });
    setLoad("tally", false);
    setR("tally", r);
    if (r.ok) {
      setTallyHistory(prev => [{ id: tallyId.trim(), count: Number(r.data) }, ...prev]);
      setTallyId("");
    }
  }, [tallyId]);

  // ── COUNT VOTES BY CANDIDATE ──────────────────────────────────────────────
  // GET /voter/get/candidate/count?candidateId={id}
  const countVotesByCandidate = useCallback(async () => {
    if (!candCountId.trim()) {
      setR("candCount", { ok: false, data: "Candidate ID cannot be empty.", status: 0 });
      return;
    }
    setLoad("candCount", true); setR("candCount", null);
    const r = await callAPI("/get/candidate/count", "GET", null, { candidateId: candCountId.trim() });
    setLoad("candCount", false);
    setR("candCount", r);
    if (r.ok) {
      setCandCountHistory(prev => [{ id: candCountId.trim(), count: Number(r.data) }, ...prev]);
      setCandCountId("");
    }
  }, [candCountId]);

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "#08080f",
      backgroundImage:
        "radial-gradient(ellipse at 15% 5%, #0e1a33 0%, transparent 50%)," +
        "radial-gradient(ellipse at 85% 90%, #0e1a22 0%, transparent 50%)",
      color: "#e2e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #3d3d5c; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0d0d18; }
        ::-webkit-scrollbar-thumb { background: #2d2d42; border-radius: 4px; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        borderBottom: "1px solid #1a1a2e", padding: "18px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,8,15,.9)", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 24 }}>⛓️</span>
          <div>
            <div style={{
              fontSize: 20, fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#f1f5f9", letterSpacing: "0.04em",
            }}>
              VoteChain
            </div>
            <div style={{ fontSize: 10, color: "#374151", letterSpacing: "0.1em" }}>
              SOLIDITY · SPRING BOOT · REACT
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <StatPill value={voters.length}     label="voters"     color="#22c55e" />
          <StatPill value={candidates.length} label="candidates" color="#f59e0b" />
          <StatPill value={booths.length}     label="booths"     color="#a78bfa" />
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div style={{
        display: "flex", gap: 2, padding: "14px 40px 0",
        borderBottom: "1px solid #1a1a2e", overflowX: "auto",
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background:   tab === t.id ? "#6366f11a" : "transparent",
              border:       "none",
              borderBottom: tab === t.id ? "2px solid #6366f1" : "2px solid transparent",
              color:        tab === t.id ? "#a5b4fc" : "#6b7280",
              padding: "9px 16px", cursor: "pointer",
              fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600, whiteSpace: "nowrap", transition: "all .15s",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── PANELS ── */}
      <div style={{ maxWidth: 780, margin: "28px auto 0", padding: "0 24px" }}>

        {/* TAB: REGISTER VOTER */}
        {tab === "register" && (
          <>
            <Card accent="#22c55e">
              <SecTitle icon="👤" label="Register New Voter" color="#22c55e" />
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Field label="Wallet Address">
                    <TextInput
                      value={voterAddr}
                      onChange={setVoterAddr}
                      placeholder="0xABCDEF1234567890..."
                    />
                  </Field>
                </div>
                <Btn onClick={registerVoter} color="#22c55e" loading={busy.voter}>
                  Register
                </Btn>
              </div>
              <ResponseBox res={res.voter} />
              <InfoBox>
                → <code style={{ color: "#6b7280" }}>POST /voter/add/voter</code>
              </InfoBox>
            </Card>

            <Card accent="#22c55e">
              <SecTitle
                icon="📋"
                label={`Registered This Session (${voters.length})`}
                color="#22c55e"
              />
              {voters.length === 0
                ? <EmptyState text="No voters registered yet." />
                : voters.map((addr, i) => (
                    <Chip
                      key={i}
                      id={i + 1}
                      name={`${addr.slice(0, 14)}…${addr.slice(-6)}`}
                      color="#22c55e"
                    />
                  ))
              }
            </Card>
          </>
        )}

        {/* TAB: CANDIDATES */}
        {tab === "candidates" && (
          <>
            <Card accent="#f59e0b">
              <SecTitle icon="🏅" label="Add Candidate" color="#f59e0b" />
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: 2, minWidth: 160 }}>
                  <Field label="Candidate Name">
                    <TextInput
                      value={candName}
                      onChange={setCandName}
                      placeholder="e.g. Alice Johnson"
                    />
                  </Field>
                </div>
                <div style={{ flex: 1, minWidth: 100 }}>
                  <Field label="Candidate ID">
                    <TextInput
                      value={candId}
                      onChange={setCandId}
                      placeholder="1"
                      type="number"
                    />
                  </Field>
                </div>
                <Btn onClick={addCandidate} color="#f59e0b" loading={busy.addCand}>
                  Add
                </Btn>
              </div>
              <ResponseBox res={res.addCand} />
              <InfoBox>
                → <code style={{ color: "#6b7280" }}>POST /voter/add/candidate</code>
              </InfoBox>
            </Card>

            <Card accent="#f59e0b">
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 16,
              }}>
                <SecTitle
                  icon="📋"
                  label={`Candidate List (${candidates.length})`}
                  color="#f59e0b"
                />
                <Btn onClick={loadCandidates} color="#f59e0b" loading={busy.loadCand} small>
                  ↻ Sync from chain
                </Btn>
              </div>
              {candidates.length === 0
                ? <EmptyState text="No candidates yet. Add one above or sync from chain." />
                : candidates.map((c, i) => (
                    <Chip key={i} id={c.id} name={c.name} color="#f59e0b" />
                  ))
              }
              <ResponseBox res={res.loadCand} />
            </Card>
          </>
        )}

        {/* TAB: POLL BOOTHS */}
        {tab === "booths" && (
          <>
            <Card accent="#a78bfa">
              <SecTitle icon="🏛️" label="Create Poll Booth" color="#a78bfa" />
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: 2, minWidth: 160 }}>
                  <Field label="Booth Name">
                    <TextInput
                      value={boothName}
                      onChange={setBoothName}
                      placeholder="e.g. District 5"
                    />
                  </Field>
                </div>
                <div style={{ flex: 1, minWidth: 100 }}>
                  <Field label="Booth ID">
                    <TextInput
                      value={boothId}
                      onChange={setBoothId}
                      placeholder="101"
                      type="number"
                    />
                  </Field>
                </div>
                <Btn onClick={addBooth} color="#a78bfa" loading={busy.addBooth}>
                  Create
                </Btn>
              </div>
              <ResponseBox res={res.addBooth} />
              <InfoBox>
                → <code style={{ color: "#6b7280" }}>POST /voter/add/poll/booth</code>
              </InfoBox>
            </Card>

            <Card accent="#a78bfa">
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 16,
              }}>
                <SecTitle
                  icon="📋"
                  label={`Active Poll Booths (${booths.length})`}
                  color="#a78bfa"
                />
                <Btn onClick={loadBooths} color="#a78bfa" loading={busy.loadBooth} small>
                  ↻ Sync from chain
                </Btn>
              </div>
              {booths.length === 0
                ? <EmptyState text="No booths yet. Create one above or sync from chain." />
                : booths.map((b, i) => (
                    <Chip key={i} id={b.id} name={b.name} color="#a78bfa" />
                  ))
              }
              <ResponseBox res={res.loadBooth} />
            </Card>
          </>
        )}

        {/* TAB: CAST VOTE */}
        {tab === "vote" && (
          <Card accent="#f43f5e">
            <SecTitle icon="🗳️" label="Cast Your Vote" color="#f43f5e" />

            {/* TWO fields: pollId + candidateId (both required by controller) */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140 }}>
                <Field label="Poll Booth ID">
                  <TextInput
                    value={votePollId}
                    onChange={setVotePollId}
                    placeholder="e.g. 101"
                    type="number"
                  />
                </Field>
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <Field label="Candidate ID">
                  <TextInput
                    value={voteCandId}
                    onChange={setVoteCandId}
                    placeholder="e.g. 1"
                    type="number"
                  />
                </Field>
              </div>
              <Btn onClick={castVote} color="#f43f5e" loading={busy.vote}>
                Cast Vote
              </Btn>
            </div>

            <ResponseBox res={res.vote} />

            <InfoBox>
              ⚠ Voter wallet must be registered first.<br />
              ⚠ Each wallet can only vote once per booth.<br />
              → <code style={{ color: "#6b7280" }}>
                POST /voter/do/vote?pollId=&#123;id&#125;&amp;candidateId=&#123;id&#125;
              </code>
            </InfoBox>
          </Card>
        )}

        {/* TAB: VOTE TALLY (by poll booth) */}
        {tab === "tally" && (
          <>
            <Card accent="#3b82f6">
              <SecTitle icon="📊" label="Count Votes by Poll Booth" color="#3b82f6" />
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Field label="Poll Booth ID">
                    <TextInput
                      value={tallyId}
                      onChange={setTallyId}
                      placeholder="Enter booth ID"
                      type="number"
                    />
                  </Field>
                </div>
                <Btn onClick={countVotesByBooth} color="#3b82f6" loading={busy.tally}>
                  Count
                </Btn>
              </div>
              <ResponseBox res={res.tally} />
              <InfoBox>
                → <code style={{ color: "#6b7280" }}>GET /voter/count/vote?pollId=&#123;id&#125;</code>
              </InfoBox>
            </Card>

            {tallyHistory.length > 0 && (
              <Card accent="#3b82f6">
                <SecTitle icon="🏆" label="Booth Count History" color="#3b82f6" />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {tallyHistory.map((t, i) => (
                    <HistoryRow
                      key={i}
                      leftTop={`POLL BOOTH #${t.id}`}
                      leftBottom={i === 0 ? "latest query" : `query #${tallyHistory.length - i}`}
                      count={t.count}
                      color="#3b82f6"
                      highlight={i === 0}
                    />
                  ))}
                </div>
              </Card>
            )}

            {tallyHistory.length === 0 && (
              <Card accent="#3b82f6">
                <EmptyState text="No tallies yet. Enter a booth ID above and click Count." />
              </Card>
            )}
          </>
        )}

        {/* TAB: CANDIDATE COUNT */}
        {tab === "candcount" && (
          <>
            <Card accent="#06b6d4">
              <SecTitle icon="🔢" label="Count Votes by Candidate" color="#06b6d4" />
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Field label="Candidate ID">
                    <TextInput
                      value={candCountId}
                      onChange={setCandCountId}
                      placeholder="Enter candidate ID"
                      type="number"
                    />
                  </Field>
                </div>
                <Btn onClick={countVotesByCandidate} color="#06b6d4" loading={busy.candCount}>
                  Get Count
                </Btn>
              </div>
              <ResponseBox res={res.candCount} />
              <InfoBox>
                → <code style={{ color: "#6b7280" }}>
                  GET /voter/get/candidate/count?candidateId=&#123;id&#125;
                </code>
              </InfoBox>
            </Card>

            {candCountHistory.length > 0 && (
              <Card accent="#06b6d4">
                <SecTitle icon="📈" label="Candidate Count History" color="#06b6d4" />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {candCountHistory.map((c, i) => (
                    <HistoryRow
                      key={i}
                      leftTop={`CANDIDATE #${c.id}`}
                      leftBottom={i === 0 ? "latest query" : `query #${candCountHistory.length - i}`}
                      count={c.count}
                      color="#06b6d4"
                      highlight={i === 0}
                    />
                  ))}
                </div>
              </Card>
            )}

            {candCountHistory.length === 0 && (
              <Card accent="#06b6d4">
                <EmptyState text="No results yet. Enter a candidate ID above and click Get Count." />
              </Card>
            )}
          </>
        )}

      </div>{/* end panels */}

      {/* ── FOOTER ── */}
      <div style={{
        textAlign: "center", margin: "48px 0 0",
        borderTop: "1px solid #1a1a2e", padding: "24px 0",
        fontSize: 11, color: "#1f2937", letterSpacing: "0.1em",
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        VOTECHAIN · SOLIDITY + SPRING BOOT + REACT
      </div>

    </div>
  );
}