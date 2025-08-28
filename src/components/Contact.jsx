import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send message to Telegram bot
      const telegramMessage = `
EPICMINE.FUN - Yangi xabar

Ism: ${formData.name}
Email: ${formData.email}
Mavzu: ${formData.subject}

Xabar:
${formData.message}

Vaqt: ${new Date().toLocaleString('uz-UZ')}
      `;

      const telegramResponse = await fetch(`https://api.telegram.org/bot8382226292:AAG900rO7Ls3QkI3XSxDynZ5JAnducFWTLQ/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '6092051746',
          text: telegramMessage,
          parse_mode: 'HTML'
        }),
      });

      if (telegramResponse.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Telegram xabarini yuborishda xatolik');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Xabar yuborishda xatolik yuz berdi. Iltimos, boshqa usul bilan bog\'laning.');
    }

    setLoading(false);
  };

  const contactMethods = [
    {
      name: "Telegram kanal",
      icon: "TG",
      value: "@EpicMineChannel",
      link: "https://t.me/EpicMineChannel",
      description: "Eng tez javob olish uchun"
    },
    {
      name: "YouTube kanal",
      icon: "YT",
      value: "EPICMINE.FUN",
      link: "https://www.youtube.com/channel/UC2bpeleIpI58bByss8y8Yfg",
      description: "Video kontentlar va darsliklar"
    },
    {
      name: "Server IP",
      icon: "IP",
      value: "epicmine.fun:2223",
      link: null,
      description: "Oyinda adminlar bilan gaplashing"
    },
    {
      name: "Support Email",
      icon: "@",
      value: "support@epicmine.fun",
      link: "mailto:support@epicmine.fun",
      description: "Rasmiy email manzil"
    }
  ];

  const faqItems = [
    {
      question: "Server qanday versiyada ishlaydi?",
      answer: "EPICMINE.FUN serveri Minecraft 1.20.x versiyasida ishlaydi. Premium va cracked hisoblar qo'llab-quvvatlanadi."
    },
    {
      question: "Donat qilgandan keyin imkoniyatlar qachon beriladi?",
      answer: "To'lov tasdiqlangandan so'ng 5-10 daqiqa ichida avtomatik ravishda beriladi. Agar kechiksa, admin bilan bog'laning."
    },
    {
      question: "Serverda cheat ishlatish mumkinmi?",
      answer: "Yo'q! Har qanday cheat, hack yoki mod ishlatish qat'iyan taqiqlangan va doimiy ban bilan jazolanadi."
    },
    {
      question: "Qanday qilib admin bo'lish mumkin?",
      answer: "Admin bo'lish uchun ariza yuborish kerak. Kamida 2 yillik Minecraft tajriba va 16+ yosh talab qilinadi."
    },
    {
      question: "Server lag'i bo'lsa nima qilish kerak?",
      answer: "Avval internetingizni tekshiring. Agar muammo davom etsa, support'ga xabar bering."
    },
    {
      question: "Ban olinganimni qanday bilaman?",
      answer: "Serverga kirayotganda ban sababi ko'rsatiladi. Ban ro'yxatini saytda ham ko'rish mumkin."
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-content">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">
            Biz bilan bog'laning
          </h1>
          <p className="contact-subtitle">
            EPICMINE.FUN jamoasi sizning savollaringizga javob berishga tayyor
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="form-section-title">
              Xabar yuborish
            </h2>

            {success ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3 className="success-title">Xabar yuborildi!</h3>
                <p className="success-text">
                  Xabaringiz muvaffaqiyatli yuborildi. Tez orada javob beramiz.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="success-btn"
                >
                  Yangi xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ismingizni kiriting"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Mavzu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Mavzuni tanlang</option>
                    <option value="Texnik yordam">Texnik yordam</option>
                    <option value="Donat masalalari">Donat masalalari</option>
                    <option value="Jamoa arizasi">Jamoa arizasi</option>
                    <option value="Bug report">Bug report</option>
                    <option value="Taklif">Taklif</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Xabar *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Xabaringizni batafsil yozing..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="form-submit-btn"
                >
                  {loading ? (
                    <div className="loading-content">
                      <div className="loading-spinner"></div>
                      Yuborilmoqda...
                    </div>
                  ) : (
                    'Xabar yuborish'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Methods */}
          <div className="contact-info-section">
            <div className="contact-methods">
              <h2 className="info-section-title">
                Aloqa usullari
              </h2>

              <div className="methods-list">
                {contactMethods.map((method, index) => (
                  <div key={index} className="method-item">
                    <div className="method-content">
                      <div className="method-info">
                        <div className="method-icon">{method.icon}</div>
                        <div className="method-details">
                          <h3 className="method-name">{method.name}</h3>
                          <p className="method-value">{method.value}</p>
                          <p className="method-description">{method.description}</p>
                        </div>
                      </div>
                      {method.link && (
                        <a
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="method-btn"
                        >
                          Bog'lanish
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-epic-gray rounded-2xl p-8 border border-epic-gray-light">
              <h2 className="text-2xl font-bold text-white mb-6">
                Support vaqtlari
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Dushanba - Juma</span>
                  <span className="text-epic-yellow font-medium">09:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Shanba - Yakshanba</span>
                  <span className="text-epic-yellow font-medium">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">O'rtacha javob vaqti</span>
                  <span className="text-green-400 font-medium">2-4 soat</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-epic-yellow/10 border border-epic-yellow rounded-lg">
                <p className="text-epic-yellow text-sm">
                  Tezkor javob olish uchun Telegram kanalimizdan foydalaning
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tez-tez soraladigan savollar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-epic-gray rounded-xl p-6 border border-epic-gray-light">
                <h3 className="text-lg font-bold text-epic-yellow mb-3">{item.question}</h3>
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center">
          <div className="bg-red-500/10 border border-red-500 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Shoshilinch holat
            </h3>
            <p className="text-red-300 mb-6">
              Agar serverda jiddiy muammo (cheat, hack, to'lov muammosi) bo'lsa, 
              darhol Telegram orqali bog'laning
            </p>
            <a 
              href="https://t.me/EpicMineChannel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
            >
              Darhol boglanish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
