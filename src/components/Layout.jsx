import React from 'react';
import Header from './Header';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      
      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-about">
              <div className="footer-brand">
                <div className="footer-logo-icon">E</div>
                <h3 className="footer-brand-title">EPICMINE.FUN</h3>
              </div>
              <p className="footer-description">
                O'zbekistondagi eng professional va barqaror Minecraft serveri. 
                Yuqori sifat, faol hamjamiyat va qiziqarli o'yin tajribasi.
              </p>
              <div className="footer-social">
                <a 
                  href="https://t.me/EpicMineChannel" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link telegram"
                  aria-label="Telegram"
                >
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.302 1.617-1.124 1.913-1.124 1.913s-.896.297-1.617-.302c-.896-.598-4.066-2.712-4.066-2.712s-.299-.3 0-.599c1.124-1.121 2.712-2.712 3.608-3.608.599-.598.3-.896-.3-.299-1.124.896-4.365 2.712-4.365 2.712s-.598.3-1.421.3c-.599 0-1.617-.302-1.617-.302s-1.124-.599.599-1.124c4.066-1.421 8.729-3.906 8.729-3.906s1.124-.896 1.124 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UC2bpeleIpI58bByss8y8Yfg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link youtube"
                  aria-label="YouTube"
                >
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Tezkor Havolalar</h4>
              <ul className="footer-links">
                <li className="footer-link">
                  <a href="/">Bosh sahifa</a>
                </li>
                <li className="footer-link">
                  <a href="/players">O'yinchilar</a>
                </li>
                <li className="footer-link">
                  <a href="/rules">Qoidalar</a>
                </li>
                <li className="footer-link">
                  <a href="/donate">Do'kon</a>
                </li>
                <li className="footer-link">
                  <a href="/contact">Aloqa</a>
                </li>
              </ul>
            </div>

            {/* Server Info */}
            <div className="footer-section">
              <h4 className="footer-section-title">Server Ma'lumotlari</h4>
              <div className="server-info">
                <div className="server-info-row">
                  <span className="info-label">IP:</span>
                  <span className="info-value ip">epicmine.fun</span>
                </div>
                <div className="server-info-row">
                  <span className="info-label">Versiya:</span>
                  <span className="info-value">1.20.x</span>
                </div>
                <div className="server-info-row">
                  <span className="info-label">Turi:</span>
                  <span className="info-value status">Premium</span>
                </div>
                <div className="server-info-row">
                  <span className="info-label">Joylashuv:</span>
                  <span className="info-value">O'zbekiston</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h4 className="footer-section-title">Qo'llab-quvvatlash</h4>
              <div className="support-section">
                <p className="support-description">
                  Yordam kerakmi? Bizning qo'llab-quvvatlash xizmati 24/7 ishlaydi.
                </p>
                <a 
                  href="https://t.me/GN_UMAROV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-button"
                >
                  <svg className="support-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.302 1.617-1.124 1.913-1.124 1.913s-.896.297-1.617-.302c-.896-.598-4.066-2.712-4.066-2.712s-.299-.3 0-.599c1.124-1.121 2.712-2.712 3.608-3.608.599-.598.3-.896-.3-.299-1.124.896-4.365 2.712-4.365 2.712s-.598.3-1.421.3c-.599 0-1.617-.302-1.617-.302s-1.124-.599.599-1.124c4.066-1.421 8.729-3.906 8.729-3.906s1.124-.896 1.124 0z"/>
                  </svg>
                  Telegram Support
                </a>
                <div className="support-contacts">
                  <p>Admin: @GN_UMAROV</p>
                  <p>Email: ryumarof@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © 2024 EPICMINE.FUN. Barcha huquqlar himoyalangan.
              </p>
              <div className="footer-links-bottom">
                <a href="/rules">Qoidalar</a>
                <span className="footer-divider">•</span>
                <a href="/contact">Maxfiylik</a>
                <span className="footer-divider">•</span>
                <span className="footer-highlight">Ozbek Minecraft hamjamiyati uchun</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
