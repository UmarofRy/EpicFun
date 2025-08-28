import React, { useState, useEffect } from 'react';
import '../styles/Donate.css';

const Donate = () => {
  const [selectedCategory, setSelectedCategory] = useState('ranks');
  const [loading, setLoading] = useState(true);

  // This data should be editable from Admin Panel
  const [donateData, setDonateData] = useState({
    ranks: [],
    tokens: [],
    coins: []
  });

  useEffect(() => {
    fetchDonateData();
  }, []);

  const fetchDonateData = async () => {
    try {
      // Try to load from localStorage (managed in Admin Panel)
      const saved = localStorage.getItem('epic_shop_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setDonateData({
          ranks: parsed.ranks || [],
          tokens: parsed.tokens || [],
          coins: parsed.coins || []
        });
        setLoading(false);
        return;
      }
      // Fallback mock data
      const mockData = {
        ranks: [
          {
            id: 'vip',
            name: 'VIP',
            description: 'Asosiy VIP imtiyozlari va maxsus buyruqlar',
            price: 50000,
            originalPrice: 75000,
            duration: '30 kun',
            features: [
              'VIP prefix va rang',
              '/fly buyrug\'i',
              '/heal buyrug\'i',
              '/feed buyrug\'i',
              'Maxsus VIP spawn',
              '2x XP bonus',
              'Kit VIP har 24 soatda',
              'Telegram bot orqali server statistika'
            ],
            popular: false,
            discount: 33
          },
          {
            id: 'premium',
            name: 'Premium',
            description: 'Kengaytirilgan imtiyozlar va maxsus kontentlar',
            price: 120000,
            originalPrice: 150000,
            duration: '30 kun',
            features: [
              'Premium prefix va rang',
              'Barcha VIP imtiyozlari',
              '/tp <player> buyrug\'i',
              '/tphere <player> buyrug\'i',
              '/god buyrug\'i',
              '3x XP bonus',
              'Kit Premium har 12 soatda',
              'Maxsus Premium dunyo',
              'Creative mode kirish',
              'Maxsus pet va mount'
            ],
            popular: true,
            discount: 20
          },
          {
            id: 'ultimate',
            name: 'Ultimate',
            description: 'Eng yuqori darajadagi imtiyozlar va barcha kontentlar',
            price: 200000,
            originalPrice: 300000,
            duration: '30 kun',
            features: [
              'Ultimate prefix va rang',
              'Barcha Premium imtiyozlari',
              '/gamemode buyrug\'i',
              '/time buyrug\'i',
              '/weather buyrug\'i',
              '5x XP bonus',
              'Kit Ultimate har 6 soatda',
              'Shaxsiy /warp yaratish',
              'Cheksiz /home',
              'Barcha dunyo va rejimlar',
              'Maxsus Ultimate skin',
              'Yagona Ultimate title'
            ],
            popular: false,
            discount: 33
          }
        ],
        tokens: [
          {
            id: 'token_small',
            name: 'Donat Token (Kichik)',
            description: 'Maxsus buyumlar va imtiyozlar sotib olish uchun',
            amount: '100 Token',
            price: 25000,
            uses: [
              'Maxsus qurollar',
              'Noyob enchantlar',
              'Pet sotib olish',
              'Kosmetik itemlar'
            ]
          },
          {
            id: 'token_medium',
            name: 'Donat Token (O\'rta)',
            description: 'Ko\'proq imkoniyatlar va maxsus kontentlar',
            amount: '250 Token',
            price: 50000,
            uses: [
              'Barcha kichik token imkoniyatlari',
              'Shaxsiy /warp',
              'Vault ruxsatlari',
              'Maxsus spawn'
            ]
          },
          {
            id: 'token_large',
            name: 'Donat Token (Katta)',
            description: 'Eng ko\'p token va barcha imkoniyatlar',
            amount: '500 Token',
            price: 90000,
            uses: [
              'Barcha token imkoniyatlari',
              'VIP hududlar',
              'Maxsus eventlar',
              'Premium qo\'llab-quvvatlash'
            ]
          }
        ],
        coins: [
          {
            id: 'coin_small',
            name: 'Donat Coin (Kichik)',
            description: 'O\'yin ichidagi pul va resurslar',
            amount: '10,000 Coin',
            price: 15000,
            uses: [
              'Shop dan xarid',
              'Auction ishtirok',
              'Player-to-player savdo',
              'Kichik xizmatlar'
            ]
          },
          {
            id: 'coin_medium',
            name: 'Donat Coin (O\'rta)',
            description: 'Ko\'proq pul va xarid imkoniyatlari',
            amount: '25,000 Coin',
            price: 30000,
            uses: [
              'Barcha kichik coin imkoniyatlari',
              'Katta xaridlar',
              'Land sotib olish',
              'Business investment'
            ]
          },
          {
            id: 'coin_large',
            name: 'Donat Coin (Katta)',
            description: 'Eng ko\'p pul va barcha imkoniyatlar',
            amount: '75,000 Coin',
            price: 75000,
            uses: [
              'Barcha coin imkoniyatlari',
              'Server business',
              'Katta investitsiyalar',
              'Premium xizmatlar'
            ]
          }
        ]
      };
      
      setDonateData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Donat ma\'lumotlarini olishda xatolik:', error);
      setLoading(false);
    }
  };

  const categories = [
    { id: 'ranks', name: 'Ranklar', description: 'VIP va Premium ranklar' },
    { id: 'tokens', name: 'Tokenlar', description: 'Donat token paketlari' },
    { id: 'coins', name: 'Coinlar', description: 'O\'yin puli paketlari' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const handleBuyClick = (itemName) => {
    // Redirect to Telegram as specified in requirements
    const telegramUrl = 'https://t.me/GN_UMAROV';
    const message = `Salom! Men ${itemName} sotib olmoqchiman. Iltimos, yordam bering.`;
    const fullUrl = `${telegramUrl}?text=${encodeURIComponent(message)}`;
    window.open(fullUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Yuklanmoqda...</p>
      </div>
    );
  }

  const currentData = donateData[selectedCategory] || [];

  return (
    <div className="donate-container">
      <div className="donate-content">
        {/* Header */}
        <div className="donate-header">
          <h1 className="donate-title">Donation Shop</h1>
          <p className="donate-subtitle">
            Serverni qo'llab-quvvatlang va maxsus imtiyozlar oling
          </p>
          
          <div className="donate-support-info">
            <div className="support-stat">
              <span className="support-number">245</span>
              <span className="support-label">Bu oyda yordam berganlar</span>
            </div>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="benefits-banner">
          <div className="benefit-item">
            <span className="benefit-icon">!</span>
            <span className="benefit-text">Darhol yetkazib berish</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">S</span>
            <span className="benefit-text">Xavfsiz tolov</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">24/7</span>
            <span className="benefit-text">Qollab-quvvatlash</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">+</span>
            <span className="benefit-text">Bonus va chegirmalar</span>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="category-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            >
              <div className="category-info">
                <span className="category-name">{category.name}</span>
                <span className="category-desc">{category.description}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Ranks Section */}
        {selectedCategory === 'ranks' && (
          <div className="packages-grid">
            {currentData.map((rank) => (
              <div key={rank.id} className={`package-card ${rank.popular ? 'popular' : ''}`}>
                {rank.popular && (
                  <div className="popular-badge">
                    <span>TOP</span>
                    Mashhur
                  </div>
                )}
                
                {rank.discount && (
                  <div className="discount-badge">
                    -{rank.discount}%
                  </div>
                )}

                <div className="package-header">
                  <h3 className="package-title">{rank.name}</h3>
                  <p className="package-description">{rank.description}</p>
                </div>

                <div className="package-pricing">
                  <div className="price-main">
                    <span className="price-current">{formatPrice(rank.price)}</span>
                    {rank.originalPrice && (
                      <span className="price-original">{formatPrice(rank.originalPrice)}</span>
                    )}
                  </div>
                  {rank.duration && (
                    <div className="price-duration">
                      <span>T:</span>
                      {rank.duration}
                    </div>
                  )}
                </div>

                <div className="package-features">
                  <h4 className="features-title">Nimalar kiradi:</h4>
                  <ul className="features-list">
                    {rank.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                    {rank.features.length > 4 && (
                      <li className="more-features">
                        +{rank.features.length - 4} ta ko'proq
                      </li>
                    )}
                  </ul>
                </div>

                <div className="package-actions">
                  <button 
                    onClick={() => handleBuyClick(rank.name + ' Rank')}
                    className="add-to-cart-btn"
                  >
                    Sotib olish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tokens and Coins Section */}
        {(selectedCategory === 'tokens' || selectedCategory === 'coins') && (
          <div className="tokens-coins-section">
            <div className="tokens-coins-header">
              <h2 className="tokens-coins-title">
                {selectedCategory === 'tokens' ? 'Donat Tokenlar' : 'Donat Coinlar'}
              </h2>
              <p className="tokens-coins-subtitle">
                {selectedCategory === 'tokens' 
                  ? 'Maxsus buyumlar va imtiyozlar uchun tokenlar' 
                  : 'O\'yin ichidagi pul va resurslar uchun coinlar'
                }
              </p>
            </div>
            
            <div className="tokens-coins-grid">
              {currentData.map((item) => (
                <div key={item.id} className="token-coin-card">
                  <div className="token-coin-icon">
                    {selectedCategory === 'tokens' ? 'T' : 'C'}
                  </div>
                  <h3 className="token-coin-title">{item.name}</h3>
                  <p className="token-coin-description">{item.description}</p>
                  
                  <div className="token-coin-amount">{item.amount}</div>
                  
                  <div className="package-features">
                    <h4 className="features-title">Ishlatish yo'llari:</h4>
                    <ul className="features-list">
                      {(item.uses || []).map((use, index) => (
                        <li key={index} className="feature-item">
                          <span className="feature-check">✓</span>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="price-accent">
                    {formatPrice(item.price)}
                  </div>
                  
                  <button 
                    onClick={() => handleBuyClick(item.name)}
                    className="buy-button"
                  >
                    Sotib olish
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="contact-info">
          <h3 className="contact-title">Yordam kerakmi?</h3>
          <p className="contact-description">
            Savol-javoblar yoki yordam uchun to'g'ridan-to'g'ri bizning administratorimiz bilan bog'laning.
            Barcha to'lovlar xavfsiz va tezkor amalga oshiriladi.
          </p>
          <a 
            href="https://t.me/GN_UMAROV"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.302 1.617-1.124 1.913-1.124 1.913s-.896.297-1.617-.302c-.896-.598-4.066-2.712-4.066-2.712s-.299-.3 0-.599c1.124-1.121 2.712-2.712 3.608-3.608.599-.598.3-.896-.3-.299-1.124.896-4.365 2.712-4.365 2.712s-.598.3-1.421.3c-.599 0-1.617-.302-1.617-.302s-1.124-.599.599-1.124c4.066-1.421 8.729-3.906 8.729-3.906s1.124-.896 1.124 0z"/>
            </svg>
            Telegram orqali bog'lanish
          </a>
        </div>
      </div>
    </div>
  );
};

export default Donate;
