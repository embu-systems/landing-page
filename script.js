(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tile = (h) => `oklch(0.6 0.11 ${h})`;

  // ---------- Static data (from EMBU v4.dc.html) ----------
  const TONE = ["#2E2C29", "#34312D", "#2A2B2D", "#302D2B", "#2B2D2A", "#312F2C", "#2D2B2E"];
  const BASE = [
    ["Aziza Nurmatova", "Tashkent", "Interview", "Today"],
    ["Daniel Brooks", "Berlin", "Screening", "Today"],
    ["Rustam Ergashev", "Samarkand", "Offer", "Yesterday"],
    ["Leyla Hasanova", "Baku", "Screening", "2d ago"],
    ["Oliver Grant", "London", "Interview", "3d ago"],
    ["Sardor Tursunov", "Tashkent", "Screening", "4d ago"]
  ];
  const POOL = [
    ["Kamila Rashidova", "Tashkent"], ["Marco Rossi", "Milan"], ["Emma Lindqvist", "Stockholm"],
    ["Bekzod Umarov", "Namangan"], ["Yuki Tanaka", "Osaka"], ["Aigerim Sadykova", "Almaty"], ["Lucas Moreau", "Lyon"]
  ];
  const CLIENTS = [
    ["Alex Karimov", "Premium", "Active", 12, "Push Day", "Chest · Shoulders · 45 min"],
    ["Diana Sattarova", "Premium", "Active", 8, "Mobility", "Hips · Core · 30 min"],
    ["Malika Yusupova", "Standard", "Expired", 0, "Rest day", "Plan renewal needed"],
    ["Jasur Rakhimov", "Standard", "Active", 5, "Leg Day", "Squat · Deadlift · 60 min"],
    ["Timur Aliev", "Premium", "Active", 15, "Pull Day", "Back · Biceps · 50 min"]
  ];
  const FEATURED = [
    { letter: "F", title: "Frontend Developer", place: "Tashkent · Remote", pay: "$2,000 – 3,000", tile: tile(255) },
    { letter: "P", title: "Product Designer", place: "Dubai · Hybrid", pay: "$1,800 – 2,600", tile: tile(300) },
    { letter: "B", title: "Backend Engineer", place: "Warsaw · Remote", pay: "$2,400 – 3,600", tile: tile(280) },
    { letter: "U", title: "UX Researcher", place: "Remote · Contract", pay: "$1,500 – 2,200", tile: tile(40) },
    { letter: "M", title: "Mobile Engineer", place: "Istanbul · Remote", pay: "$2,200 – 3,200", tile: tile(160) }
  ];
  const JOBS = [
    { letter: "F", title: "Flutter Developer", place: "Remote · Full-time", pay: "$1,500 – 2,500", tile: tile(255) },
    { letter: "B", title: "Backend Engineer", place: "Tashkent · Full-time", pay: "$2,000 – 3,500", tile: tile(280) },
    { letter: "Q", title: "QA Engineer", place: "Remote · Contract", pay: "$1,200 – 1,800", tile: tile(40) },
    { letter: "D", title: "DevOps Engineer", place: "Almaty · Full-time", pay: "$2,500 – 3,800", tile: tile(160) },
    { letter: "A", title: "Android Developer", place: "Remote · Full-time", pay: "$1,800 – 2,800", tile: tile(200) }
  ];
  const TYPES = ["Web app", "Mobile app", "Backend", "AI & automation", "Not sure yet"];
  const TIMES = ["As soon as possible", "1–3 months", "Later this year"];

  const G = "#6E6C68", W = "#EFECE6", K = "#BFB5A8";
  const PROJECTS = [
    { key: "paylane", kind: "web", name: "Paylane", desc: "B2B payouts platform", tags: ["Web", "Backend"], year: "2026", hue: 255, url: "app.paylane.io",
      nav: ["Overview", "Payouts", "Invoices", "Vendors"], screen: "Payouts",
      rows: [{ a: "Northwind LLC", b: "$12,400.00", c: "Paid" }, { a: "Kora Studio", b: "$3,180.00", c: "Pending" }, { a: "Atlas Freight", b: "$27,950.00", c: "Paid" }, { a: "Mira Foods", b: "$1,240.00", c: "Review" }],
      summary: "A payouts platform that lets finance teams pay hundreds of vendors in one run.",
      challenge: "Payments were exported from spreadsheets and uploaded to three different banks by hand. Every run took a full day and errors were caught only after money had moved.",
      solution: "We designed a single payout workflow with approvals, bank routing and reconciliation built in, backed by an event-driven ledger that makes every transaction traceable.",
      built: ["Web app for finance teams", "Approval and roles system", "Bank integrations and reconciliation", "Audit-ready ledger service"],
      stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"] },
    { key: "medly", kind: "mobile", name: "Medly", desc: "Clinic booking app", tags: ["Mobile", "Backend"], year: "2025", hue: 20,
      cardLabel: "Next visit", card: "Dr. Kamila Aziz", cardSub: "Dentist · Tomorrow, 10:30",
      rows: [{ a: "Book a visit", b: "→" }, { a: "Prescriptions", b: "2" }, { a: "Test results", b: "New" }],
      summary: "A patient app that turns phone-queue booking into a two-tap experience.",
      challenge: "A network of private clinics took every booking by phone. Patients waited on hold, and doctors' schedules were managed in a paper book.",
      solution: "We built iOS and Android apps for patients, a scheduling panel for clinic staff, and a backend that keeps availability in sync across branches in real time.",
      built: ["iOS and Android apps", "Clinic scheduling panel", "Reminders and notifications", "Branch availability service"],
      stack: ["React Native", "TypeScript", "Go", "PostgreSQL", "Firebase"] },
    { key: "lexa", kind: "ai", name: "Lexa", desc: "AI contract assistant", tags: ["AI", "Web"], year: "2026", hue: 300, file: "supply-agreement.pdf",
      ask: "Is there anything risky in this supply agreement?",
      answer: "Two clauses need attention. The liability cap in 7.2 excludes data breaches, and 11.4 allows termination without notice.",
      chips: ["Clause 7.2", "Clause 11.4", "Suggest edits"],
      summary: "An assistant that reads contracts and points legal teams to what actually matters.",
      challenge: "A legal team reviewed hundreds of similar contracts a month, reading every page to find the same handful of risky clauses.",
      solution: "We built a review tool that extracts clauses, compares them to the company's own playbook and explains deviations in plain language, with every answer linked to its source.",
      built: ["Contract review web app", "Clause extraction pipeline", "Playbook comparison engine", "Private, audited model access"],
      stack: ["React", "Python", "FastAPI", "PostgreSQL", "Claude API"] },
    { key: "cargoflow", kind: "web", name: "Cargoflow", desc: "Logistics operations platform", tags: ["Web", "Backend"], year: "2025", hue: 160, url: "ops.cargoflow.com",
      nav: ["Shipments", "Fleet", "Drivers", "Reports"], screen: "Shipments",
      rows: [{ a: "TSH → IST", b: "Truck 14", c: "In transit" }, { a: "ALA → TSH", b: "Truck 03", c: "Loading" }, { a: "IST → BER", b: "Truck 22", c: "Delivered" }, { a: "TSH → DXB", b: "Air 07", c: "Customs" }],
      summary: "One place to plan, track and invoice cross-border freight.",
      challenge: "Dispatchers tracked shipments across messengers, calls and spreadsheets. Customers had no visibility until a truck arrived.",
      solution: "We built an operations platform with live shipment tracking, a driver app and a customer portal, all powered by one shared data model.",
      built: ["Dispatcher web platform", "Driver mobile app", "Customer tracking portal", "Invoicing and documents"],
      stack: ["Vue", "Kotlin", "Node.js", "PostgreSQL", "Google Cloud"] },
    { key: "orda", kind: "mobile", name: "Orda", desc: "Restaurant ordering & POS", tags: ["Mobile", "Web"], year: "2024", hue: 70,
      cardLabel: "Table 12", card: "4 items", cardSub: "Sent to kitchen · 2 min ago",
      rows: [{ a: "Plov", b: "$9.00" }, { a: "Lagman", b: "$8.50" }, { a: "Green tea", b: "$3.00" }],
      summary: "Ordering, kitchen and payments for busy restaurants, on any device.",
      challenge: "Waiters wrote orders on paper, the kitchen lost tickets at peak hours, and the owner saw the day's numbers only after closing.",
      solution: "We built a tablet POS for waiters, a kitchen display and an owner dashboard that share one real-time order stream.",
      built: ["Tablet POS app", "Kitchen display system", "Owner web dashboard", "Payments integration"],
      stack: ["Flutter", "Dart", "NestJS", "PostgreSQL", "Redis"] },
    { key: "gridline", kind: "api", name: "Gridline API", desc: "Real-estate data API", tags: ["Backend", "AI"], year: "2025", hue: 200,
      path: "/v1/listings?city=tashkent&rooms=2",
      code: [
        { t: "{", c: G }, { t: "  \"data\": [", c: G },
        { t: "    { \"id\": \"lst_8f21\",", c: W }, { t: "      \"price\": 64000,", c: K },
        { t: "      \"area_m2\": 58,", c: K }, { t: "      \"district\": \"Yunusabad\" },", c: W },
        { t: "  ],", c: G }, { t: "  \"next\": \"cur_2a9c\"", c: W }, { t: "}", c: G }
      ],
      summary: "A clean, documented API over messy real-estate listings data.",
      challenge: "Listings came from dozens of sources with duplicates, missing fields and inconsistent prices, so partners couldn't build on top of them.",
      solution: "We built an ingestion pipeline that de-duplicates and normalises listings, and a versioned public API with keys, rate limits and documentation.",
      built: ["Ingestion and normalisation pipeline", "Duplicate detection model", "Public REST API", "Developer portal and docs"],
      stack: ["Go", "Python", "PostgreSQL", "Kubernetes", "AWS"] }
  ];
  const FEATURED_CASES = {
    leaderfit: { name: "Leader Fit", year: "2025", tags: ["Web", "Mobile", "Backend"],
      summary: "A fitness management ecosystem connecting gym owners, trainers and members.",
      challenge: "A growing gym network ran memberships, attendance and payments through separate tools. Members had no app, and owners had no single view of the business.",
      solution: "We built one ecosystem: a management dashboard for staff, a mobile app for members and a backend that keeps plans, visits and payments in sync.",
      built: ["Management web dashboard", "iOS and Android member app", "Subscriptions and payments", "Attendance and check-in service"],
      stack: ["React", "TypeScript", "Flutter", "Node.js", "PostgreSQL"] },
    ish: { name: "ISH", year: "2025", tags: ["Mobile", "Backend", "Infrastructure"],
      summary: "A job marketplace that connects companies with candidates across borders.",
      challenge: "Hiring for remote and international roles was scattered across channels, with no reliable way for employers to manage candidates.",
      solution: "We built mobile apps for job seekers, a web workspace for employers and scalable infrastructure for search, matching and messaging.",
      built: ["iOS and Android apps", "Employer web workspace", "Search and matching service", "Messaging and notifications"],
      stack: ["Swift", "Kotlin", "Go", "Elasticsearch", "Kubernetes"] }
  };
  const SVC_NAMES = [
    ["Product Engineering", "From idea to scalable software products."],
    ["Web Development", "Fast, modern web applications."],
    ["Mobile Development", "High-quality mobile products for iOS and Android."],
    ["Backend & Infrastructure", "Reliable APIs, systems and infrastructure."],
    ["AI & Automation", "Practical AI integrations and workflow automation."]
  ];
  const SVC = [
    { long: "We take a product from a rough idea to a scalable release: scope, architecture, design and engineering under one team.", get: ["Product discovery and scope", "UX and interface design", "Architecture and roadmap", "Launch and iteration"], stack: ["Figma", "TypeScript", "Node.js", "PostgreSQL"] },
    { long: "Web applications that are fast, accessible and easy to extend — from customer portals to internal tools.", get: ["Customer-facing web apps", "Admin panels and internal tools", "Design systems", "Performance and SEO"], stack: ["React", "Next.js", "Vue", "TypeScript"] },
    { long: "Native-quality apps for iOS and Android, built to feel right on every device and ready for the app stores.", get: ["iOS and Android apps", "Offline and sync", "Payments and notifications", "App Store release"], stack: ["Swift", "Kotlin", "Flutter", "React Native"] },
    { long: "The systems behind the product: APIs, data, integrations and infrastructure that stay reliable as you grow.", get: ["APIs and integrations", "Data modelling", "Cloud infrastructure", "Monitoring and security"], stack: ["Go", "Node.js", "PostgreSQL", "AWS", "Kubernetes"] },
    { long: "AI where it genuinely helps: assistants, document processing and automation connected to your real data.", get: ["AI assistants and copilots", "Document and data extraction", "Workflow automation", "Evaluation and safety"], stack: ["Python", "Claude API", "OpenAI", "Vector search"] }
  ];
  const STEPS = [
    { name: "Discovery", time: "1–2 weeks", desc: "We learn your business, users and constraints, then agree on what to build first and what success looks like.", out: ["Product scope", "Technical plan", "Fixed estimate"] },
    { name: "Design", time: "2–4 weeks", desc: "Flows and interfaces are designed and tested with real users before a line of production code is written.", out: ["User flows", "Interface design", "Clickable prototype"] },
    { name: "Build", time: "6–16 weeks", desc: "We build in short cycles with a working release every two weeks, so you see progress, not reports.", out: ["Bi-weekly releases", "Staging environment", "Weekly demos"] },
    { name: "Launch & grow", time: "Ongoing", desc: "We launch, monitor and keep improving — or hand everything over to your team with full documentation.", out: ["Production release", "Monitoring", "Documentation"] }
  ];
  const MODELS = [
    { label: "Fixed scope", name: "Launch an MVP", desc: "For founders and teams who need a first version in users' hands.", points: ["8–12 weeks", "Discovery, design and build", "Fixed estimate after discovery"], types: ["Web app", "Mobile app"] },
    { label: "Dedicated team", name: "Build a product team", desc: "Engineers, a designer and a product lead working as your team.", points: ["Monthly engagement", "Scales up or down", "Weekly demos and planning"], types: ["Web app", "Backend"] },
    { label: "Partnership", name: "Scale and support", desc: "For live products that need new features, stability and care.", points: ["Ongoing roadmap work", "Monitoring and support", "Performance and security"], types: ["Backend"] }
  ];
  const QUOTES = [
    { text: "EMBU took our idea from a spreadsheet to a platform our trainers use every day. Calm, precise and always a step ahead.", who: "Founder", org: "Leader Fit" },
    { text: "They think like product people and ship like engineers. Our launch went out on time, with no drama.", who: "CEO", org: "ISH" },
    { text: "What stood out was the clarity. Every week we knew exactly what was built, what was next and why.", who: "Head of Operations", org: "Cargoflow" }
  ];
  const FAQS = [
    { q: "How much does a project cost?", a: "Every project starts with a short discovery phase. After it, you get a clear scope and a fixed estimate — no open-ended billing." },
    { q: "How long does it take to launch?", a: "A focused MVP usually takes 8–12 weeks. Larger platforms are released in stages, so you can start using them early." },
    { q: "Do you work with international clients?", a: "Yes. We work remotely with clients across time zones, in English, Russian and Uzbek." },
    { q: "Who owns the code?", a: "You do. Source code, documentation and infrastructure access are yours from day one." },
    { q: "What happens after launch?", a: "We stay on for support, monitoring and new features — or hand over to your in-house team with full documentation." }
  ];

  // ---------- State ----------
  const state = {
    feed: BASE.map((r, i) => ({ id: i, name: r[0], city: r[1], stage: r[2], date: r[3], fresh: false })),
    added: 0, pulse: false, stage: "All",
    sel: 0, visits: CLIENTS.map((c) => c[3]), checked: {},
    query: "", jobFilter: "All", saved: {},
    hover: -1, svc: 0, proj: null, pfilter: "All", step: 0, quote: 0, faq: 0,
    types: [], time: null, email: "", sent: false, tried: false, active: ""
  };

  const initials = (name) => name.split(" ").map((w) => w[0]).join("");

  // ---------- Nav / active section ----------
  function renderNav() {
    document.querySelectorAll("#mainNav a").forEach((a) => {
      a.classList.toggle("active", a.dataset.nav === state.active);
    });
  }

  // ---------- Hero: laptop tilt ----------
  const heroSection = document.querySelector(".hero");
  const laptop = $("laptop");
  heroSection.addEventListener("mousemove", (e) => {
    const r = heroSection.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    laptop.style.transform = `rotateY(${(-x * 7).toFixed(2)}deg) rotateX(${(y * 5).toFixed(2)}deg)`;
  });
  heroSection.addEventListener("mouseleave", () => { laptop.style.transform = ""; });

  // ---------- ISH nav (hero laptop) ----------
  function renderIshNav() {
    const items = ["Overview", "Jobs", "Candidates", "Messages", "Company", "Settings"];
    $("ishNav").innerHTML = items.map((l) => {
      const active = l === "Candidates";
      return `<div class="nav-item" style="color:${active ? "#EFECE6" : "#8E8B85"};background:${active ? "#1E1D1B" : "transparent"}">${esc(l)}</div>`;
    }).join("");
  }

  // ---------- Candidate feed ----------
  function renderFeed() {
    const counts = { All: 128 + state.added, New: state.added, Screening: 34, Interview: 12, Offer: 3 };
    const stages = ["All", "New", "Screening", "Interview", "Offer"].filter((x) => x !== "New" || state.added > 0);
    $("stageChips").innerHTML = stages.map((l) => `
      <button class="stage-chip${state.stage === l ? " active" : ""}" data-stage="${esc(l)}">${esc(l)} ${counts[l]}</button>
    `).join("");

    const feed = state.feed.filter((c) => state.stage === "All" || c.stage === state.stage);
    $("feedEmpty").hidden = feed.length !== 0;
    $("feedRows").innerHTML = feed.map((c) => {
      const stageColor = c.stage === "New" ? "#BFB5A8" : c.stage === "Offer" ? "#EFECE6" : c.stage === "Interview" ? "#D9D6D0" : "#8E8B85";
      return `
        <div class="feed-row${c.fresh ? " fresh" : ""}">
          <div class="feed-avatar" style="background:${TONE[c.id % TONE.length]}">${esc(initials(c.name))}</div>
          <div style="min-width:0"><div class="feed-name">${esc(c.name)}</div><div class="feed-city">${esc(c.city)}</div></div>
          <div class="feed-stage" style="color:${stageColor}">${esc(c.stage)}</div>
          <div class="feed-date">${esc(c.date)}</div>
        </div>`;
    }).join("");

    $("liveDot").classList.toggle("pulse", state.pulse);
  }
  $("stageChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-stage]");
    if (!btn) return;
    state.stage = btn.dataset.stage;
    renderFeed();
  });

  function addCandidate() {
    const p = POOL[state.added % POOL.length];
    const id = 100 + state.added;
    const aged = state.feed.map((c) => (c.date === "Just now" ? { ...c, date: "1m ago" } : c));
    state.feed = [{ id, name: p[0], city: p[1], stage: "New", date: "Just now", fresh: true }, ...aged].slice(0, 6);
    state.added += 1;
    state.pulse = true;
    renderFeed();
    setTimeout(() => {
      state.pulse = false;
      state.feed = state.feed.map((c) => ({ ...c, fresh: false }));
      renderFeed();
    }, 1600);
  }

  // ---------- Marquee ----------
  function renderMarquee() {
    const names = ["Leader Fit", "ISH", ...PROJECTS.map((p) => p.name)];
    const doubled = [...names, ...names];
    $("marqueeTrack").innerHTML = doubled.map((m) => `<span class="marquee-item">${esc(m)}</span>`).join("");
  }

  // ---------- Leader Fit dashboard ----------
  function renderLeaderFit() {
    $("lfNav").innerHTML = ["Dashboard", "Clients", "Subscriptions", "Attendance", "Payments", "Trainers", "Settings"].map((l) => {
      const active = l === "Clients";
      return `<div class="item" style="color:${active ? "#F4F3F0" : "#A9A6A0"};background:${active ? "#2A2927" : "transparent"}">${esc(l)}</div>`;
    }).join("");

    $("lfClients").innerHTML = CLIENTS.map((r, i) => {
      const tones = ["#E4DED5", "#DCDFE2", "#E2DCD8", "#DDE1DA", "#E0DDD8"];
      const checkedIn = !!state.checked[i];
      const sub = checkedIn ? "Checked in · just now" : `${r[1]} plan`;
      const subColor = checkedIn ? "#3E6B45" : "#9A9892";
      const statusBg = r[2] === "Active" ? "#E6EFE6" : "#F1E6E3";
      const statusColor = r[2] === "Active" ? "#3E6B45" : "#8A4B3F";
      return `
        <div class="lf-client-row${i === state.sel ? " selected" : ""}" data-client="${i}">
          <div class="lf-avatar" style="background:${tones[i]}">${esc(initials(r[0]))}</div>
          <div style="min-width:0"><div class="lf-client-name">${esc(r[0])}</div><div class="lf-client-sub" style="color:${subColor}">${esc(sub)}</div></div>
          <div><span class="lf-status" style="background:${statusBg};color:${statusColor}">${esc(r[2])}</span></div>
          <div class="lf-visits">${state.visits[i]} visits</div>
        </div>`;
    }).join("");

    const c = CLIENTS[state.sel];
    const expired = c[2] === "Expired";
    const checked = state.checked[state.sel];
    $("lfFirst").textContent = c[0].split(" ")[0];
    $("lfPlan").textContent = `${c[1]} plan`;
    $("lfHeadline").textContent = expired ? "Plan expired" : `${state.visits[state.sel]} visits left`;
    $("lfNote").textContent = expired ? "Renew to keep training" : checked ? "Checked in · synced just now" : "Renews Oct 14";
    $("lfPlanCard").style.background = expired ? "#2A1F1C" : "#2A2621";
    const btn = $("lfActionBtn");
    btn.textContent = expired ? "Renew plan" : checked ? "Checked in" : "Check in";
    btn.style.background = checked ? "#3A3530" : "#EFECE6";
    btn.style.color = checked ? "#EFECE6" : "#111110";
    $("lfWorkout").textContent = c[4];
    $("lfWorkoutNote").textContent = c[5];
  }
  $("lfClients").addEventListener("click", (e) => {
    const row = e.target.closest("[data-client]");
    if (!row) return;
    state.sel = Number(row.dataset.client);
    renderLeaderFit();
  });
  $("lfActionBtn").addEventListener("click", () => {
    const expired = CLIENTS[state.sel][2] === "Expired";
    if (expired || state.checked[state.sel]) return;
    state.visits[state.sel] = Math.max(0, state.visits[state.sel] - 1);
    state.checked = { ...state.checked, [state.sel]: true };
    renderLeaderFit();
  });

  // ---------- ISH job search / feed ----------
  function renderIsh() {
    const q = state.query.trim().toLowerCase();
    const feat = FEATURED.filter((j) => !q || j.title.toLowerCase().includes(q)).slice(0, 2);
    $("featuredTitle").textContent = q ? `Results for "${state.query.trim()}"` : "Featured jobs";
    $("featuredEmpty").hidden = feat.length !== 0;
    $("featuredJobs").innerHTML = feat.map((j) => `
      <div class="job-card">
        <div class="job-tile" style="background:${j.tile}">${esc(j.letter)}</div>
        <div style="min-width:0"><div class="job-title">${esc(j.title)}</div><div class="job-place">${esc(j.place)}</div><div class="job-pay">${esc(j.pay)}</div></div>
      </div>`).join("");

    $("jobFilterChips").innerHTML = ["All", "Full-time", "Remote"].map((l) => {
      const on = state.jobFilter === l;
      return `<button class="job-filter-chip" data-jobfilter="${esc(l)}" style="background:${on ? "#EFECE6" : "transparent"};color:${on ? "#111110" : "#A9A6A0"};border-color:${on ? "#EFECE6" : "#2C2B29"}">${esc(l)}</button>`;
    }).join("");

    const jobs = JOBS.filter((j) => state.jobFilter === "All" || j.place.includes(state.jobFilter)).slice(0, 4);
    $("jobRows").innerHTML = jobs.map((j) => {
      const on = !!state.saved[j.title];
      return `
        <div class="job-card-dark">
          <div class="job-tile" style="background:${j.tile}">${esc(j.letter)}</div>
          <div style="min-width:0;flex:1"><div class="job-title">${esc(j.title)}</div><div class="job-place">${esc(j.place)}</div><div class="job-pay">${esc(j.pay)}</div></div>
          <button class="job-save-btn" data-save="${esc(j.title)}" style="background:${on ? "#EFECE6" : "transparent"};color:${on ? "#111110" : "#A9A6A0"};border-color:${on ? "#EFECE6" : "#2C2B29"}">${on ? "Saved" : "Save"}</button>
        </div>`;
    }).join("");

    const savedN = Object.values(state.saved).filter(Boolean).length;
    $("savedLabel").textContent = savedN ? `${savedN} saved` : "";
  }
  $("jobQuery").addEventListener("input", (e) => { state.query = e.target.value; renderIsh(); });
  $("jobFilterChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-jobfilter]");
    if (!btn) return;
    state.jobFilter = btn.dataset.jobfilter;
    renderIsh();
  });
  $("jobRows").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-save]");
    if (!btn) return;
    const key = btn.dataset.save;
    state.saved = { ...state.saved, [key]: !state.saved[key] };
    renderIsh();
  });

  // ---------- Project mockup builders ----------
  function mockFor(p) {
    if (p.kind === "web") {
      return `
        <div class="web-mock">
          <div class="web-mock-bar"><span class="web-mock-dot"></span><span class="web-mock-dot"></span><span class="web-mock-dot"></span><span class="web-mock-url">${esc(p.url)}</span></div>
          <div class="web-mock-body">
            <div class="web-mock-nav">
              <div class="web-mock-brand"><span class="dot" style="background:${tile(p.hue)}"></span>${esc(p.name)}</div>
              ${p.nav.map((n) => `<div>${esc(n)}</div>`).join("")}
            </div>
            <div class="web-mock-main">
              <div class="web-mock-title">${esc(p.screen)}</div>
              ${p.rows.map((r) => `<div class="web-mock-row"><div class="a">${esc(r.a)}</div><div class="b">${esc(r.b)}</div><div class="c">${esc(r.c)}</div></div>`).join("")}
            </div>
          </div>
        </div>`;
    }
    if (p.kind === "mobile") {
      return `
        <div class="mobile-mock">
          <div class="phone">
            <div class="phone-screen">
              <div class="phone-statusbar"><span>9:41</span><span class="notch"></span><span class="sig">5G</span></div>
              <div class="mobile-mock-name">${esc(p.name)}</div>
              <div class="mobile-mock-card" style="background:${tile(p.hue)}">
                <div class="label">${esc(p.cardLabel)}</div>
                <div class="value">${esc(p.card)}</div>
                <div class="sub">${esc(p.cardSub)}</div>
              </div>
              ${p.rows.map((r) => `<div class="mobile-mock-row"><span class="a">${esc(r.a)}</span><span class="b">${esc(r.b)}</span></div>`).join("")}
            </div>
          </div>
        </div>`;
    }
    if (p.kind === "ai") {
      return `
        <div class="ai-mock">
          <div class="ai-mock-head"><span class="dot" style="background:${tile(p.hue)}"></span>${esc(p.name)}<span class="file">${esc(p.file)}</span></div>
          <div class="ai-mock-ask">${esc(p.ask)}</div>
          <div class="ai-mock-answer">${esc(p.answer)}</div>
          <div class="ai-mock-chips">${p.chips.map((c) => `<span class="ai-mock-chip">${esc(c)}</span>`).join("")}</div>
        </div>`;
    }
    // api
    return `
      <div class="api-mock">
        <div class="api-mock-bar"><span class="name">${esc(p.name)}</span><span>Docs</span><span>Keys</span><span>Logs</span></div>
        <div class="api-mock-body">
          <div><span class="api-mock-method" style="color:${tile(p.hue)}">GET</span> <span style="color:#EFECE6">${esc(p.path)}</span></div>
          <div class="api-mock-status">200 OK</div>
          ${p.code.map((l) => `<div style="color:${l.c}">${esc(l.t)}</div>`).join("")}
        </div>
      </div>`;
  }

  function renderProjects() {
    const filters = ["All", "Web", "Mobile", "Backend", "AI"];
    $("pfilterRow").innerHTML = filters.map((l) => {
      const count = l === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(l)).length;
      const on = state.pfilter === l;
      return `<button class="pfilter-btn${on ? " active" : ""}" data-pfilter="${esc(l)}">${esc(l)} <span class="count">${count}</span></button>`;
    }).join("");

    const shown = PROJECTS.filter((p) => state.pfilter === "All" || p.tags.includes(state.pfilter));
    $("projectGrid").innerHTML = shown.map((p) => `
      <article class="project-card" data-open-project="${esc(p.key)}">
        <div class="project-thumb"><div class="project-thumb-inner">${mockFor(p)}</div></div>
        <div class="project-meta">
          <div class="project-meta-top"><h4>${esc(p.name)}</h4><span class="project-year">${esc(p.year)}</span></div>
          <div class="project-desc">${esc(p.desc)}</div>
          <div class="project-tagline">${esc(p.tags.join(" / "))}</div>
        </div>
      </article>`).join("");
  }
  $("pfilterRow").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pfilter]");
    if (!btn) return;
    state.pfilter = btn.dataset.pfilter;
    renderProjects();
  });
  $("projectGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-open-project]");
    if (!card) return;
    openProj(card.dataset.openProject);
  });
  document.querySelectorAll("[data-open-case]").forEach((btn) => {
    btn.addEventListener("click", () => openProj(btn.dataset.openCase));
  });

  // ---------- Services ----------
  function renderServices() {
    $("servicesList").innerHTML = SVC_NAMES.map(([name, desc], i) => {
      const dim = !(state.hover === -1 || state.hover === i);
      const activeLine = state.hover === i;
      return `
        <div class="service-item${dim ? " dim" : ""}${activeLine ? " active" : ""}" data-svc="${i}">
          <div class="n">${"0" + (i + 1)}</div>
          <div class="name">${esc(name)}</div>
          <div class="desc">${esc(desc)}</div>
        </div>`;
    }).join("");

    const svc = SVC[state.svc];
    $("serviceDetail").innerHTML = `
      <div>
        <div class="heading">${"0" + (state.svc + 1)} — ${esc(SVC_NAMES[state.svc][0])}</div>
        <p class="long">${esc(svc.long)}</p>
      </div>
      <div>
        <div class="subhead">What you get</div>
        <div class="get-list">${svc.get.map((g) => `<div>${esc(g)}</div>`).join("")}</div>
      </div>
      <div>
        <div class="subhead">Typical stack</div>
        <div class="stack-list">${svc.stack.map((t) => `<span class="stack-tag">${esc(t)}</span>`).join("")}</div>
      </div>`;
  }
  $("servicesList").addEventListener("mouseover", (e) => {
    const item = e.target.closest("[data-svc]");
    if (!item) return;
    const i = Number(item.dataset.svc);
    if (state.hover === i) return;
    state.hover = i;
    state.svc = i;
    renderServices();
  });
  $("servicesList").addEventListener("mouseleave", () => {
    state.hover = -1;
    renderServices();
  });

  // ---------- Process ----------
  function renderProcess() {
    $("processSteps").innerHTML = STEPS.map((st, i) => `
      <button class="step-btn${i === state.step ? " active" : ""}" data-step="${i}">
        <span class="n">${"0" + (i + 1)}</span>
        <span class="name">${esc(st.name)}</span>
        <span class="time">${esc(st.time)}</span>
      </button>`).join("");

    const step = STEPS[state.step];
    $("stepDetail").innerHTML = `
      <div class="n">${"0" + (state.step + 1)} / 04</div>
      <div class="name">${esc(step.name)}</div>
      <p>${esc(step.desc)}</p>
      <div class="subhead">You receive</div>
      <div class="out-list">${step.out.map((o) => `<span class="out-tag">${esc(o)}</span>`).join("")}</div>`;
  }
  $("processSteps").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-step]");
    if (!btn) return;
    state.step = Number(btn.dataset.step);
    renderProcess();
  });

  // ---------- Engage ----------
  function renderEngage() {
    $("engageGrid").innerHTML = MODELS.map((m, i) => `
      <div class="engage-item">
        <div class="label">${esc(m.label)}</div>
        <div class="name">${esc(m.name)}</div>
        <p>${esc(m.desc)}</p>
        <div class="engage-points">${m.points.map((pt) => `<div>${esc(pt)}</div>`).join("")}</div>
        <button class="case-link discuss" data-engage="${i}">Discuss this</button>
      </div>`).join("");
  }
  $("engageGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-engage]");
    if (!btn) return;
    goContact(MODELS[Number(btn.dataset.engage)].types);
  });

  // ---------- Quotes ----------
  function renderQuote() {
    const q = QUOTES[state.quote];
    $("quoteText").textContent = `"${q.text}"`;
    $("quoteWho").textContent = q.who;
    $("quoteOrg").textContent = q.org;
    $("quoteCount").textContent = `0${state.quote + 1} / 0${QUOTES.length}`;
  }
  $("prevQuote").addEventListener("click", () => { state.quote = (state.quote + QUOTES.length - 1) % QUOTES.length; renderQuote(); });
  $("nextQuote").addEventListener("click", () => { state.quote = (state.quote + 1) % QUOTES.length; renderQuote(); });

  // ---------- FAQ ----------
  function renderFaq() {
    $("faqList").innerHTML = FAQS.map((f, i) => {
      const open = state.faq === i;
      return `
        <div class="faq-item">
          <button class="faq-q" data-faq="${i}"><span>${esc(f.q)}</span><span class="faq-sign">${open ? "−" : "+"}</span></button>
          ${open ? `<p class="faq-a">${esc(f.a)}</p>` : ""}
        </div>`;
    }).join("");
  }
  $("faqList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-faq]");
    if (!btn) return;
    const i = Number(btn.dataset.faq);
    state.faq = state.faq === i ? -1 : i;
    renderFaq();
  });

  // ---------- Contact ----------
  function renderContact() {
    const emailOk = /\S+@\S+\.\S+/.test(state.email);
    const ready = state.types.length > 0 && emailOk;

    $("typeChips").innerHTML = TYPES.map((l) => {
      const on = state.types.includes(l);
      return `<button class="chip-btn${on ? " active" : ""}" data-type="${esc(l)}">${esc(l)}</button>`;
    }).join("");
    $("timeChips").innerHTML = TIMES.map((l) => {
      const on = state.time === l;
      return `<button class="chip-btn${on ? " active" : ""}" data-time="${esc(l)}">${esc(l)}</button>`;
    }).join("");

    $("emailInput").value = state.email;
    $("submitBtn").style.background = ready ? "#EFECE6" : "#8E8B85";
    $("formHint").textContent = state.tried && !ready ? (state.types.length ? "Add an email so we can reply." : "Pick at least one thing you're building.") : "";

    const showForm = !state.sent;
    $("contactForm").style.display = showForm ? "flex" : "none";
    $("sentPanel").hidden = showForm;
    $("sentPanel").style.display = showForm ? "none" : "flex";
    if (state.sent) {
      $("sentSummary").textContent = `${state.types.join(", ")}${state.time ? " · " + state.time : ""} · ${state.email}`;
    }
  }
  $("typeChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-type]");
    if (!btn) return;
    const l = btn.dataset.type;
    state.types = state.types.includes(l) ? state.types.filter((x) => x !== l) : [...state.types, l];
    renderContact();
  });
  $("timeChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-time]");
    if (!btn) return;
    const l = btn.dataset.time;
    state.time = state.time === l ? null : l;
    renderContact();
  });
  $("emailInput").addEventListener("input", (e) => { state.email = e.target.value; renderContact(); });
  $("submitBtn").addEventListener("click", () => {
    const emailOk = /\S+@\S+\.\S+/.test(state.email);
    const ready = state.types.length > 0 && emailOk;
    if (ready) state.sent = true; else state.tried = true;
    renderContact();
  });
  $("resetBtn").addEventListener("click", () => {
    Object.assign(state, { sent: false, tried: false, types: [], time: null, email: "" });
    renderContact();
  });

  function goContact(types) {
    closeProj();
    if (types) state.types = types;
    state.sent = false;
    renderContact();
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    }, 30);
  }

  // ---------- Project drawer ----------
  const order = ["leaderfit", "ish", ...PROJECTS.map((p) => p.key)];
  const caseOf = (k) => FEATURED_CASES[k] || PROJECTS.find((p) => p.key === k);

  function openProj(key) {
    state.proj = key;
    document.documentElement.style.overflow = "hidden";
    renderDrawer();
    $("drawerOverlay").classList.add("open");
    $("drawer").scrollTop = 0;
  }
  function closeProj() {
    if (!state.proj) return;
    state.proj = null;
    document.documentElement.style.overflow = "";
    $("drawerOverlay").classList.remove("open");
  }
  function renderDrawer() {
    if (!state.proj) return;
    const c = caseOf(state.proj);
    const next = order[(order.indexOf(state.proj) + 1) % order.length];
    const tagLine = c.tags.join(" / ");
    $("drawerYear").textContent = `CASE STUDY · ${c.year}`;
    $("drawerName").textContent = c.name;
    $("drawerSummary").textContent = c.summary;
    $("drawerTagline").textContent = tagLine;
    $("drawerChallenge").textContent = c.challenge;
    $("drawerSolution").textContent = c.solution;
    $("drawerBuilt").innerHTML = c.built.map((b) => `<div>${esc(b)}</div>`).join("");
    $("drawerStack").innerHTML = c.stack.map((t) => `<span class="stack-tag">${esc(t)}</span>`).join("");
    $("drawerNext").textContent = `Next: ${caseOf(next).name}`;
    $("drawerNext").onclick = () => { state.proj = next; renderDrawer(); $("drawer").scrollTop = 0; };
    const toTypes = (tags) => {
      const m = { Web: "Web app", Mobile: "Mobile app", Backend: "Backend", Infrastructure: "Backend", AI: "AI & automation" };
      return [...new Set(tags.map((t) => m[t]).filter(Boolean))];
    };
    $("drawerSimilar").onclick = () => goContact(toTypes(c.tags));
  }
  $("drawerClose").addEventListener("click", closeProj);
  $("drawerBackdrop").addEventListener("click", closeProj);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProj(); });

  // ---------- Scroll reveal + active nav ----------
  function setupReveal() {
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [...document.querySelectorAll("[data-reveal]")];
    if (reduce) {
      els.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.setProperty("--reveal-delay", (el.dataset.delay || 0) + "ms");
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
      els.forEach((el) => io.observe(el));
    }

    const ids = ["top", "work", "services", "about", "contact"];
    let ticking = false;
    const onScroll = () => {
      ticking = false;
      const h = window.innerHeight || document.documentElement.clientHeight;
      let active = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < h * 0.45) active = id;
      });
      if (active !== state.active) { state.active = active; renderNav(); }
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  // ---------- Init ----------
  function init() {
    renderIshNav();
    renderFeed();
    renderMarquee();
    renderLeaderFit();
    renderIsh();
    renderProjects();
    renderServices();
    renderProcess();
    renderEngage();
    renderQuote();
    renderFaq();
    renderContact();
    setupReveal();

    setInterval(addCandidate, 5200);
    setInterval(() => { if (!state.proj) { state.quote = (state.quote + 1) % QUOTES.length; renderQuote(); } }, 9000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
