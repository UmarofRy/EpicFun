import React, { useState } from 'react';
import '../styles/Rules.css';

const Rules = () => {
  const [selectedSection, setSelectedSection] = useState('umumiy');

  const ruleSections = {
    umumiy: {
      title: "Umumiy Qoidalar",
      rules: [
        {
          id: 1,
          title: "Hurmat va Odoblilik",
          description: "Barcha o'yinchilar va administratorlarga hurmat bilan muomala qiling.",
          details: [
            "Hech kimni haqorat qilmang yoki kamsitmang",
            "Irqchilik, seksizm va har qanday kamsitishga yo'l qo'ymang",
            "Boshqa o'yinchilarning din va e'tiqodlariga hurmat ko'rsating",
            "Odobsiz so'zlar va haqoratomuz iboralarni ishlatmang"
          ],
          punishment: "Ogohlantirish → Mute (1-24 soat) → Ban (1-30 kun)"
        },
        {
          id: 2,
          title: "Spam va Reklama",
          description: "Chat va server muhitini spamdan saqlang.",
          details: [
            "Bir xil xabarni qayta-qayta yozmang",
            "Boshqa serverlar reklamasini qilmang",
            "Shaxsiy ma'lumotlar (Discord, Telegram) ni ommaviy chatda ulashmang",
            "CAPS LOCK bilan yozmang (Baqirish)"
          ],
          punishment: "Mute (30 daqiqa - 24 soat)"
        },
        {
          id: 3,
          title: "O'yin Nomlari",
          description: "Mos va odobli o'yin nomlaridan foydalaning.",
          details: [
            "Haqoratomuz yoki nojo'ya nomlardan foydalanmang",
            "Boshqa mashhur o'yinchilar nomiga o'xshatmang",
            "Administratorlar nomlariga taqlid qilmang",
            "16 belgidan oshmasin va o'qilishi oson bo'lsin"
          ],
          punishment: "Majburiy nom o'zgartirish"
        }
      ]
    },
    oyinchi: {
      title: "O'yin Qoidalari",
      rules: [
        {
          id: 4,
          title: "Griefing (Buzg'unchilik)",
          description: "Boshqa o'yinchilarning binolari va hududlarini buzmang.",
          details: [
            "Boshqa o'yinchilar binolarini buzmang yoki o'zgartirmang",
            "Begona yerlardan resurslar olib ketmang",
            "PvP zonasidan tashqarida o'yinchilarga zarar bermang",
            "Tuzoqlar qo'ymang (faqat o'z hududingizda)"
          ],
          punishment: "Ban (1-30 kun) + Zarar qoplash"
        },
        {
          id: 5,
          title: "Cheats va Hacks",
          description: "Har qanday noadolat ustunlik beruvchi dasturlar taqiqlanadi.",
          details: [
            "X-Ray, Fly, Speed hack va shunga o'xshash cheatlar",
            "Auto-clicker va makrolar",
            "Duplication (nusxalash) buglaridan foydalanish",
            "Modified clientlar (faqat Optifine ruxsat etiladi)"
          ],
          punishment: "Darhol permanent ban"
        },
        {
          id: 6,
          title: "Savdo va Iqtisod",
          description: "Halol savdo qilish va iqtisodiy faoliyat.",
          details: [
            "Real pul evaziga o'yin buyumlari sotish taqiqlanadi",
            "Firibgarlik va aldash yo'l qo'y ilmaydi",
            "Scam (aldash) holatlarida administrator chaqiring",
            "Bazar narxlarini sud'ma haddan oshirib yubormang"
          ],
          punishment: "Ogohlantirish → Savdo taqiqi → Ban (3-15 kun)"
        }
      ]
    },
    texnik: {
      title: "Texnik Qoidalar",
      rules: [
        {
          id: 7,
          title: "Redstone va Avtomatizatsiya",
          description: "Server unumdorligini pasaytiruvchi qurilmalar taqiqlanadi.",
          details: [
            "Clock (soat) redstone qurilmalari taqiqlanadi",
            "Hopper chanlari 30 tadan oshmasin",
            "Mob fermalar 50x50 blokdan oshmasin",
            "Item duplication buglaridan foydalanmang"
          ],
          punishment: "Qurilmani o'chirish + Ogohlantirish"
        },
        {
          id: 8,
          title: "Binolar va Inshootlar",
          description: "Serverga mos va odobli binolar quring.",
          details: [
            "18+ yoki nojo'ya shakllar qurmang",
            "Server spawnidan 100 blok uzoqroqda quring",
            "Katta binolar uchun administrator ruxsatini oling",
            "AFK fermalar taqiqlanadi"
          ],
          punishment: "Binoni o'chirish + Ogohlantirish"
        }
      ]
    },
    jazo: {
      title: "Jazo Tizimi",
      rules: [
        {
          id: 9,
          title: "Mute Tizimi",
          description: "Chat qoidalarini buzganlar uchun mute jazoları.",
          details: [
            "1-chi marte: 30 daqiqa mute",
            "2-chi marte: 2 soat mute", 
            "3-chi marte: 24 soat mute",
            "Takroriy buzuvchilik: Permanent mute"
          ],
          punishment: "Progressiv mute tizimi"
        },
        {
          id: 10,
          title: "Ban Tizimi",
          description: "Og'ir qoidabuzarliklarga nisbatan ban jazoları.",
          details: [
            "Engil buzish: 1-7 kun ban",
            "O'rta buzish: 1-4 hafta ban",
            "Og'ir buzish: 1-6 oy ban",
            "Hacking/Cheating: Permanent ban"
          ],
          punishment: "Progressiv ban tizimi"
        }
      ]
    }
  };

  const sectionKeys = Object.keys(ruleSections);

  return (
    <div className="rules-container">
      <div className="rules-content">
        {/* Header */}
        <div className="rules-header">
          <h1 className="rules-title">Server Qoidalari</h1>
          <p className="rules-subtitle">
            Barcha o'yinchilar uchun muhim! Bu qoidalar serverda tartib va tinchlikni saqlash uchun yaratilgan.
            Qoidalarni bilmaslik javobgarlikdan ozod qilmaydi.
          </p>
        </div>

        {/* Important Notice */}
        <div className="rules-notice">
          <svg className="notice-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
          </svg>
          <h3 className="notice-title">MUHIM ESLATMA</h3>
          <p className="notice-text">
            Serverda o'ynash orqali siz ushbu qoidalarni o'qib chiqqaningizni va rozi ekaningizni tasdiqlaysiz.
            Qoidalar buzilganda adminlar sizni ogohlantirmasdan jazo bera oladi.
          </p>
        </div>

        <div className="rules-layout">
          {/* Navigation */}
          <div className="rules-navigation">
            <h3 className="nav-title">Bo'limlar</h3>
            <div className="nav-sections">
              {sectionKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedSection(key)}
                  className={`nav-section-btn ${selectedSection === key ? 'active' : ''}`}
                >
                  <span className="nav-section-title">{ruleSections[key].title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="rules-content-area">
            <div className="content-header">
              <h2 className="content-title">
                {ruleSections[selectedSection].title}
              </h2>
            </div>

            <div className="content-rules">
              {ruleSections[selectedSection].rules.map((rule, index) => (
                <div key={rule.id} className="rule-item">
                  <div className="rule-header">
                    <div className="rule-number">{index + 1}</div>
                    <div className="rule-title-section">
                      <h3 className="rule-title">{rule.title}</h3>
                      <p className="rule-description">{rule.description}</p>
                    </div>
                  </div>

                  <div className="rule-content">
                    <h4 className="rule-details-title">Batafsil tushuntirishlar:</h4>
                    <ul className="rule-details-list">
                      {rule.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="rule-detail-item">
                          <span className="detail-bullet">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="rule-punishment">
                      <h5 className="punishment-title">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 18L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z" />
                        </svg>
                        Jazo:
                      </h5>
                      <p className="punishment-text">{rule.punishment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appeal Section */}
        <div className="appeal-section">
          <h3 className="appeal-title">Murojaatlar</h3>
          <p className="appeal-description">
            Agar siz jazoga rozi bo'lmasangiz yoki noto'g'ri jazo olgan deb hisoblasangiz, 
            administratorlarga murojaat qila olasiz.
          </p>
          <div className="appeal-actions">
            <a 
              href="https://t.me/GN_UMAROV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="appeal-button primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.302 1.617-1.124 1.913-1.124 1.913s-.896.297-1.617-.302c-.896-.598-4.066-2.712-4.066-2.712s-.299-.3 0-.599c1.124-1.121 2.712-2.712 3.608-3.608.599-.598.3-.896-.3-.299-1.124.896-4.365 2.712-4.365 2.712s-.598.3-1.421.3c-.599 0-1.617-.302-1.617-.302s-1.124-.599.599-1.124c4.066-1.421 8.729-3.906 8.729-3.906s1.124-.896 1.124 0z"/>
              </svg>
              Telegram orqali Murojaat
            </a>
            <a 
              href="/contact" 
              className="appeal-button secondary"
            >
              Rasmiy Murojaat Yo'li
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="rules-footer">
          <p className="footer-text">
            Qoidalar oxirgi marta yangilangan: <span className="footer-highlight">15-Yanvar, 2024</span>
          </p>
          <p className="footer-text">
            Qoidalar har doim o'zgarishi mumkin. Muntazam tekshirib turing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
