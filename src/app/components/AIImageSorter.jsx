import { useState, useRef, useCallback } from "react";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-flash-1.5"; // Vision-capable, fast & affordable on OpenRouter

const CATEGORIES = [
  { id: "infrastructure", label: "Infrastructure", icon: "🏗️", color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE", desc: "Roads, buildings, construction damage" },
  { id: "sanitation", label: "Sanitation", icon: "🗑️", color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0", desc: "Waste, drainage, cleanliness" },
  { id: "safety", label: "Safety Hazard", icon: "⚠️", color: "#92400E", bg: "#FFFBEB", border: "#FDE68A", desc: "Unsafe conditions, accidents risk" },
  { id: "facilities", label: "Facilities", icon: "🏛️", color: "#5B21B6", bg: "#F5F3FF", border: "#DDD6FE", desc: "Classrooms, labs, washrooms" },
  { id: "greenery", label: "Greenery", icon: "🌿", color: "#14532D", bg: "#F0FDF4", border: "#BBF7D0", desc: "Parks, trees, landscaping" },
  { id: "electrical", label: "Electrical", icon: "⚡", color: "#78350F", bg: "#FFF7ED", border: "#FED7AA", desc: "Lighting, wiring, power issues" },
  { id: "vandalism", label: "Vandalism", icon: "🖊️", color: "#9F1239", bg: "#FFF1F2", border: "#FECDD3", desc: "Graffiti, property damage" },
  { id: "other", label: "Other", icon: "📋", color: "#374151", bg: "#F9FAFB", border: "#E5E7EB", desc: "Uncategorized issues" },
];

const PRIORITY_CONFIG = {
  critical: { label: "Critical", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
  high: { label: "High", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  medium: { label: "Medium", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
  low: { label: "Low", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function analyzeImageWithOpenRouter(base64Image, apiKey, mimeType = "image/jpeg") {
  const prompt = `You are an AI assistant for a Campus Problem Solver system. Analyze this campus issue image and return ONLY a JSON object with these exact fields:
{
  "category": one of ["infrastructure","sanitation","safety","facilities","greenery","electrical","vandalism","other"],
  "priority": one of ["critical","high","medium","low"],
  "title": "short issue title (max 8 words)",
  "description": "brief description of the problem (max 30 words)",
  "location_hint": "likely campus location type (e.g. parking lot, corridor, lab, etc.)",
  "confidence": number between 0 and 100,
  "tags": array of 2-4 relevant keyword strings
}
Return only valid JSON, no markdown, no explanation.`;

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Campus Problem Solver",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } },
            { type: "text", text: prompt },
          ],
        },
      ],
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

function Badge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 8px",
      borderRadius: 99, border: `1px solid ${cfg.border}`,
      background: cfg.bg, color: cfg.color, textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}>
      {cfg.label}
    </span>
  );
}

function CategoryPill({ category }) {
  const cat = CATEGORIES.find(c => c.id === category) || CATEGORIES[CATEGORIES.length - 1];
  return (
    <span style={{
      fontSize: 12, fontWeight: 500, padding: "3px 10px",
      borderRadius: 99, border: `1px solid ${cat.border}`,
      background: cat.bg, color: cat.color,
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      <span style={{ fontSize: 13 }}>{cat.icon}</span> {cat.label}
    </span>
  );
}

function IssueCard({ issue, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12,
      overflow: "hidden", transition: "box-shadow 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ position: "relative" }}>
        <img src={issue.previewUrl} alt="Issue" style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6 }}>
          <Badge priority={issue.analysis?.priority || "medium"} />
        </div>
        <button onClick={() => onRemove(issue.id)} style={{
          position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.5)",
          border: "none", borderRadius: 99, width: 24, height: 24, cursor: "pointer",
          color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>
        {issue.analyzing && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <div style={{ width: 28, height: 28, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>Analyzing…</span>
          </div>
        )}
        {issue.error && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(220,38,38,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 500, padding: "0 12px", textAlign: "center" }}>⚠️ {issue.error}</span>
          </div>
        )}
      </div>

      {issue.analysis && (
        <div style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#111827", lineHeight: 1.4 }}>
              {issue.analysis.title}
            </p>
            <CategoryPill category={issue.analysis.category} />
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
            {issue.analysis.description}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {issue.analysis.location_hint && (
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>📍 {issue.analysis.location_hint}</span>
            )}
            <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: "auto" }}>
              {issue.analysis.confidence}% confident
            </span>
          </div>
          {expanded && issue.analysis.tags?.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
              {issue.analysis.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, padding: "2px 7px", borderRadius: 4,
                  background: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB",
                }}>#{tag}</span>
              ))}
            </div>
          )}
          <button onClick={() => setExpanded(e => !e)} style={{
            marginTop: 8, background: "none", border: "none", cursor: "pointer",
            fontSize: 11, color: "#6B7280", padding: 0, textDecoration: "underline",
          }}>
            {expanded ? "Show less" : "Show tags"}
          </button>
        </div>
      )}
    </div>
  );
}

