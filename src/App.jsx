import { useState, useEffect, useRef } from "react";

const UNDER_CONSTRUCTION = false;

function UnderConstruction() {
  const [time, setTime] = useState({ days: 42, hours: 17, minutes: 33, seconds: 58 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime({
        days: Math.floor(Math.random() * 99),
        hours: Math.floor(Math.random() * 23),
        minutes: Math.floor(Math.random() * 59),
        seconds: Math.floor(Math.random() * 59),
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      background: "#1a1a1a", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Poppins', sans-serif", color: "#fff",
      textAlign: "center", padding: "2rem",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ animation: "fadeUp 0.8s ease both" }}>
        <p style={{ color: "#2563EB", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.05em", marginBottom: "2rem" }}>
          Prakhar <span style={{ color: "#fff" }}>Shukla's</span> Portfolio
        </p>
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🚧</div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
          Under <span style={{ color: "#2563EB" }}>Construction</span>
        </h1>
        <p style={{ color: "#888", fontSize: "1rem", maxWidth: "420px", lineHeight: 1.8, margin: "0 auto 3rem" }}>
          Something Amazing Launching Soon...
        </p>

        {/* Countdown */}
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
          {[
            { label: "Days", value: time.days },
            { label: "Hours", value: time.hours },
            { label: "Mins", value: time.minutes },
            { label: "Secs", value: time.seconds },
          ].map((item, i) => (
            <div key={item.label} style={{
              background: "#111",
              border: "1px solid #2563EB44",
              borderRadius: "12px",
              padding: "1.5rem 1.75rem",
              minWidth: "90px",
              boxShadow: "0 0 20px rgba(37,99,235,0.1)",
              animation: `fadeUp 0.8s ${i * 0.1}s ease both`,
            }}>
              <div style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800,
                color: "#2563EB", lineHeight: 1,
                marginBottom: "0.5rem",
              }}>
                {String(item.value).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <p style={{ color: "#444", fontSize: "0.82rem" }}>© {new Date().getFullYear()} Prakhar Shukla</p>
      </div>
    </div>
  );
}

const NAV_LINKS = ["Home", "Services", "About me", "Projects", "Contact me"];

const SKILLS = [
  { name: "Python", level: 90 },
  { name: "SQL", level: 85 },
  { name: "R", level: 70 },
  { name: "Tableau", level: 75 },
  { name: "Power BI", level: 70 },
  { name: "Machine Learning", level: 65 },
];

const PROJECTS = [
  {
    title: "Sales Trend Dashboard",
    description: "Interactive Tableau dashboard visualizing 3 years of retail sales data, uncovering seasonal patterns and regional performance gaps.",
    tags: ["Tableau", "SQL", "Excel"],
  },
  {
    title: "Customer Churn Predictor",
    description: "Built a logistic regression model in Python achieving 84% accuracy identifying at-risk customers for a telecom dataset.",
    tags: ["Python", "Scikit-learn", "Pandas"],
  },
  {
    title: "COVID-19 Data Visualizer",
    description: "Created animated choropleth maps and time-series charts tracking global case trends using public WHO datasets.",
    tags: ["Python", "Plotly", "Seaborn"],
  },
  {
    title: "Amazon Review Sentiment",
    description: "NLP pipeline to classify product review sentiments, with a Streamlit web app for live prediction and topic modeling.",
    tags: ["Python", "NLTK", "Streamlit"],
  },
];

const STATS = [
  { value: "3+", label: "Years Learning" },
  { value: "10+", label: "Projects Done" },
  { value: "5+", label: "Tools Mastered" },
];

const SERVICES = [
  { icon: "📊", title: "Data Visualization", desc: "Building clear, interactive dashboards using Tableau, Power BI, and Python libraries." },
  { icon: "🤖", title: "Machine Learning", desc: "Developing predictive models and classification systems from real-world datasets." },
  { icon: "🗄️", title: "Data Analysis", desc: "Cleaning, transforming, and analyzing data to surface actionable insights." },
  { icon: "📈", title: "Statistical Reporting", desc: "Creating detailed reports with clear findings using Excel, R, and Python." },
];

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState("Home");
  const [typed, setTyped] = useState("");
  const fullText = "Data Analyst";

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  if (UNDER_CONSTRUCTION) return <UnderConstruction />;

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link:hover { color: #1D4ED8 !important; }
        .hire-btn:hover { background: transparent !important; color: #1D4ED8 !important; }
        .cv-btn:hover { background: #1D4ED8 !important; color: #fff !important; border-color: #1D4ED8 !important; }
        .project-card:hover { transform: translateY(-6px) !important; border-color: #1D4ED8 !important; }
        .service-card:hover { background: #1D4ED8 !important; }
        .social-icon:hover { background: #1D4ED8 !important; border-color: #1D4ED8 !important; color: #fff !important; }
        .contact-input:focus { outline: none; border-color: #1D4ED8 !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.2rem 5rem",
        background: scrollY > 40 ? "rgba(17,17,17,0.97)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(10px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid #2a2a2a" : "none",
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#2563EB" }}>LOGO</span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} className="nav-link" onClick={() => scrollTo(link)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif",
              color: active === link ? "#2563EB" : "#ccc",
              fontWeight: active === link ? 600 : 400,
              transition: "color 0.2s",
            }}>{link}</button>
          ))}
          <button className="hire-btn" onClick={() => scrollTo("Contact me")} style={{
            background: "#2563EB", color: "#fff", border: "2px solid #2563EB",
            borderRadius: "6px", padding: "0.55rem 1.4rem",
            fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.88rem",
            cursor: "pointer", transition: "all 0.3s",
          }}>Hire Me</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "0 5rem", paddingTop: "5rem",
        background: "#1a1a1a", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-50px", right: "200px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* LEFT */}
        <div style={{ flex: 1, animation: "fadeUp 0.8s ease both" }}>
          <p style={{ fontSize: "1rem", color: "#aaa", marginBottom: "0.4rem", fontWeight: 300 }}>Hi I am</p>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, marginBottom: "0.4rem" }}>Prakhar Shukla</h1>
          <h2 style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 800,
            color: "#2563EB", marginBottom: "1.5rem", lineHeight: 1.15, minHeight: "1.2em",
          }}>
            {typed}<span style={{ animation: "blink 1s infinite" }}>|</span>
          </h2>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {["in", "gh", "tw", "be"].map(s => (
              <div key={s} className="social-icon" style={{
                width: "38px", height: "38px", borderRadius: "50%",
                border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "0.72rem", color: "#aaa", fontWeight: 700,
                transition: "all 0.2s", textTransform: "uppercase",
              }}>{s}</div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "4rem" }}>
            <button className="hire-btn" onClick={() => scrollTo("Contact me")} style={{
              background: "#2563EB", color: "#fff", border: "2px solid #2563EB",
              borderRadius: "6px", padding: "0.8rem 2rem",
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9rem",
              cursor: "pointer", transition: "all 0.3s",
            }}>Hire Me</button>
            <button className="cv-btn" style={{
              background: "transparent", color: "#fff", border: "2px solid #555",
              borderRadius: "6px", padding: "0.8rem 2rem",
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9rem",
              cursor: "pointer", transition: "all 0.3s",
            }}>Download CV</button>
          </div>

          <div style={{ display: "flex", background: "#222", borderRadius: "12px", overflow: "hidden", maxWidth: "420px" }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, padding: "1.2rem 1rem", textAlign: "center",
                borderRight: i < STATS.length - 1 ? "1px solid #333" : "none",
              }}>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#2563EB" }}>{stat.value}</div>
                <div style={{ fontSize: "0.72rem", color: "#888", marginTop: "0.2rem" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - photo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", animation: "slideRight 0.9s ease both" }}>
          <div style={{
            width: "360px", height: "360px", borderRadius: "50%",
            background: "linear-gradient(135deg, #252525, #2e2e2e)",
            border: "3px solid #2563EB",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            animation: "float 4s ease-in-out infinite",
            boxShadow: "0 0 60px rgba(37, 99, 235, 0.15)",
            overflow: "hidden",
          }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#2563EB"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "0.75rem" }}>Add your photo here</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "5rem", background: "#111" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>My <span style={{ color: "#2563EB" }}>Services</span></h2>
          <div style={{ width: "60px", height: "3px", background: "#2563EB", margin: "0.75rem auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
          {SERVICES.map(s => (
            <div key={s.title} className="service-card" style={{
              background: "#1a1a1a", borderRadius: "12px", padding: "2rem",
              transition: "all 0.3s", cursor: "default",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.95rem" }}>{s.title}</h3>
              <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about-me" style={{ padding: "5rem", background: "#1a1a1a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ color: "#2563EB", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.4rem" }}>Get To Know More</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>About <span style={{ color: "#2563EB" }}>Me</span></h2>
            <p style={{ color: "#aaa", lineHeight: 1.9, fontSize: "0.9rem", marginBottom: "1rem" }}>
              I'm a passionate Data Analytics student with a love for uncovering insights hidden in complex datasets. I enjoy working with real-world data to solve meaningful problems.
            </p>
            <p style={{ color: "#aaa", lineHeight: 1.9, fontSize: "0.9rem" }}>
              My toolkit spans Python, SQL, Tableau, and machine learning frameworks. I'm actively seeking internship opportunities to apply my skills professionally.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "1.5rem", color: "#2563EB" }}>Skills</h3>
            {SKILLS.map(skill => (
              <div key={skill.name} style={{ marginBottom: "1.1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>{skill.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "#2563EB", fontWeight: 600 }}>{skill.level}%</span>
                </div>
                <div style={{ background: "#2a2a2a", borderRadius: "4px", height: "6px" }}>
                  <div style={{
                    height: "100%", borderRadius: "4px",
                    background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                    width: `${skill.level}%`, transition: "width 1.2s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "5rem", background: "#111" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>My <span style={{ color: "#2563EB" }}>Projects</span></h2>
          <div style={{ width: "60px", height: "3px", background: "#2563EB", margin: "0.75rem auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {PROJECTS.map(p => (
            <div key={p.title} className="project-card" style={{
              background: "#1a1a1a", borderRadius: "12px", padding: "1.75rem",
              border: "1px solid #2a2a2a", transition: "all 0.3s",
            }}>
              <h3 style={{ fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.95rem" }}>{p.title}</h3>
              <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "1.2rem" }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: "0.7rem", padding: "0.22rem 0.6rem",
                    background: "rgba(37, 99, 235, 0.15)", color: "#2563EB",
                    borderRadius: "4px", border: "1px solid rgba(37, 99, 235, 0.3)", fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-me" style={{ padding: "5rem", background: "#1a1a1a" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Contact <span style={{ color: "#2563EB" }}>Me</span></h2>
          <div style={{ width: "60px", height: "3px", background: "#2563EB", margin: "0.75rem auto 0" }} />
        </div>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          {["Your Name", "Your Email", "Subject"].map(ph => (
            <input key={ph} placeholder={ph} className="contact-input" style={{
              width: "100%", padding: "0.85rem 1.1rem", marginBottom: "1rem",
              background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px",
              color: "#fff", fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif",
              transition: "border-color 0.2s",
            }} />
          ))}
          <textarea placeholder="Your Message" className="contact-input" rows={5} style={{
            width: "100%", padding: "0.85rem 1.1rem", marginBottom: "1.5rem",
            background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px",
            color: "#fff", fontSize: "0.88rem", fontFamily: "'Poppins', sans-serif",
            resize: "vertical", transition: "border-color 0.2s",
          }} />
          <div style={{ textAlign: "center" }}>
            <button className="hire-btn" style={{
              background: "#2563EB", color: "#fff", border: "2px solid #2563EB",
              borderRadius: "8px", padding: "0.85rem 2.5rem",
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9rem",
              cursor: "pointer", transition: "all 0.3s",
            }}>Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#111", borderTop: "1px solid #222",
        padding: "1.5rem", textAlign: "center",
        fontSize: "0.8rem", color: "#555",
      }}>
        © {new Date().getFullYear()} Prakhar Shukla · Built with React
      </footer>
    </div>
  );
}