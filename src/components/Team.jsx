import React from 'react';
import '../styles/Team.css';

const Team = () => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('epic_team_members') : null;
  const teamMembers = saved ? JSON.parse(saved) : [
    {
      id: "1",
      nickname: "EpicAdmin",
      role: "Owner",
      roleColor: "text-red-400",
      avatar: "https://crafatar.com/avatars/EpicAdmin?size=128&overlay",
      telegram: "@epicadmin",
      description: "Server owner va asoschi. Barcha muhim qarorlar qabul qiladi.",
      joinDate: "2024-01-01",
      achievements: ["Server yaratuvchisi", "10+ yillik Minecraft tajriba", "Java developer"]
    },
    {
      id: 2,
      nickname: "ModeratorUz",
      role: "Admin",
      roleColor: "text-orange-400",
      avatar: "https://crafatar.com/avatars/ModeratorUz?size=128&overlay",
      telegram: "@moderatoruz",
      description: "Server admin, o'yinchilar bilan ishlaydi va qoidalarni nazorat qiladi.",
      joinDate: "2024-01-05",
      achievements: ["1000+ ban/unban", "Community manager", "Event organizer"]
    },
    {
      id: 3,
      nickname: "HelperPro",
      role: "Moderator",
      roleColor: "text-blue-400",
      avatar: "https://crafatar.com/avatars/HelperPro?size=128&overlay",
      telegram: "@helperpro",
      description: "Yangi o'yinchilarga yordam beradi va serverda tartibni saqlaydi.",
      joinDate: "2024-01-10",
      achievements: ["500+ yordam", "Chat moderator", "Bug reporter"]
    },
    {
      id: 4,
      nickname: "BuildMaster",
      role: "Builder",
      roleColor: "text-green-400",
      avatar: "https://crafatar.com/avatars/BuildMaster?size=128&overlay",
      telegram: "@buildmaster",
      description: "Server spawn va maxsus binolarini quradi.",
      joinDate: "2024-01-15",
      achievements: ["Spawn builder", "Creative expert", "Redstone engineer"]
    },
    {
      id: 5,
      nickname: "DevCoder",
      role: "Developer",
      roleColor: "text-purple-400",
      avatar: "https://crafatar.com/avatars/DevCoder?size=128&overlay",
      telegram: "@devcoder",
      description: "Plugin developer va server texnik qismini boshqaradi.",
      joinDate: "2024-01-20",
      achievements: ["Custom plugin developer", "Server optimization", "Database admin"]
    },
    {
      id: 6,
      nickname: "EventManager",
      role: "Event Host",
      roleColor: "text-yellow-400",
      avatar: "https://crafatar.com/avatars/EventManager?size=128&overlay",
      telegram: "@eventmanager",
      description: "Server tadbirlarini tashkil qiladi va o'yinchilar bilan o'ynaydi.",
      joinDate: "2024-01-25",
      achievements: ["50+ event", "Community builder", "Prize distributor"]
    }
  ];

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Owner': return 'O';
      case 'Admin': return 'A';
      case 'Moderator': return 'M';
      case 'Builder': return 'B';
      case 'Developer': return 'D';
      case 'Event Host': return 'E';
      default: return 'P';
    }
  };

  const getTimeOnServer = (joinDate) => {
    const now = new Date();
    const joined = new Date(joinDate);
    const diffInDays = Math.floor((now - joined) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 30) return `${diffInDays} kun`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} oy`;
    return `${Math.floor(diffInDays / 365)} yil`;
  };

  return (
    <div className="team-container">
      <div className="team-content">
        {/* Header */}
        <div className="team-header">
          <h1 className="team-title">
            Jamoa A'zolari
          </h1>
          <p className="team-subtitle">
            EPICMINE.FUN serverini boshqaradigan professional jamoa
          </p>
          <div className="team-notice">
            <p className="team-notice-text">
              Bizning jamoamiz 24/7 sizga xizmat qiladi!
            </p>
          </div>
        </div>

        {/* Team Stats */}
        <div className="team-stats">
          <div className="stat-card">
            <div className="stat-number">{teamMembers.length}</div>
            <div className="stat-label">Jamoa a'zolari</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Qo'llab-quvvatlash</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Yechilgan muammolar</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5+</div>
            <div className="stat-label">Yillik tajriba</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-avatar-section">
                {/* Avatar */}
                <div className="member-avatar-container">
                  <img
                    src={member.avatar}
                    alt={member.nickname}
                    className="member-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${member.nickname}&background=FFD700&color=0D1117&size=128`;
                    }}
                  />
                  <div className="member-role-icon">
                    {getRoleIcon(member.role)}
                  </div>
                  <div className="member-status-dot"></div>
                </div>

                {/* Name and Role */}
                <h3 className="member-nickname">{member.nickname}</h3>
                <p className={`member-role ${member.role.toLowerCase()}`}>
                  {member.role}
                </p>
                <p className="member-duration">
                  Jamoada: {getTimeOnServer(member.joinDate)}
                </p>
              </div>

              {/* Description */}
              <p className="member-description">
                {member.description}
              </p>

              {/* Achievements */}
              <div className="member-achievements">
                <h4 className="achievements-title">Yutuqlari:</h4>
                <ul className="achievements-list">
                  {(member.achievements || []).map((achievement, index) => (
                    <li key={index} className="achievement-item">
                      <span className="achievement-icon">*</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="member-contact">
                <a
                  href={`https://t.me/${member.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                >
                  <span className="contact-icon">TG</span>
                  {member.telegram}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team Section */}
        <div className="join-team-section">
          <h2 className="join-team-title">
            Jamoaga qo'shilmoqchimisiz?
          </h2>
          <p className="join-team-description">
            Agar sizda Minecraft bo'yicha tajriba bor va serverimizni rivojlantirishga yordam
            bermoqchi bo'lsangiz, biz bilan bog'laning!
          </p>

          <div className="positions-grid">
            <div className="position-card">
              <div className="position-icon">M</div>
              <h3 className="position-title">Moderator</h3>
              <p className="position-description">Chat va o'yinchilarni nazorat qilish</p>
            </div>
            <div className="position-card">
              <div className="position-icon">B</div>
              <h3 className="position-title">Builder</h3>
              <p className="position-description">Server uchun qurilishlar</p>
            </div>
            <div className="position-card">
              <div className="position-icon">D</div>
              <h3 className="position-title">Developer</h3>
              <p className="position-description">Plugin development</p>
            </div>
            <div className="position-card">
              <div className="position-icon">E</div>
              <h3 className="position-title">Event Host</h3>
              <p className="position-description">Tadbirlar tashkil qilish</p>
            </div>
          </div>

          <div className="requirements-card">
            <h3 className="requirements-title">Talablar:</h3>
            <ul className="requirements-list">
              <li className="requirement-item">• 16+ yosh</li>
              <li className="requirement-item">• Minecraft bo'yicha kamida 2 yillik tajriba</li>
              <li className="requirement-item">• O'zbek yoki Rus tillarini bilish</li>
              <li className="requirement-item">• Haftada kamida 10 soat faol bo'lish</li>
              <li className="requirement-item">• Jamoaviy ishlash ko'nikmasi</li>
            </ul>
          </div>

          <a
            href="https://t.me/EpicMineChannel"
            target="_blank"
            rel="noopener noreferrer"
            className="apply-btn"
          >
            Ariza yuborish
          </a>
        </div>

        {/* Contact Team */}
        <div className="contact-team-section">
          <h3 className="contact-team-title">Jamoa bilan bog'lanish</h3>
          <p className="contact-team-description">
            Savollaringiz yoki takliflaringiz bo'lsa, biz bilan bog'laning
          </p>
          <div className="contact-team-actions">
            <a
              href="https://t.me/EpicMineChannel"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-team-btn primary"
            >
              Telegram kanal
            </a>
            <a
              href="/contact"
              className="contact-team-btn secondary"
            >
              Aloqa sahifasi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