function StatsBar({ issues }) {
  const analyzed = issues.filter(i => i.analysis);
  const counts = CATEGORIES.map(cat => ({
    ...cat, count: analyzed.filter(i => i.analysis?.category === cat.id).length,
  })).filter(c => c.count > 0);
  const priorities = Object.entries(PRIORITY_CONFIG).map(([k, v]) => ({
    ...v, id: k, count: analyzed.filter(i => i.analysis?.priority === k).length,
  })).filter(c => c.count > 0);

  if (analyzed.length === 0) return null;

  return (
    <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>By Category</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {counts.map(cat => (
              <span key={cat.id} style={{
                fontSize: 12, padding: "3px 9px", borderRadius: 99,
                background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`, fontWeight: 500,
              }}>
                {cat.icon} {cat.label} <strong>{cat.count}</strong>
              </span>
            ))}
          </div>
        </div>
        <div>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>By Priority</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {priorities.map(p => (
              <span key={p.id} style={{
                fontSize: 12, padding: "3px 9px", borderRadius: 99,
                background: p.bg, color: p.color, border: `1px solid ${p.border}`, fontWeight: 500,
              }}>
                {p.label} <strong>{p.count}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIImageSorter() {
  const [apiKey, setApiKey] = useState("");
  const [apiKeySet, setApiKeySet] = useState(false);
  const [issues, setIssues] = useState([]);
  const [filterCat, setFilterCat] = useState("all");
  const [filterPri, setFilterPri] = useState("all");
  const [sortBy, setSortBy] = useState("added");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();
  const idRef = useRef(0);

  const processFiles = useCallback(async (files) => {
    if (!apiKeySet) return;
    const newIssues = Array.from(files).filter(f => f.type.startsWith("image/")).map(f => ({
      id: ++idRef.current,
      file: f,
      previewUrl: URL.createObjectURL(f),
      analyzing: true,
      analysis: null,
      error: null,
    }));
    if (!newIssues.length) return;

    setIssues(prev => [...prev, ...newIssues]);

    for (const issue of newIssues) {
      try {
        const base64 = await fileToBase64(issue.file);
        const analysis = await analyzeImageWithOpenRouter(base64, apiKey, issue.file.type);
        setIssues(prev => prev.map(i => i.id === issue.id ? { ...i, analyzing: false, analysis } : i));
      } catch (err) {
        const msg = err.message?.includes("401") ? "Invalid API key" :
          err.message?.includes("429") ? "Rate limited" :
          err.message?.slice(0, 40) || "Analysis failed";
        setIssues(prev => prev.map(i => i.id === issue.id ? { ...i, analyzing: false, error: msg } : i));
      }
    }
  }, [apiKey, apiKeySet]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const filtered = issues
    .filter(i => filterCat === "all" || i.analysis?.category === filterCat)
    .filter(i => filterPri === "all" || i.analysis?.priority === filterPri)
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = ["critical", "high", "medium", "low"];
        return order.indexOf(a.analysis?.priority) - order.indexOf(b.analysis?.priority);
      }
      if (sortBy === "category") return (a.analysis?.category || "").localeCompare(b.analysis?.category || "");
      if (sortBy === "confidence") return (b.analysis?.confidence || 0) - (a.analysis?.confidence || 0);
      return b.id - a.id;
    });

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>
          AI Issue Sorter
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "#6B7280" }}>
          Upload campus issue photos — AI auto-categorizes, prioritizes, and tags them instantly.
        </p>
      </div>

      {!apiKeySet ? (
        <div style={{
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14,
          padding: "28px 24px", marginBottom: 24,
        }}>
          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15, color: "#111827" }}>Connect OpenRouter API</p>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6B7280" }}>
            Get your key at <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" style={{ color: "#2563EB" }}>openrouter.ai/keys</a>. Uses <strong>google/gemini-flash-1.5</strong> for vision analysis.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="password"
              placeholder="sk-or-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && apiKey.trim() && setApiKeySet(true)}
              style={{
                flex: 1, padding: "10px 14px", fontSize: 14, border: "1px solid #D1D5DB",
                borderRadius: 8, outline: "none", fontFamily: "monospace",
              }}
            />
            <button
              onClick={() => apiKey.trim() && setApiKeySet(true)}
              disabled={!apiKey.trim()}
              style={{
                padding: "10px 20px", background: "#111827", color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer",
                opacity: apiKey.trim() ? 1 : 0.4,
              }}
            >
              Connect
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 10,
          padding: "10px 16px", marginBottom: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 13, color: "#065F46", fontWeight: 500 }}>✓ OpenRouter connected — ready to analyze images</span>
          <button onClick={() => { setApiKeySet(false); setApiKey(""); setIssues([]); }} style={{
            background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#6B7280", textDecoration: "underline",
          }}>Disconnect</button>
        </div>
      )}

      {apiKeySet && (
        <>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? "#2563EB" : "#D1D5DB"}`,
              borderRadius: 14, padding: "36px 24px", textAlign: "center",
              background: dragging ? "#EFF6FF" : "#FAFAFA",
              cursor: "pointer", transition: "all 0.15s", marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>🖼️</div>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15, color: "#374151" }}>
              Drop campus issue photos here
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>
              or click to browse — supports JPG, PNG, WEBP
            </p>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }}
              onChange={e => processFiles(e.target.files)} />
          </div>

          {issues.length > 0 && (
            <>
              <StatsBar issues={issues} />

              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
                <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{
                  padding: "7px 12px", fontSize: 13, border: "1px solid #D1D5DB",
                  borderRadius: 8, background: "#fff", cursor: "pointer",
                }}>
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>

                <select value={filterPri} onChange={e => setFilterPri(e.target.value)} style={{
                  padding: "7px 12px", fontSize: 13, border: "1px solid #D1D5DB",
                  borderRadius: 8, background: "#fff", cursor: "pointer",
                }}>
                  <option value="all">All Priorities</option>
                  {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>

                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                  padding: "7px 12px", fontSize: 13, border: "1px solid #D1D5DB",
                  borderRadius: 8, background: "#fff", cursor: "pointer",
                }}>
                  <option value="added">Sort: Newest first</option>
                  <option value="priority">Sort: Priority</option>
                  <option value="category">Sort: Category</option>
                  <option value="confidence">Sort: Confidence</option>
                </select>

                <span style={{ marginLeft: "auto", fontSize: 13, color: "#9CA3AF" }}>
                  {filtered.length} of {issues.length} issues
                </span>

                <button onClick={() => {
                  issues.forEach(i => URL.revokeObjectURL(i.previewUrl));
                  setIssues([]);
                }} style={{
                  padding: "7px 14px", fontSize: 13, border: "1px solid #FCA5A5",
                  borderRadius: 8, background: "#FEF2F2", color: "#DC2626", cursor: "pointer", fontWeight: 500,
                }}>Clear all</button>
              </div>

              {filtered.length === 0 ? (
                <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 14, padding: "40px 0" }}>
                  No issues match current filters.
                </p>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 16,
                }}>
                  {filtered.map(issue => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onRemove={id => {
                        const item = issues.find(i => i.id === id);
                        if (item) URL.revokeObjectURL(item.previewUrl);
                        setIssues(prev => prev.filter(i => i.id !== id));
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
