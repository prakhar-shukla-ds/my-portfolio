import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { title: "Sales Trend Dashboard", desc: "Interactive Tableau dashboard visualizing 3 years of retail sales data, uncovering seasonal patterns and regional performance gaps. Built with SQL for data extraction and Excel for preprocessing.", tags: ["Tableau", "SQL", "Excel"], img: "📊" },
  { title: "Customer Churn Predictor", desc: "Built a logistic regression model in Python achieving 84% accuracy identifying at-risk customers for a telecom dataset. Includes feature engineering and model evaluation pipeline.", tags: ["Python", "Scikit-learn", "Pandas"], img: "🤖" },
  { title: "COVID-19 Data Visualizer", desc: "Created animated choropleth maps and time-series charts tracking global case trends using public WHO datasets. Deployed as an interactive web dashboard.", tags: ["Python", "Plotly", "Seaborn"], img: "🗺️" },
  { title: "Amazon Review Sentiment", desc: "NLP pipeline to classify product review sentiments, with a Streamlit web app for live prediction and topic modeling using NLTK and spaCy.", tags: ["Python", "NLTK", "Streamlit"], img: "💬" },
];

const SKILLS = [
  { name: "Python", level: 90 },
  { name: "SQL", level: 85 },
  { name: "R", level: 70 },
  { name: "Tableau", level: 75 },
  { name: "Power BI", level: 70 },
  { name: "Machine Learning", level: 65 },
  { name: "Pandas / NumPy", level: 88 },
  { name: "Excel", level: 92 },
];

const NAV_LINKS = ["HOME", "ABOUT", "WORK", "CONTACT"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
const TYPEWRITER_TEXTS = ["Data Analyst.", "Python Developer.", "Data Visualizer.", "Insight Hunter.", "SQL Expert."];

// Detect touch/pointer type
const isTouchDevice = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

function Particles({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const isTouch = isTouchDevice();
    const particleCount = isTouch ? 30 : 80; // fewer particles on mobile

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3, opacity: Math.random() * 0.6 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, pointerEvents:"none", zIndex:1, opacity: dark ? 0.5 : 0.15 }} />;
}

// Only show custom cursor on non-touch devices
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) return; // skip entirely on touch
    setVisible(true);
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;
  return (
    <>
      <div ref={cursorRef} style={{ position:"fixed", width:"40px", height:"40px", borderRadius:"50%", border:"1.5px solid rgba(139,92,246,0.6)", pointerEvents:"none", zIndex:9999, transition:"transform 0.12s ease", mixBlendMode:"difference" }} />
      <div ref={dotRef} style={{ position:"fixed", width:"8px", height:"8px", borderRadius:"50%", background:"#8b5cf6", pointerEvents:"none", zIndex:9999, transition:"transform 0.04s ease", boxShadow:"0 0 10px rgba(139,92,246,0.8)" }} />
    </>
  );
}

