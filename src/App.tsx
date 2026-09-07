import { useEffect, useRef, useState, type PointerEvent } from "react";

type Panel = "about" | "work" | "contact";

const Icon = ({ name }: { name: Panel | "close" | "discord" | "music" }) => {
  if (name === "music") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18V6l10-2v12" />
        <circle cx="6.5" cy="18" r="2.3" />
        <circle cx="16.5" cy="16" r="2.3" />
      </svg>
    );
  }

  if (name === "about") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.7-4.1 2.8-6.2 6.5-6.2s5.8 2.1 6.5 6.2" />
      </svg>
    );
  }

  if (name === "work") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M14 4l-4 16" />
      </svg>
    );
  }

  if (name === "contact") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5h16v11H4z" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    );
  }

  if (name === "discord") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.3 7.1A13 13 0 0 1 12 6.5c1.3 0 2.5.2 3.7.6 1.1 1.5 1.9 3.4 2.1 5.4-1.4 1.4-3 2.2-4.7 2.6l-.6-.9c.7-.2 1.3-.5 1.9-.9-1.5.7-3.3.7-4.8 0 .6.4 1.2.7 1.9.9l-.6.9c-1.7-.4-3.3-1.2-4.7-2.6.2-2 .9-3.9 2.1-5.4Z" />
        <circle cx="9.5" cy="11.3" r=".7" />
        <circle cx="14.5" cy="11.3" r=".7" />
      </svg>
    );
  }

  return null;
};

const panels: Record<Panel, { index: string; title: string; body: React.ReactNode }> = {
  about: {
    index: "IDENTITY / 01",
    title: "Quiet presence.\nClear intent.",
    body: (
      <p>
        ZeeRa builds custom FiveM experiences and Minecraft systems with a
        focus on performance, community, and polished player interactions.
      </p>
    ),
  },
  work: {
    index: "SELECTED / 02",
    title: "Built at the edge\nof image + code.",
    body: (
      <div className="work-list">
        <span>FiveM development</span>
        <span>Minecraft development</span>
        <span>Community integrations</span>
      </div>
    ),
  },
  contact: {
    index: "OPEN LINE / 03",
    title: "Let’s make a\nlasting signal.",
    body: (
      <a
        className="contact-link"
        href="https://discord.gg/E2XHc8W44A"
        target="_blank"
        rel="noreferrer"
      >
        Join the Discord <span>↗</span>
      </a>
    ),
  },
};

export function App() {
  const [activePanel, setActivePanel] = useState<Panel | null>(null);
  const [activeSkill, setActiveSkill] = useState<"fivem" | "minecraft" | null>(null);
  const [time, setTime] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.volume = 0.5;
      audio
        .play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    }
  };

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
  };

  return (
    <main className="portfolio motion-on" onPointerMove={trackPointer}>
      <div className="portrait-field" aria-hidden="true" />
      <div className="fog fog-one" aria-hidden="true" />
      <div className="fog fog-two" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <audio ref={audioRef} src="/theme-song.mp3" loop preload="none" />

      <header className="masthead">
        <a className="monogram" href="#home" aria-label="ZeeRa home">
          <img src="/zeera-logo.png" alt="ZeeRa developer logo" />
        </a>
        <p>PERSONAL SIGNAL / MMXXVI</p>
      </header>

      <section className="stage" id="home" aria-label="ZeeRa portfolio introduction">
        <div className={`profile-card ${activePanel ? "is-open" : ""}`}>
          <div className="card-shine" aria-hidden="true" />
          <div className="portrait-wrap">
            <img
              className="avatar-decoration"
              src="/avatar-decoration.gif"
              alt=""
              aria-hidden="true"
            />
            <div className="portrait-ring">
              <img src="/profile.jpg" alt="Portrait of ZeeRa" />
            </div>
            <span className="status-dot" aria-label="Available for projects" />
          </div>

          <div className="identity">
            <p className="handle">ZeeRa <span>[zR]</span></p>
            <h1>
              ZEERA<span>/</span>
              <img className="verified-badge" src="/verified.gif" alt="Verified" />
            </h1>
            <p className="role">FIVEM + MINECRAFT DEVELOPER</p>
            <div className={`skill-popover ${activeSkill ? "show" : ""}`} aria-live="polite">
              {activeSkill === "fivem" && <span>FiveM · ESX · QBOX · QBCORE</span>}
              {activeSkill === "minecraft" && <span>Minecraft · All</span>}
            </div>
            <div className="credential-row" aria-label="Developer badges">
              <button
                type="button"
                className={`credential skill-button ${activeSkill === "fivem" ? "selected" : ""}`}
                onClick={() => setActiveSkill(activeSkill === "fivem" ? null : "fivem")}
                aria-label="Show FiveM frameworks"
                aria-pressed={activeSkill === "fivem"}
              >
                <img className="platform-icon" src="/fivem.png" alt="FiveM" />
              </button>
              <button
                type="button"
                className={`credential skill-button ${activeSkill === "minecraft" ? "selected" : ""}`}
                onClick={() => setActiveSkill(activeSkill === "minecraft" ? null : "minecraft")}
                aria-label="Show Minecraft support"
                aria-pressed={activeSkill === "minecraft"}
              >
                <img className="platform-icon" src="/minecraft.png" alt="Minecraft" />
              </button>
              <span className="credential" title="Developer">
                <img src="/developer.png" alt="Developer badge" />
              </span>
              <a
                className="credential"
                href="https://discord.gg/E2XHc8W44A"
                target="_blank"
                rel="noreferrer"
                title="Join Discord"
              >
                <img src="/snowball.png" alt="Discord badge" />
              </a>
            </div>
          </div>

          <nav className="signal-nav" aria-label="Portfolio sections">
            {(["about", "work", "contact"] as Panel[]).map((item) => (
              <button
                key={item}
                type="button"
                className={activePanel === item ? "active" : ""}
                onClick={() => setActivePanel(activePanel === item ? null : item)}
                aria-label={`Open ${item}`}
                aria-pressed={activePanel === item}
              >
                <Icon name={item} />
                <span>{item}</span>
              </button>
            ))}
          </nav>

          <div className="card-line" aria-hidden="true" />
          <a
            className="discord-link"
            href="https://discord.gg/E2XHc8W44A"
            target="_blank"
            rel="noreferrer"
            aria-label="Join ZeeRa on Discord"
          >
            <Icon name="discord" />
            <span>JOIN DISCORD</span>
          </a>
        </div>

        <aside className={`detail-panel ${activePanel ? "visible" : ""}`} aria-live="polite">
          {activePanel && (
            <>
              <button
                type="button"
                className="panel-close"
                onClick={() => setActivePanel(null)}
                aria-label="Close panel"
              >
                <Icon name="close" />
              </button>
              <p className="panel-index">{panels[activePanel].index}</p>
              <h2>
                {panels[activePanel].title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <div className="panel-body">{panels[activePanel].body}</div>
            </>
          )}
        </aside>
      </section>

      <footer className="footer-line">
        <p><span>{time}</span><i />ZEERA SIGNAL ACTIVE</p>
        <p>© 2026 ZEERA / <span>WORLD WIDE WEB</span></p>
      </footer>

      <button
        className="music-toggle"
        type="button"
        onClick={toggleMusic}
        aria-label={`${musicOn ? "Pause" : "Play"} theme song`}
        aria-pressed={musicOn}
      >
        <Icon name="music" />
        <span>{musicOn ? "SOUND ON" : "SOUND OFF"}</span>
      </button>

    </main>
  );
}
