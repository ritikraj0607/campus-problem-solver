import { useState } from "react";
import { Link } from "react-router";
import { GraduationCap, Shield, ArrowLeft } from "lucide-react";

type Role = "student" | "admin";

const LOAD_MS = 2600;

const STUDENT_DEPTS = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "MBA",
  "Other",
];

const ADMIN_DEPTS = [
  "Housekeeping Dept",
  "Student Welfare Office",
  "Mess Committee",
  "Academic Affairs Office",
  "Maintenance Dept",
  "Security Office",
  "Admin Office (Super Admin)",
];

function portalHref(file: string) {
  const base = import.meta.env.BASE_URL || "/";
  const path = `${base}${file}`.replace(/\/{2,}/g, "/");
  return path.startsWith("/") ? path : `/${path}`;
}

function persistStudent(email: string, displayName: string) {
  sessionStorage.setItem("campusai_auth", "1");
  sessionStorage.setItem("campusai_role", "student");
  sessionStorage.setItem("campusai_display", displayName);
  sessionStorage.setItem("campusai_email", email);
}

function persistAdmin(email: string, displayName: string, dept: string) {
  sessionStorage.setItem("campusai_auth", "1");
  sessionStorage.setItem("campusai_role", "admin");
  sessionStorage.setItem("campusai_display", displayName);
  sessionStorage.setItem("campusai_email", email);
  sessionStorage.setItem("campusai_admin_dept", dept);
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default function AuthPage() {
  const [role, setRole] = useState<Role>("student");
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState(false);
  const [busyMessage, setBusyMessage] = useState("");

  const [studentLoginEmail, setStudentLoginEmail] = useState("student@college.edu");
  const [studentLoginPass, setStudentLoginPass] = useState("pass123");
  const [signupName, setSignupName] = useState("");
  const [signupRoll, setSignupRoll] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupDept, setSignupDept] = useState(STUDENT_DEPTS[0]);
  const [signupPass, setSignupPass] = useState("");

  const [adminEmail, setAdminEmail] = useState("admin@college.edu");
  const [adminDept, setAdminDept] = useState(ADMIN_DEPTS[0]);
  const [adminPass, setAdminPass] = useState("admin123");
  const [adminSignupName, setAdminSignupName] = useState("");
  const [adminSignupEmail, setAdminSignupEmail] = useState("");
  const [adminSignupDept, setAdminSignupDept] = useState(ADMIN_DEPTS[0]);
  const [adminSignupPass, setAdminSignupPass] = useState("");

  const studentAccent = role === "student";
  const grad = studentAccent
    ? "from-violet-600 to-fuchsia-500"
    : "from-amber-600 to-orange-500";

  const submitStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentLoginEmail.trim() || !studentLoginPass) {
      alert("Please fill all fields");
      return;
    }
    const derived =
      studentLoginEmail.split("@")[0]?.replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
      "Student";
    setBusy(true);
    setBusyMessage("Signing you in…");
    await delay(LOAD_MS);
    persistStudent(studentLoginEmail.trim(), derived);
    window.location.href = portalHref("student-portal.html");
  };

  const submitStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim()) {
      alert("Please fill required fields");
      return;
    }
    setBusy(true);
    setBusyMessage("Creating your account…");
    await delay(LOAD_MS);
    persistStudent(signupEmail.trim(), signupName.trim());
    window.location.href = portalHref("student-portal.html");
  };

  const submitAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPass) {
      alert("Please fill all fields");
      return;
    }
    const derived =
      adminEmail.split("@")[0]?.replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Admin";
    setBusy(true);
    setBusyMessage("Opening admin portal…");
    await delay(LOAD_MS);
    persistAdmin(adminEmail.trim(), derived, adminDept);
    window.location.href = portalHref("admin-portal.html");
  };

  const submitAdminSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminSignupName.trim() || !adminSignupEmail.trim()) {
      alert("Please fill required fields");
      return;
    }
    setBusy(true);
    setBusyMessage("Setting up admin access…");
    await delay(LOAD_MS);
    persistAdmin(adminSignupEmail.trim(), adminSignupName.trim(), adminSignupDept);
    window.location.href = portalHref("admin-portal.html");
  };

  const spinBorder = studentAccent ? "border-violet-500/30 border-t-violet-400" : "border-amber-500/30 border-t-amber-400";

  return (
    <div className="min-h-screen bg-[#07090f] text-slate-100 flex flex-col items-center justify-center px-4 py-10 relative overflow-x-hidden text-lg">
      {busy && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#07090f]/95 backdrop-blur-md px-6"
          role="status"
          aria-live="polite"
        >
          <div
            className={`mb-8 h-16 w-16 rounded-full border-[5px] ${spinBorder} animate-spin`}
            aria-hidden
          />
          <p className="text-center text-2xl font-semibold text-white max-w-md leading-snug">{busyMessage}</p>
          <p className="mt-4 text-slate-400 text-base">This may take a few seconds</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[80px] opacity-15 ${studentAccent ? "bg-violet-600" : "bg-amber-600"}`}
        />
        <div
          className={`absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-[80px] opacity-15 ${studentAccent ? "bg-fuchsia-500" : "bg-violet-700"}`}
        />
      </div>

      <Link
        to="/"
        className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 text-base text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to home
      </Link>

      <div className="relative z-[1] w-full max-w-lg">
        <div className="text-center mb-8">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-3xl shadow-lg shadow-violet-900/40`}
          >
            {studentAccent ? "🎒" : "⚙️"}
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r ${grad} bg-clip-text text-transparent`}>
            CampusAI
          </h1>
          <p className="text-slate-400 text-lg mt-2">Sign in to open your portal</p>
        </div>

        <div className="flex rounded-xl bg-[#111827] p-1.5 mb-6 border border-slate-700/80">
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setRole("student");
              setTab("login");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-base font-medium transition-all ${
              role === "student"
                ? "bg-violet-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Student
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setRole("admin");
              setTab("login");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-base font-medium transition-all ${
              role === "admin"
                ? "bg-amber-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Shield className="w-5 h-5" />
            Admin
          </button>
        </div>

        <div
          className={`rounded-3xl border p-8 md:p-10 backdrop-blur-xl ${
            studentAccent
              ? "border-violet-500/25 bg-[#0d1117]/95"
              : "border-amber-500/25 bg-[#0d1117]/95"
          }`}
        >
          {role === "student" && (
            <>
              <div className="flex rounded-xl bg-[#111827] p-1.5 mb-6">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setTab("login")}
                  className={`flex-1 py-3 rounded-lg text-base font-medium ${
                    tab === "login" ? "bg-violet-600 text-white" : "text-slate-400"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setTab("signup")}
                  className={`flex-1 py-3 rounded-lg text-base font-medium ${
                    tab === "signup" ? "bg-violet-600 text-white" : "text-slate-400"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {tab === "login" ? (
                <form onSubmit={submitStudentLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={studentLoginEmail}
                      onChange={(e) => setStudentLoginEmail(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
                      placeholder="student@college.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={studentLoginPass}
                      onChange={(e) => setStudentLoginPass(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className={`w-full rounded-xl bg-gradient-to-r ${grad} py-4 text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50`}
                  >
                    Sign In →
                  </button>
                  <p className="text-center text-sm text-violet-300/90 bg-violet-500/10 border border-violet-500/20 rounded-lg py-3 px-2">
                    Demo: any email and password works
                  </p>
                </form>
              ) : (
                <form onSubmit={submitStudentSignup} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 disabled:opacity-50"
                      placeholder="Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      value={signupRoll}
                      onChange={(e) => setSignupRoll(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 disabled:opacity-50"
                      placeholder="21CS1001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 disabled:opacity-50"
                      placeholder="roll@college.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Department
                    </label>
                    <select
                      value={signupDept}
                      onChange={(e) => setSignupDept(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 disabled:opacity-50"
                    >
                      {STUDENT_DEPTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={signupPass}
                      onChange={(e) => setSignupPass(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-violet-500 disabled:opacity-50"
                      placeholder="Create password"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className={`w-full rounded-xl bg-gradient-to-r ${grad} py-4 text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50`}
                  >
                    Create Account →
                  </button>
                </form>
              )}
            </>
          )}

          {role === "admin" && (
            <>
              <div className="flex rounded-xl bg-[#111827] p-1.5 mb-6">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setTab("login")}
                  className={`flex-1 py-3 rounded-lg text-base font-medium ${
                    tab === "login" ? "bg-amber-600 text-white" : "text-slate-400"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setTab("signup")}
                  className={`flex-1 py-3 rounded-lg text-base font-medium ${
                    tab === "signup" ? "bg-amber-600 text-white" : "text-slate-400"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {tab === "login" ? (
                <form onSubmit={submitAdminLogin} className="space-y-5">
                  <p className="text-base text-slate-400 mb-1">Authorized personnel only</p>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Department
                    </label>
                    <select
                      value={adminDept}
                      onChange={(e) => setAdminDept(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 disabled:opacity-50"
                    >
                      {ADMIN_DEPTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 py-4 text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    Sign In as Admin →
                  </button>
                  <p className="text-center text-sm text-amber-200/80 bg-amber-500/10 border border-amber-500/20 rounded-lg py-3 px-2">
                    Demo: any email and password — pick your department above
                  </p>
                </form>
              ) : (
                <form onSubmit={submitAdminSignup} className="space-y-5">
                  <p className="text-base text-slate-400 mb-1">Request access (demo — instant approval)</p>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={adminSignupName}
                      onChange={(e) => setAdminSignupName(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 disabled:opacity-50"
                      placeholder="Priya Nair"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={adminSignupEmail}
                      onChange={(e) => setAdminSignupEmail(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 disabled:opacity-50"
                      placeholder="admin@college.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Department
                    </label>
                    <select
                      value={adminSignupDept}
                      onChange={(e) => setAdminSignupDept(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 disabled:opacity-50"
                    >
                      {ADMIN_DEPTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={adminSignupPass}
                      onChange={(e) => setAdminSignupPass(e.target.value)}
                      disabled={busy}
                      className="w-full rounded-lg border border-slate-600 bg-[#111827] px-4 py-3.5 text-base outline-none focus:border-amber-500 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 py-4 text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    Create Admin Account →
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
