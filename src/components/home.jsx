import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchServerStatus = async () => {
    try {
      const res3 = await fetch("https://api.mcsrvstat.us/3/epicmine.fun");
      const data3 = await res3.json();
      let playersBlock = data3?.players;
      if (!playersBlock || (!playersBlock.list && !playersBlock.sample)) {
        const res2 = await fetch("https://api.mcsrvstat.us/2/epicmine.fun");
        const data2 = await res2.json();
        playersBlock = data2?.players || playersBlock;
      }
      setServerStatus({ ...data3, players: playersBlock });

      const names = playersBlock?.list || playersBlock?.sample || [];
      if (Array.isArray(names)) {
        const mapped = names.map((item, idx) => {
          const name =
            typeof item === "string"
              ? item
              : item?.name || item?.nickname || `player_${idx}`;
          return { id: `${name}-${idx}`, nickname: name, joinTime: "online" };
        });
        setPlayers(mapped);
      } else {
        setPlayers([]);
      }
    } catch (error) {
      console.error("Server holatini olishda xatolik:", error);
      setServerStatus({ online: false, players: { online: 0, max: 0 } });
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Copy IP button removed as per requirements

  const serverModes = [
    {
      id: "anarxiya",
      title: "Anarxiya",
      description: "Qoidasiz survival rejim - har kim o'zi uchun kurashadi",
      features: [
        "PvP zonasi",
        "Raid imkoniyati",
        "Tez resurs yig'ish",
        "Clan tizimi",
        "Ekonomika",
      ],
      status: "active",
      players: "23/50",
      icon: "A",
    },
    {
      id: "boxpvp",
      title: "BoxPVP",
      description: "Tez-tez jang va strategik o'yin rejimi",
      features: [
        "Tezkor janglar",
        "Kit tizimi",
        "Reyting tizimi",
        "Turnirlar",
        "Mukofotlar",
      ],
      status: "active",
      players: "15/30",
      icon: "B",
    },
    {
      id: "battle-royale",
      title: "Battle Royale",
      description: "Oxirgi omon qolgan g'olib bo'ladi",
      features: [
        "Katta xarita",
        "100 o'yinchi",
        "Shrinking zone",
        "Loot tizimi",
        "Squad rejimi",
      ],
      status: "coming-soon",
      players: "Tez orada",
      icon: "BR",
    },
  ];

  const features = [
    {
      title: "Kechikishsiz O'yin",
      description: "Yuqori unumdorlik va barqaror server",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 8V5a3 3 0 00-6 0v3H5a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1h-2zM9 5a1 1 0 112 0v3H9V5z" />
        </svg>
      ),
    },
    {
      title: "Xavfsiz Muhit",
      description: "Anti-cheat va professional moderatorlar",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Kunlik Mukofotlar",
      description: "Har kuni bonuslar va sovrinlar",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      title: "Faol Hamjamiyat",
      description: "O'zbek tilida qo'llab-quvvatlash",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: "500+", label: "Ro'yxatdan o'tgan o'yinchilar" },
    { number: "24/7", label: "Server ishlash vaqti" },
    { number: "99.9%", label: "Uptime kafolati" },
    { number: "1.20.x", label: "Minecraft versiyasi" },
  ];

  const filteredPlayers = players.filter((p) =>
    p.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="https://beastmine.fun/loxcha1.png"
            alt="EPICMINE.FUN Background"
            className="hero-bg-image"
          />
        </div>

        <div className="hero-content">
          <div className="box">
            <div className="hero-logo-container">
              <img
                src="https://yt3.ggpht.com/Zl6P6wUvX1tRVcO_cnC0tTZAav2M4csfGIYHn_pa_8iYoG4AP2HwvZ0Rjyh_D3tSMOIOG7IYMC3NQA=s800-c-fcrop64=1,00000000ffffffff-rw-nd-v1"
                alt="EPICMINE.FUN"
                className="hero-logo-icon"
              />
            </div>

            {/* Server Info Card */}
            <div className="server-info-card">
              <div className="server-info-content">
                <div className="server-ip-section">
                  <span className="ip-label">Server IP:</span>
                  <div className="ip-container">
                    <span className="ip-value">epicmine.fun</span>
                  </div>
                </div>
              </div>

              <div className="server-status-section">
                <div className="server-status-indicator">
                  <div
                    className={`server-status-dot ${
                      serverStatus?.online ? "online" : "offline"
                    }`}
                  ></div>
                  <span className="server-status-text">
                    {serverStatus?.online ? "Server faol" : "Server faol emas"}
                  </span>
                </div>
                <div className="server-players-info">
                  <svg
                    className="server-players-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span className="server-players-count">
                    {serverStatus?.players?.online || 0}/
                    {serverStatus?.players?.max || 100}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button className="play-button">Hoziroq Oynash</button>
            <Link to="/rules" className="info-button">
              Qoidalarni Oqish
            </Link>
          </div>

          {/* Online Players Section */}
          <div className="online-players-section">
            <h3 className="online-players-title">
              Onlayn Oyinchilar ({filteredPlayers.length})
            </h3>
            <div className="players-search">
              <input
                type="text"
                placeholder="Oyinchi nomini qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="players-list">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="player-item">
                  <span className="player-nickname">{player.nickname}</span>
                  <span className="player-time">{player.joinTime}</span>
                </div>
              ))}
              {filteredPlayers.length === 0 && (
                <div className="no-players">Qidiruv natijasi topilmadi</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Server Modes Section */}
      <section className="server-modes-section">
        <div className="server-modes-container">
          <div className="server-modes-header">
            <h2 className="server-modes-title">O'yin Rejimlari</h2>
            <p className="server-modes-subtitle">
              Har xil o'yin uslublariga mos keladigan rejimlarni tanlang
            </p>
          </div>

          <div className="server-modes-grid">
            {serverModes.map((mode) => (
              <div
                key={mode.id}
                className={`server-mode-card ${
                  mode.status === "coming-soon" ? "coming-soon" : ""
                }`}
              >
                <div className="server-mode-icon">{mode.icon}</div>
                <h3 className="server-mode-title">{mode.title}</h3>
                <p className="server-mode-description">{mode.description}</p>

                <div className={`server-mode-status ${mode.status}`}>
                  {mode.status === "active" ? "Faol" : "Qo'shilishi kutilmoqda"}
                </div>

                <ul className="server-mode-features">
                  {mode.features.map((feature, index) => (
                    <li key={index} className="server-mode-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginBottom: "1rem",
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                  }}
                >
                  O'yinchilar: {mode.players}
                </div>

                <button
                  className="server-mode-button"
                  disabled={mode.status === "coming-soon"}
                >
                  {mode.status === "active" ? "O'ynash" : "Tez orada"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Nega EPICMINE.FUN?</h2>
            <p className="features-subtitle">
              O'zbekistondagi eng yaxshi Minecraft server tajribasi
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <h2 className="stats-title">Server Statistikalari</h2>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">O'ynashga Tayyormisiz?</h2>
          <p className="cta-description">
            Bizning hamjamiyatga qo'shiling va eng yaxshi Minecraft tajribasini
            boshdan kechiring!
          </p>
          <div className="cta-actions">
            <Link to="/register" className="cta-primary-button">
              Hoziroq Qo'shilish
            </Link>
            <Link to="/donate" className="cta-secondary-button">
              Serverni Qo'llab-quvvatlash
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
