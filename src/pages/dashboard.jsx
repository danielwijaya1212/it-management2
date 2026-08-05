import React, { useState, useEffect } from "react";

/* ============================================================
   ICONS — inline SVG
   ============================================================ */
const Icon = ({ children, size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const IconHome = (p) => <Icon {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></Icon>;
const IconTicket = (p) => <Icon {...p}><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z" /><path d="M10 6v12" strokeDasharray="2 3" /></Icon>;
const IconServer = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><circle cx="7" cy="7.5" r="0.6" fill="currentColor" /><circle cx="7" cy="16.5" r="0.6" fill="currentColor" /></Icon>;
const IconUsers = (p) => <Icon {...p}><circle cx="9" cy="8" r="3" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17.5" cy="9" r="2.3" /><path d="M15 20a5.2 5.2 0 0 1 7-4.9" /></Icon>;
const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.7 7.7 0 0 0-1.7-1L15 3h-4l-.4 2a7.7 7.7 0 0 0-1.7 1l-2.3-.9-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9c.5.4 1.1.8 1.7 1l.4 2h4l.4-2c.6-.2 1.2-.6 1.7-1l2.3.9 2-3.4Z" /></Icon>;
const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Icon>;
const IconBell = (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></Icon>;
const IconChevron = (p) => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>;
const IconLaptop = (p) => <Icon {...p}><rect x="4" y="4" width="16" height="10" rx="1.2" /><path d="M2 18h20l-1.5-3H3.5Z" /></Icon>;
const IconNetwork = (p) => <Icon {...p}><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v5m0 0-6 5m6-5 6 5" /></Icon>;
const IconLicense = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M7 9h6M7 12h10M7 15h4" /></Icon>;
const IconArrowUp = (p) => <Icon {...p}><path d="M12 19V5m0 0-6 6m6-6 6 6" /></Icon>;
const IconArrowDown = (p) => <Icon {...p}><path d="M12 5v14m0 0 6-6m-6 6-6-6" /></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="m5 13 4 4L19 7" /></Icon>;
const IconAlert = (p) => <Icon {...p}><path d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></Icon>;
const IconArrowRight = (p) => <Icon {...p}><path d="M5 12h14m0 0-5-5m5 5-5 5" /></Icon>;

/* ============================================================
   DESIGN TOKENS — konsisten dengan Users.jsx
   ============================================================ */
const TONE = {
  accent: { text: "text-[#3E63DD]", bg: "bg-[#EEF2FF]", bar: "bg-[#3E63DD]", border: "border-[#3E63DD]" },
  success: { text: "text-[#16A34A]", bg: "bg-[#ECFDF3]", bar: "bg-[#16A34A]", border: "border-[#16A34A]" },
  warning: { text: "text-[#B45309]", bg: "bg-[#FFFAEB]", bar: "bg-[#D97706]", border: "border-[#D97706]" },
  danger: { text: "text-[#DC2626]", bg: "bg-[#FEF3F2]", bar: "bg-[#DC2626]", border: "border-[#DC2626]" },
  neutral: { text: "text-slate-500", bg: "bg-slate-100", bar: "bg-slate-400", border: "border-slate-300" },
};

const AVATAR_PALETTE = ["#3E63DD", "#0F766E", "#B45309", "#7C3AED", "#DB2777", "#0891B2"];
function avatarColor(name) {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

/* ============================================================
   MOCK DATA — ganti dengan data dari API tim Anda nanti
   ============================================================ */
const TICKETS = [
  { id: "TCK-2417", title: "VPN tidak bisa konek dari luar kantor", requester: "Dinda A.", priority: "Tinggi", status: "Sedang Dikerjakan", assignee: "Bagas", time: "12m" },
  { id: "TCK-2416", title: "Printer lantai 3 macet terus", requester: "Reza P.", priority: "Sedang", status: "Menunggu", assignee: null, time: "34m" },
  { id: "TCK-2415", title: "Akses folder shared drive ditolak", requester: "Yuni S.", priority: "Rendah", status: "Sedang Dikerjakan", assignee: "Wahyu", time: "1j" },
  { id: "TCK-2414", title: "Laptop baru perlu instalasi software", requester: "Fajar H.", priority: "Rendah", status: "Selesai", assignee: "Bagas", time: "2j" },
  { id: "TCK-2413", title: "Email masuk ke spam terus-menerus", requester: "Citra D.", priority: "Tinggi", status: "Menunggu", assignee: null, time: "3j" },
  { id: "TCK-2412", title: "Monitor eksternal tidak terdeteksi", requester: "Agus W.", priority: "Sedang", status: "Selesai", assignee: "Wahyu", time: "5j" },
];

const SERVICES = [
  { name: "Server Aplikasi Utama", host: "app-01.internal", status: "online", uptime: "99.98%" },
  { name: "Database Produksi", host: "db-prod-01.internal", status: "online", uptime: "99.95%" },
  { name: "File Server", host: "fs-02.internal", status: "degraded", uptime: "97.10%" },
  { name: "Mail Server", host: "mail-01.internal", status: "online", uptime: "99.99%" },
  { name: "Backup Server", host: "backup-01.internal", status: "offline", uptime: "—" },
];

const ASSETS = [
  { label: "Laptop & PC", count: 186, icon: IconLaptop, max: 200 },
  { label: "Server", count: 14, icon: IconServer, max: 20 },
  { label: "Perangkat Jaringan", count: 32, icon: IconNetwork, max: 40 },
  { label: "Lisensi Software", count: 94, icon: IconLicense, max: 120 },
];

const ACTIVITY = [
  { who: "Bagas", action: "menyelesaikan", target: "TCK-2414", time: "8 menit lalu", tone: "success", icon: IconCheck },
  { who: "Sistem", action: "mendeteksi degradasi pada", target: "fs-02.internal", time: "22 menit lalu", tone: "warning", icon: IconAlert },
  { who: "Wahyu", action: "mengambil alih", target: "TCK-2415", time: "41 menit lalu", tone: "accent", icon: IconArrowRight },
  { who: "Dinda A.", action: "membuka tiket baru", target: "TCK-2417", time: "1 jam lalu", tone: "neutral", icon: IconTicket },
];

const NAV = [
  { label: "Ringkasan", icon: IconHome, active: true },
  { label: "Tiket", icon: IconTicket },
  { label: "Server & Aset", icon: IconServer },
  { label: "Tim", icon: IconUsers },
  { label: "Pengaturan", icon: IconSettings },
];

// data 7-hari terakhir untuk sparkline KPI — mock
const TICKET_TREND = [24, 27, 22, 25, 20, 21, 18];
const RESPONSE_TREND = [50, 55, 58, 62, 66, 70, 72]; // menit

function priorityTone(p) {
  if (p === "Tinggi") return "danger";
  if (p === "Sedang") return "warning";
  return "neutral";
}
function statusTone(s) {
  if (s === "Selesai") return "success";
  if (s === "Sedang Dikerjakan") return "accent";
  return "neutral";
}
function serviceTone(s) {
  if (s === "online") return "success";
  if (s === "degraded") return "warning";
  return "danger";
}

/* ============================================================
   SPARKLINE — mini chart SVG murni, tanpa library
   ============================================================ */
function Sparkline({ data, color, height = 32, width = 92 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const path = `M${points.join(" L")}`;
  const areaPath = `${path} L${width},${height} L0,${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${color.replace("#", "")})`} stroke="none" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1].split(",")[0]} cy={points[points.length - 1].split(",")[1]} r="2.3" fill={color} />
    </svg>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const onlineCount = SERVICES.filter((s) => s.status === "online").length;

  return (
    <div className="flex min-h-screen w-full bg-[#F5F7FA] text-[#101828] font-[Inter]">
      {/* SIDEBAR */}
      <aside
        className={`flex flex-shrink-0 flex-col border-r border-[#E4E8EE] bg-white p-3.5 transition-all duration-200 ${
          collapsed ? "w-[76px]" : "w-60"
        }`}
      >
        <div className="flex items-center gap-2.5 px-2 pb-5 pt-1.5">
          <span className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-[9px] bg-[#3E63DD] font-[Space_Grotesk] text-[13px] font-bold text-white">
            IT
          </span>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <strong className="font-[Space_Grotesk] text-[15px] tracking-tight">IT-OPS</strong>
              <span className="text-[11.5px] text-[#98A2B3]">Internal Console</span>
            </div>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 rounded-[9px] px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors ${
                item.active
                  ? "bg-[#EEF2FF] font-semibold text-[#3E63DD]"
                  : "text-[#667085] hover:bg-[#FBFCFD] hover:text-[#101828]"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-2 rounded-[9px] border border-[#E4E8EE] bg-[#FBFCFD] px-3 py-2 text-[12.5px] text-[#667085] hover:text-[#101828]"
        >
          <IconChevron size={16} className={collapsed ? "-rotate-90" : "rotate-90"} />
          {!collapsed && <span>Ciutkan</span>}
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* TOPBAR */}
        <header className="flex items-center justify-between gap-5 border-b border-[#E4E8EE] bg-white px-7 py-4">
          <div className="flex w-full max-w-[380px] items-center gap-2 rounded-[9px] border border-[#E4E8EE] bg-[#FBFCFD] px-3 py-2 text-[#98A2B3]">
            <IconSearch size={16} />
            <input
              placeholder="Cari tiket, server, atau perangkat…"
              className="w-full bg-transparent text-[13.5px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
            />
          </div>

          <div className="flex flex-shrink-0 items-center gap-4.5">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#E4E8EE] bg-[#FBFCFD] text-[#667085]">
              <IconBell size={18} />
              <span className="absolute -right-1 -top-1 rounded-full bg-[#DC2626] px-1.5 text-[10px] font-semibold leading-[1.4] text-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101828] font-[Space_Grotesk] text-[12px] font-semibold text-white">
                RA
              </div>
              <div className="flex flex-col leading-tight">
                <strong className="text-[13px]">Raka Adiwijaya</strong>
                <span className="text-[11.5px] text-[#98A2B3]">IT Support Lead</span>
              </div>
            </div>
          </div>
        </header>

        {/* HEARTBEAT STRIP */}
        <div className="flex items-center gap-2.5 border-b border-[#E4E8EE] bg-[#FBFCFD] px-7 py-2.5 text-[12px] text-[#667085]">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]" />
          </span>
          <span className="text-[11.5px] font-semibold tracking-wide text-[#101828]">SEMUA SISTEM TERPANTAU</span>
          <span className="h-3 w-px bg-[#E4E8EE]" />
          <span className="font-[JetBrains_Mono] text-[11.5px]">
            {onlineCount}/{SERVICES.length} layanan online
          </span>
          <span className="h-3 w-px bg-[#E4E8EE]" />
          <span className="font-[JetBrains_Mono] text-[11.5px]">
            terakhir dicek {now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <div className="flex flex-col gap-5 px-7 pb-10 pt-6">
          {/* KPI ROW — dengan sparkline, bukan angka statis */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label="Tiket Terbuka"
              value="18"
              trend="-4"
              trendGood
              tone="accent"
              spark={<Sparkline data={TICKET_TREND} color="#3E63DD" />}
            />
            <KpiCard label="Server Online" value={`${onlineCount}/${SERVICES.length}`} sub="99.6% uptime rata-rata" tone="success" />
            <KpiCard
              label="Rata-rata Respons"
              value="1j 12m"
              trend="+8m"
              tone="warning"
              spark={<Sparkline data={RESPONSE_TREND} color="#D97706" />}
            />
            <KpiCard label="Menunggu Persetujuan" value="5" sub="akses & pengadaan" tone="neutral" />
          </section>

          {/* TICKETS + SERVICES */}
          <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[2.1fr_1fr]">
            <div className="rounded-[14px] border border-[#E4E8EE] bg-white p-5">
              <div className="mb-3.5 flex items-baseline justify-between">
                <h2 className="font-[Space_Grotesk] text-[16px] font-semibold">Antrean Tiket</h2>
                <button className="flex items-center gap-1 text-[12.5px] font-semibold text-[#3E63DD]">
                  Lihat semua <IconArrowRight size={13} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-[13px]">
                  <thead>
                    <tr>
                      {["ID", "Judul", "Pemohon", "Prioritas", "Status", "PIC", ""].map((h) => (
                        <th
                          key={h}
                          className="border-b border-[#E4E8EE] px-2.5 pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-[#98A2B3]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TICKETS.map((t) => (
                      <tr key={t.id} className="border-b border-[#E4E8EE] transition-colors last:border-none hover:bg-[#FBFCFD]">
                        <td className="px-2.5 py-2.5 font-[JetBrains_Mono] text-[#667085]">{t.id}</td>
                        <td className="max-w-[220px] px-2.5 py-2.5">{t.title}</td>
                        <td className="px-2.5 py-2.5">{t.requester}</td>
                        <td className="px-2.5 py-2.5"><Pill tone={priorityTone(t.priority)}>{t.priority}</Pill></td>
                        <td className="px-2.5 py-2.5"><Pill tone={statusTone(t.status)}>{t.status}</Pill></td>
                        <td className="px-2.5 py-2.5">
                          {t.assignee ? (
                            <div className="flex items-center gap-2">
                              <span
                                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold text-white"
                                style={{ backgroundColor: avatarColor(t.assignee) }}
                              >
                                {t.assignee.charAt(0)}
                              </span>
                              <span className="text-[12.5px]">{t.assignee}</span>
                            </div>
                          ) : (
                            <span className="text-[12px] italic text-[#98A2B3]">belum ditugaskan</span>
                          )}
                        </td>
                        <td className="px-2.5 py-2.5 font-[JetBrains_Mono] text-[12px] text-[#98A2B3]">{t.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#E4E8EE] bg-white p-5">
              <div className="mb-3.5">
                <h2 className="font-[Space_Grotesk] text-[16px] font-semibold">Status Layanan</h2>
              </div>
              <ul className="flex flex-col">
                {SERVICES.map((s) => (
                  <li key={s.host} className="flex items-center gap-2.5 border-b border-[#E4E8EE] py-2.5 last:border-none last:pb-0">
                    <span className="relative flex h-2 w-2 flex-shrink-0">
                      {s.status === "online" && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-50 motion-reduce:animate-none" />
                      )}
                      <span className={`relative inline-flex h-2 w-2 rounded-full ${TONE[serviceTone(s.status)].bar}`} />
                    </span>
                    <div className={`flex min-w-0 flex-1 flex-col leading-snug ${s.status === "offline" ? "opacity-50" : ""}`}>
                      <strong className="text-[12.5px] font-semibold">{s.name}</strong>
                      <span className="truncate font-[JetBrains_Mono] text-[11px] text-[#98A2B3]">{s.host}</span>
                    </div>
                    <span className="flex-shrink-0 font-[JetBrains_Mono] text-[11.5px] text-[#667085]">{s.uptime}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ASSETS + ACTIVITY */}
          <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[1.3fr_1fr]">
            <div className="rounded-[14px] border border-[#E4E8EE] bg-white p-5">
              <div className="mb-4">
                <h2 className="font-[Space_Grotesk] text-[16px] font-semibold">Ringkasan Aset</h2>
                <span className="text-[12px] text-[#98A2B3]">Total unit terdaftar per kategori</span>
              </div>
              <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                {ASSETS.map((a) => (
                  <div className="flex items-start gap-3" key={a.label}>
                    <div className="flex h-8.5 w-8.5 flex-shrink-0 items-center justify-center rounded-[9px] bg-[#EEF2FF] text-[#3E63DD]">
                      <a.icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex justify-between text-[12.5px]">
                        <span className="text-[#667085]">{a.label}</span>
                        <strong className="font-[JetBrains_Mono]">{a.count}</strong>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full border border-[#E4E8EE] bg-[#FBFCFD]">
                        <div className="h-full rounded-full bg-[#3E63DD]" style={{ width: `${(a.count / a.max) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[14px] border border-[#E4E8EE] bg-white p-5">
              <div className="mb-3.5">
                <h2 className="font-[Space_Grotesk] text-[16px] font-semibold">Aktivitas Terbaru</h2>
              </div>
              <ul className="flex flex-col">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="flex gap-3 border-b border-[#E4E8EE] py-2.5 last:border-none last:pb-0">
                    <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${TONE[a.tone].bg} ${TONE[a.tone].text}`}>
                      <a.icon size={13} />
                    </span>
                    <div className="min-w-0 flex-1 text-[12.5px] leading-snug">
                      <span className="font-semibold">{a.who}</span>{" "}
                      <span className="text-[#667085]">{a.action}</span>{" "}
                      <span className="font-[JetBrains_Mono] text-[12px] text-[#3E63DD]">{a.target}</span>
                      <div className="text-[11px] text-[#98A2B3]">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */
function KpiCard({ label, value, sub, trend, trendGood, tone, spark }) {
  const t = TONE[tone];
  return (
    <div className={`flex flex-col gap-2 rounded-[14px] border border-[#E4E8EE] border-t-[3px] bg-white p-4.5 ${t.border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-[12.5px] font-medium text-[#667085]">{label}</span>
          <div className="flex items-baseline gap-2.5">
            <strong className="font-[JetBrains_Mono] text-[26px] font-semibold tracking-tight">{value}</strong>
            {trend && (
              <span className={`inline-flex items-center gap-0.5 text-[12px] font-semibold ${trendGood ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                {trend.startsWith("-") ? <IconArrowDown size={12} /> : <IconArrowUp size={12} />}
                {trend}
              </span>
            )}
          </div>
        </div>
        {spark && <div className="flex-shrink-0 pt-1">{spark}</div>}
      </div>
      {sub && <span className="text-[12px] text-[#98A2B3]">{sub}</span>}
    </div>
  );
}

function Pill({ children, tone = "neutral" }) {
  const t = TONE[tone];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${t.text} ${t.bg}`}>
      {children}
    </span>
  );
}