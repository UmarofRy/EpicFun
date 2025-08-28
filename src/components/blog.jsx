import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Mock blog posts data
    const mockPosts = [
      {
        id: 1,
        title: "Server 1.20.4 versiyasiga yangilandi!",
        excerpt: "Yangi xususiyatlar, bug fixlar va yaxshilanishlar bilan serverimiz eng so'nggi versiyaga yangilandi.",
        content: "Hurmatli o'yinchilar! Serverimiz muvaffaqiyatli ravishda Minecraft 1.20.4 versiyasiga yangilandi...",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
        author: "Admin",
        date: new Date('2024-01-15'),
        category: "yangilik",
        tags: ["yangilik", "yangilanish", "minecraft"],
        likes: 127,
        comments: 23
      },
      {
        id: 2,
        title: "Yangi PvP turniri e'lon qilinadi!",
        excerpt: "Dam olish kunlarida ajoyib sovrinlar bilan PvP turniriga barcha o'yinchilar taklif etiladi.",
        content: "Hurmatli o'yinchilar! Yana bir qiziqarli tadbir - PvP turniri...",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
        author: "Moderator",
        date: new Date('2024-01-12'),
        category: "tadbir",
        tags: ["pvp", "turnir", "tadbir"],
        likes: 89,
        comments: 31
      },
      {
        id: 3,
        title: "Yangi Building yarashuvida ishtirok eting!",
        excerpt: "Eng chiroyli va ijodiy binolarni qurish uchun yangi yarashuvda ishtirok eting va katta mukofotlar yutib oling.",
        content: "Building yarashuvimiz uchun qoidalar va sharoitlar...",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop",
        author: "BuildMaster",
        date: new Date('2024-01-10'),
        category: "yarashuvlar",
        tags: ["building", "yarashuvlar", "mukofot"],
        likes: 156,
        comments: 45
      },
      {
        id: 4,
        title: "Server qoidalari yangilandi",
        excerpt: "Barcha o'yinchilar uchun muhim: server qoidalari yangilandi va qo'shimcha qoidalar qo'shildi.",
        content: "Serverda tartib va tinchlikni saqlash uchun qoidalarimiz yangilandi...",
        image: "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=800&h=400&fit=crop",
        author: "Admin",
        date: new Date('2024-01-08'),
        category: "qoidalar",
        tags: ["qoidalar", "server", "tartib"],
        likes: 73,
        comments: 12
      },
      {
        id: 5,
        title: "Yangi plugin: Custom Enchants qo'shildi",
        excerpt: "Servarga yangi Custom Enchants plugini qo'shildi. Endi qurollaringizni yanada kuchliroq qila olasiz!",
        content: "Custom Enchants plugini orqali yangi va noyob enchantmentlar...",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
        author: "Developer",
        date: new Date('2024-01-05'),
        category: "yangilik",
        tags: ["plugin", "enchants", "yangilik"],
        likes: 203,
        comments: 67
      }
    ];
    
    setPosts(mockPosts);
    setLoading(false);
  };

  const categories = [
    { id: 'all', name: 'Barchasi', count: posts.length },
    { id: 'yangilik', name: 'Yangiliklar', count: posts.filter(p => p.category === 'yangilik').length },
    { id: 'tadbir', name: 'Tadbirlar', count: posts.filter(p => p.category === 'tadbir').length },
    { id: 'yarashuvlar', name: 'Yarashuvlar', count: posts.filter(p => p.category === 'yarashuvlar').length },
    { id: 'qoidalar', name: 'Qoidalar', count: posts.filter(p => p.category === 'qoidalar').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (date) => {
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Bugun";
    if (days === 1) return "Kecha";
    if (days < 7) return `${days} kun oldin`;
    if (days < 30) return `${Math.floor(days / 7)} hafta oldin`;
    return `${Math.floor(days / 30)} oy oldin`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Maqolalar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-content">
        {/* Header */}
        <div className="blog-header">
          <h1 className="blog-title">
            Server Blogi
          </h1>
          <p className="blog-subtitle">
            Eng so'nggi yangiliklar, tadbirlar va serverimiz haqidagi barcha ma'lumotlar
          </p>
        </div>

        {/* Categories */}
        <div className="categories-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
              <span className="category-count">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="featured-post">
            <h2 className="featured-post-title">Asosiy Maqola</h2>
            <div className="featured-card">
              <div className="featured-content">
                <div className="featured-image">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                  />
                  <div className="featured-badge">
                    {filteredPosts[0].category}
                  </div>
                </div>
                <div className="featured-text">
                  <h3>
                    {filteredPosts[0].title}
                  </h3>
                  <p>
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="featured-meta">
                    <div className="meta-info">
                      <span>{filteredPosts[0].author}</span>
                      <span>•</span>
                      <span>{getTimeAgo(filteredPosts[0].date)}</span>
                    </div>
                    <div className="meta-stats">
                      <span className="stat-item">
                        <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        {filteredPosts[0].likes}
                      </span>
                      <span className="stat-item">
                        <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                        </svg>
                        {filteredPosts[0].comments}
                      </span>
                    </div>
                  </div>
                  <button className="featured-btn">
                    To'liq O'qish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="posts-grid">
          {filteredPosts.slice(1).map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-image">
                <img
                  src={post.image}
                  alt={post.title}
                />
                <div className="post-badge">
                  {post.category}
                </div>
                <div className="post-overlay"></div>
              </div>

              <div className="post-content">
                <h3 className="post-title">
                  {post.title}
                </h3>

                <p className="post-excerpt">
                  {post.excerpt}
                </p>

                <div className="post-meta">
                  <div className="post-author-date">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{getTimeAgo(post.date)}</span>
                  </div>

                  <div className="post-stats">
                    <span className="stat-item">
                      <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="stat-item">
                      <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>

                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="post-tag"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="post-btn">
                  Batafsil O'qish
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">?</div>
            <h3 className="empty-title">Maqolalar topilmadi</h3>
            <p className="empty-description">Tanlangan kategoriya boyicha hech qanday maqola mavjud emas.</p>
          </div>
        )}

        {/* Newsletter */}
        <div className="newsletter">
          <h3 className="newsletter-title">Yangiliklar obunasi</h3>
          <p className="newsletter-description">
            Eng so'nggi yangiliklar va tadbirlar haqida birinchi bo'lib xabar oling!
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Email manzilingiz..."
              className="newsletter-input"
            />
            <button className="newsletter-btn">
              Obuna Bo'lish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