function SkillBar({ name, level, dark }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setInView(e.isIntersecting); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom:"1.2rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.4rem" }}>
        <span style={{ fontSize:"0.88rem", fontWeight:500, color: dark ? "#e2e8f0" : "#1e293b" }}>{name}</span>
        <span style={{ fontSize:"0.8rem", color:"#8b5cf6", fontWeight:600 }}>{level}%</span>
      </div>
      <div style={{ background: dark ? "#1e293b" : "#e2e8f0", borderRadius:"4px", height:"6px", overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:"4px",
          background:"linear-gradient(90deg, #8b5cf6, #06b6d4)",
          width: inView ? `${level}%` : "0%",
          transition: inView ? "width 1.2s ease" : "width 0.3s ease",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, dark }) {
  const cardRef = useRef(null);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const isEven = index % 2 === 0;
  const touch = isTouchDevice();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // 3D tilt — only on non-touch devices
  const handleMouseMove = touch ? undefined : (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y / rect.height) - 0.5) * -15;
    const rotY = ((x / rect.width) - 0.5) * 15;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    card.style.boxShadow = `0 20px 60px rgba(139,92,246,0.3)`;
  };

  const handleMouseLeave = touch ? undefined : () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    card.style.boxShadow = "none";
  };

  return (
    <div ref={ref} style={{
      display:"flex", flexWrap:"wrap", gap:"2rem", alignItems:"center",
      marginBottom:"4rem", flexDirection: isEven ? "row" : "row-reverse",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
      transition:"all 0.7s ease",
    }}>
      <div style={{ flex:1, minWidth:"220px" }}>
        <div style={{ borderRadius:"16px", background: dark ? "linear-gradient(135deg, #1a1a2e, #16213e)" : "linear-gradient(135deg, #e0e7ff, #ddd6fe)", border: dark ? "1px solid #ffffff11" : "1px solid #c4b5fd", height:"180px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"4.5rem", position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1))", borderRadius:"16px" }} />
          {project.img}
        </div>
      </div>
      <div ref={cardRef} style={{ flex:1, minWidth:"220px", background: dark ? "rgba(255,255,255,0.03)" : "rgba(139,92,246,0.05)", border: dark ? "1px solid #ffffff11" : "1px solid #c4b5fd44", borderRadius:"16px", padding:"1.75rem", transition:"all 0.15s ease" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ color:"#8b5cf6", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.4rem" }}>Project {String(index+1).padStart(2,"0")}</div>
        <h3 style={{ fontSize:"1.3rem", fontWeight:700, marginBottom:"0.75rem", color: dark ? "#fff" : "#1e293b" }}>{project.title}</h3>
        <p style={{ color: dark ? "#94a3b8" : "#64748b", lineHeight:1.8, fontSize:"0.88rem", marginBottom:"1.1rem" }}>{project.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontSize:"0.72rem", padding:"0.3rem 0.75rem", background:"rgba(139,92,246,0.12)", color:"#a78bfa", borderRadius:"20px", border:"1px solid rgba(139,92,246,0.25)", fontWeight:500 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrambled, setScrambled] = useState("Hi, I'm Prakhar");
  const [typed, setTyped] = useState("");
  const [typeIndex, setTypeIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", message:"" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroPhotoRef = useRef(null);
  const finalHeading = "Hi, I'm Prakhar";
  const touch = isTouchDevice();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse parallax — skip on touch
  useEffect(() => {
    if (touch) return;
    const onMouse = (e) => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [touch]);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(finalHeading.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i < iteration) return finalHeading[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (iteration >= finalHeading.length) clearInterval(interval);
      iteration += 0.5;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let current = TYPEWRITER_TEXTS[typeIndex];
    let i = 0; let deleting = false;
    setTyped("");
    const interval = setInterval(() => {
      if (!deleting) {
        setTyped(current.slice(0, i + 1)); i++;
        if (i === current.length) { deleting = true; }
      } else {
        setTyped(current.slice(0, i - 1)); i--;
        if (i === 0) { deleting = false; setTypeIndex(prev => (prev + 1) % TYPEWRITER_TEXTS.length); clearInterval(interval); }
      }
    }, deleting ? 50 : 100);
    return () => clearInterval(interval);
  }, [typeIndex]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  const bg = dark ? "#0d0d1a" : "#f8fafc";
  const text = dark ? "#fff" : "#1e293b";
  const navBg = dark ? "rgba(13,13,26,0.95)" : "rgba(248,250,252,0.95)";
  const sectionBg2 = dark ? "#0a0a16" : "#f1f5f9";

  return (
    <div style={{ background: bg, minHeight:"100vh", color: text, fontFamily:"'Outfit', sans-serif",
      // only hide cursor on non-touch
      cursor: touch ? "auto" : "none",
      opacity: loaded ? 1 : 0, transition:"opacity 0.8s ease, background 0.4s ease, color 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        ::selection { background:#8b5cf644; }
        .nav-link { position:relative; }
        .nav-link:hover { color:#8b5cf6 !important; text-shadow:0 0 20px rgba(139,92,246,0.8) !important; }
        .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:#8b5cf6; transition:width 0.3s ease; border-radius:2px; }
        .nav-link:hover::after { width:100%; }
        .contact-input { border-radius:8px; padding:0.85rem 1.1rem; width:100%; font-family:'Outfit',sans-serif; font-size:0.9rem; transition:border-color 0.2s; }
        .contact-input:focus { outline:none; border-color:#8b5cf6 !important; }
        .contact-input::placeholder { color:#94a3b8; }
        .skill-pill:hover { background:rgba(139,92,246,0.25) !important; color:#c4b5fd !important; transform:translateY(-2px); }
        .toggle-btn:hover { transform:scale(1.05); }

        /* Only none-cursor on pointer:fine (mouse) devices */
        @media (pointer: fine) {
          button { cursor: none !important; }
        }
        @media (pointer: coarse) {
          button { cursor: pointer !important; }
          * { cursor: auto; }
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pageLoad { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* ── TABLET (769–1024px) ── */
        @media (min-width:769px) and (max-width:1024px) {
          .hero-inner { padding: 7rem 3rem 3rem !important; gap: 2rem !important; }
          .section-pad { padding: 5rem 3rem !important; }
          .footer-inner { padding: 1.5rem 3rem !important; }
        }

        /* ── MOBILE (≤768px) ── */
        @media (max-width:768px) {
          .desktop-nav { display:none !important; }
          .hamburger { display:flex !important; }
          .hero-inner { flex-direction:column !important; padding: 5.5rem 1.25rem 3rem !important; text-align:center !important; gap:2rem !important; }
          .hero-text p { max-width:100% !important; margin-left:auto !important; margin-right:auto !important; }
          .hero-text-cta { justify-content:center !important; }
          .hero-photo-wrap { justify-content:center !important; }
          .section-pad { padding: 3.5rem 1.25rem !important; }
          .contact-grid { grid-template-columns:1fr !important; }
          .skills-grid { grid-template-columns:1fr !important; }
          .footer-inner { flex-direction:column !important; align-items:center !important; text-align:center !important; padding:1.5rem 1.25rem !important; gap:0.75rem !important; }
          .project-row { flex-direction:column !important; }
          .nav-inner { padding: 1rem 1.25rem !important; }
        }

        /* ── VERY SMALL (≤380px) ── */
        @media (max-width:380px) {
          .hero-inner { padding: 5rem 1rem 2.5rem !important; }
          .section-pad { padding: 3rem 1rem !important; }
        }

        @media (min-width:769px) {
          .hamburger { display:none !important; }
          .mobile-menu { display:none !important; }
        }
      `}</style>

      <CustomCursor />
      <Particles dark={dark} />

      {/* Scroll progress bar */}
      <div style={{ position:"fixed", top:0, left:0, height:"3px", width:`${scrollProgress}%`, background:"linear-gradient(90deg, #8b5cf6, #06b6d4)", zIndex:200, transition:"width 0.1s ease", boxShadow:"0 0 10px rgba(139,92,246,0.8)" }} />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background: scrollY>60||menuOpen ? navBg : "transparent", backdropFilter: scrollY>60||menuOpen ? "blur(20px)" : "none", borderBottom: scrollY>60||menuOpen ? `1px solid ${dark?"#ffffff0a":"#e2e8f0"}` : "none", transition:"all 0.3s ease" }}>
        <div className="nav-inner" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.2rem 4rem", position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"80px", height:"8px", background:"#8b5cf6", borderRadius:"0 0 8px 8px", opacity: scrollY>60?0:1, transition:"opacity 0.3s" }} />
          <span style={{ fontSize:"1.4rem", fontWeight:800 }}>PS<span style={{ color:"#8b5cf6" }}>.</span></span>
          <div className="desktop-nav" style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
            {NAV_LINKS.map(link => (
              <button key={link} className="nav-link" onClick={() => scrollTo(link.toLowerCase())} style={{ background:"none", border:"none", fontSize:"0.82rem", fontFamily:"'Outfit',sans-serif", letterSpacing:"0.12em", color: dark?"#94a3b8":"#64748b", fontWeight:500, transition:"all 0.2s" }}>{link}</button>
            ))}
            <button className="toggle-btn" onClick={() => setDark(!dark)} style={{ background: dark?"#1e293b":"#e2e8f0", border:`1px solid ${dark?"#334155":"#cbd5e1"}`, borderRadius:"30px", padding:"0.35rem 0.75rem", display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.8rem", color: dark?"#94a3b8":"#64748b", fontWeight:500, transition:"all 0.3s" }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", display:"flex", flexDirection:"column", gap:"5px", padding:"8px", marginRight:"-4px" }}>
            <span style={{ width:"24px", height:"2px", background:menuOpen?"#8b5cf6":text, transition:"all 0.3s", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none", display:"block" }} />
            <span style={{ width:"24px", height:"2px", background:menuOpen?"#8b5cf6":text, transition:"all 0.3s", opacity:menuOpen?0:1, display:"block" }} />
            <span style={{ width:"24px", height:"2px", background:menuOpen?"#8b5cf6":text, transition:"all 0.3s", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none", display:"block" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{ background: dark?"rgba(13,13,26,0.98)":"rgba(248,250,252,0.98)", padding:"1rem 0 1.5rem", animation:"slideDown 0.2s ease", display:"flex", flexDirection:"column" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{ background:"none", border:"none", fontSize:"1rem", fontFamily:"'Outfit',sans-serif", color: dark?"#94a3b8":"#64748b", padding:"0.9rem 2rem", textAlign:"left", letterSpacing:"0.1em" }}>{link}</button>
            ))}
            <button onClick={() => { setDark(!dark); setMenuOpen(false); }} style={{ background:"none", border:"none", fontSize:"1rem", fontFamily:"'Outfit',sans-serif", color: dark?"#94a3b8":"#64748b", padding:"0.9rem 2rem", textAlign:"left" }}>{dark ? "☀️ Light Mode" : "🌙 Dark Mode"}</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight:"100vh", position:"relative", overflow:"hidden" }}>
        {dark && <>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 40%, #2d1b69 70%, #0d0d1a 100%)" }} />
          <div style={{ position:"absolute", top:"-20%", right:"-10%", width:"70%", height:"120%", background:"radial-gradient(ellipse, rgba(139,92,246,0.35) 0%, transparent 65%)", pointerEvents:"none" }} />
        </>}
        {!dark && <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #f8fafc 0%, #ede9fe 50%, #f8fafc 100%)" }} />}

        <div className="hero-inner" style={{ position:"relative", zIndex:2, minHeight:"100vh", display:"flex", alignItems:"center", padding:"0 8rem", gap:"4rem" }}>
          <div className="hero-text" style={{ flex:1, animation:"pageLoad 1s ease both" }}>
            <h1 style={{ fontSize:"clamp(2rem, 6vw, 4rem)", fontWeight:800, lineHeight:1.1, marginBottom:"0.75rem", letterSpacing:"-0.02em" }}>{scrambled}</h1>
            <h2 style={{ fontSize:"clamp(1rem, 3.5vw, 2rem)", fontWeight:600, color:"#06b6d4", marginBottom:"1.5rem", minHeight:"1.4em" }}>
              {typed}<span style={{ animation:"blink 1s infinite", color:"#8b5cf6" }}>|</span>
            </h2>
            <p style={{ color: dark?"#94a3b8":"#64748b", lineHeight:1.8, fontSize:"clamp(0.85rem, 2.5vw, 0.95rem)", maxWidth:"480px", marginBottom:"2.5rem", animation:"pageLoad 1s 0.3s ease both", opacity:0, animationFillMode:"forwards" }}>
              A passionate data analyst with a love for uncovering insights hidden in complex datasets. I build dashboards, predictive models, and data pipelines that turn raw numbers into clear decisions.
            </p>
            <div className="hero-text-cta" style={{ display:"flex", animation:"pageLoad 1s 0.5s ease both", opacity:0, animationFillMode:"forwards" }}>
              <button onClick={() => scrollTo("contact")} style={{ background:"linear-gradient(135deg, #8b5cf6, #06b6d4)", color:"#fff", border:"none", borderRadius:"30px", padding:"0.9rem 2.5rem", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"0.95rem", boxShadow:"0 8px 30px rgba(139,92,246,0.4)", transition:"all 0.3s", WebkitTapHighlightColor:"transparent" }}
                onMouseEnter={e => { if (!touch) { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 15px 40px rgba(139,92,246,0.7)"; }}}
                onMouseLeave={e => { if (!touch) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(139,92,246,0.4)"; }}}
              >Contact</button>
            </div>
          </div>

          <div className="hero-photo-wrap" style={{ flex:1, display:"flex", justifyContent:"center", alignItems:"center", animation:"pageLoad 1s 0.2s ease both", opacity:0, animationFillMode:"forwards" }}>
            <div ref={heroPhotoRef} style={{
              width:"clamp(180px, 38vw, 420px)", height:"clamp(180px, 38vw, 420px)", borderRadius:"50%",
              background: dark?"linear-gradient(160deg, #2d1b69, #1a0a2e)":"linear-gradient(160deg, #ede9fe, #ddd6fe)",
              border:`3px solid ${dark?"rgba(139,92,246,0.3)":"rgba(139,92,246,0.5)"}`,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              animation:"float 5s ease-in-out infinite",
              boxShadow: dark?"0 30px 80px rgba(139,92,246,0.25)":"0 30px 80px rgba(139,92,246,0.15)",
              overflow:"hidden", position:"relative", transition:"border-color 0.3s, box-shadow 0.3s",
              // parallax only on non-touch
              transform: touch ? undefined : `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            }}
              onMouseEnter={e => { if (!touch) { e.currentTarget.style.borderColor="rgba(139,92,246,1)"; e.currentTarget.style.boxShadow="0 0 50px rgba(139,92,246,0.6)"; }}}
              onMouseLeave={e => { if (!touch) { e.currentTarget.style.borderColor=dark?"rgba(139,92,246,0.3)":"rgba(139,92,246,0.5)"; e.currentTarget.style.boxShadow=dark?"0 30px 80px rgba(139,92,246,0.25)":"0 30px 80px rgba(139,92,246,0.15)"; }}}
            >
              <img src="/photo.png" alt="Prakhar Shukla" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad" style={{ padding:"6rem 4rem", background: bg, position:"relative", zIndex:2, transition:"background 0.4s" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"3rem" }}>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(to right, transparent, #8b5cf644)" }} />
            <h2 style={{ fontSize:"clamp(1.4rem, 4vw, 2.2rem)", fontWeight:700 }}>About</h2>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(to left, transparent, #8b5cf644)" }} />
          </div>
          <p style={{ color: dark?"#94a3b8":"#64748b", lineHeight:2, fontSize:"clamp(0.88rem, 2.5vw, 1rem)", maxWidth:"700px", margin:"0 auto 3rem" }}>
            I'm a Data Analyst passionate about transforming raw data into meaningful stories. With expertise in Python, SQL, and visualization tools like Tableau and Power BI, I love tackling real-world datasets and extracting insights that drive decisions.
          </p>
          <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 3rem", textAlign:"left", marginBottom:"3rem" }}>
            {SKILLS.map(skill => <SkillBar key={skill.name} name={skill.name} level={skill.level} dark={dark} />)}
          </div>
          <div style={{ display:"flex", justifyContent:"center", margin:"2rem 0" }}>
            <div style={{ position:"relative", width:"80px", height:"80px" }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#8b5cf6", borderRightColor:"#06b6d4", animation:"spin 3s linear infinite" }} />
              <div style={{ position:"absolute", inset:"10px", borderRadius:"50%", background:"linear-gradient(135deg, #8b5cf620, #06b6d420)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem" }}>📊</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="section-pad" style={{ padding:"6rem 4rem", background: sectionBg2, position:"relative", zIndex:2, transition:"background 0.4s" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1rem" }}>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(to right, transparent, #8b5cf644)" }} />
            <h2 style={{ fontSize:"clamp(1.4rem, 4vw, 2.2rem)", fontWeight:700 }}>Recent Work</h2>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(to left, transparent, #8b5cf644)" }} />
          </div>
          <p style={{ textAlign:"center", color:"#64748b", fontSize:"0.85rem", marginBottom:"4rem", letterSpacing:"0.05em" }}>A few things I've built</p>
          {PROJECTS.map((project, i) => <ProjectCard key={project.title} project={project} index={i} dark={dark} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad" style={{ padding:"6rem 4rem", background: bg, position:"relative", zIndex:2, transition:"background 0.4s" }}>
        <div style={{ maxWidth:"700px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1rem" }}>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(to right, transparent, #8b5cf644)" }} />
            <h2 style={{ fontSize:"clamp(1.4rem, 4vw, 2.2rem)", fontWeight:700, textAlign:"center" }}>Drop me a message</h2>
            <div style={{ flex:1, height:"1px", background:"linear-gradient(to left, transparent, #8b5cf644)" }} />
          </div>
          <p style={{ textAlign:"center", color:"#64748b", fontSize:"0.85rem", marginBottom:"3rem" }}>I'm open to opportunities and collaborations</p>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <input className="contact-input" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} style={{ background: dark?"#ffffff08":"#f1f5f9", border: dark?"1px solid #ffffff15":"1px solid #e2e8f0", color: text }} />
            <input className="contact-input" placeholder="Email address" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} style={{ background: dark?"#ffffff08":"#f1f5f9", border: dark?"1px solid #ffffff15":"1px solid #e2e8f0", color: text }} />
          </div>
          <input className="contact-input" placeholder="Phone number" value={formData.phone} onChange={e => setFormData({...formData, phone:e.target.value})} style={{ marginBottom:"1rem", display:"block", background: dark?"#ffffff08":"#f1f5f9", border: dark?"1px solid #ffffff15":"1px solid #e2e8f0", color: text }} />
          <textarea className="contact-input" placeholder="Your message" rows={5} value={formData.message} onChange={e => setFormData({...formData, message:e.target.value})} style={{ resize:"vertical", marginBottom:"1.5rem", display:"block", background: dark?"#ffffff08":"#f1f5f9", border: dark?"1px solid #ffffff15":"1px solid #e2e8f0", color: text }} />
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <button style={{ background:"linear-gradient(135deg, #8b5cf6, #06b6d4)", color:"#fff", border:"none", borderRadius:"30px", padding:"0.9rem 2.5rem", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"0.9rem", boxShadow:"0 8px 30px rgba(139,92,246,0.3)", transition:"all 0.3s", WebkitTapHighlightColor:"transparent" }}
              onMouseEnter={e => { if (!touch) { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 15px 40px rgba(139,92,246,0.7)"; }}}
              onMouseLeave={e => { if (!touch) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(139,92,246,0.3)"; }}}
            >Send Message →</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark?"#080810":"#f1f5f9", borderTop:`1px solid ${dark?"#ffffff08":"#e2e8f0"}`, position:"relative", zIndex:2, transition:"background 0.4s" }}>
        <div className="footer-inner" style={{ padding:"2rem 4rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <span style={{ fontWeight:800, fontSize:"1.2rem" }}>PS<span style={{ color:"#8b5cf6" }}>.</span></span>
          <span style={{ color:"#64748b", fontSize:"0.8rem" }}>© {new Date().getFullYear()} Prakhar Shukla · Built with React</span>
          <div style={{ display:"flex", gap:"1rem" }}>
            {["in","gh","tw"].map(s => (
              <div key={s} style={{ width:"32px", height:"32px", borderRadius:"50%", border:`1px solid ${dark?"#ffffff15":"#cbd5e1"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", color:"#64748b", fontWeight:700, textTransform:"uppercase", transition:"all 0.2s" }}
                onMouseEnter={e => { if (!touch) { e.currentTarget.style.borderColor="#8b5cf6"; e.currentTarget.style.color="#8b5cf6"; e.currentTarget.style.boxShadow="0 0 15px rgba(139,92,246,0.4)"; }}}
                onMouseLeave={e => { if (!touch) { e.currentTarget.style.borderColor=dark?"#ffffff15":"#cbd5e1"; e.currentTarget.style.color="#64748b"; e.currentTarget.style.boxShadow="none"; }}}
              >{s}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}