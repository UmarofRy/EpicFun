import React, { useState, useEffect } from "react";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("ranks");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState("add");

  // Owner credentials - asosiy admin
  const OWNER_CREDENTIALS = {
    email: "ryumarof@gmail.com",
    password: "1818epic40",
    role: "owner",
    nickname: "Owner"
  };

  // Mock data for shop items
  const [data, setData] = useState({
    ranks: [
      {
        id: "1",
        name: "VIP",
        price: 50000,
        duration: "30 kun",
        features: [
          "VIP prefix va rang",
          "/fly buyrug'i",
          "/heal buyrug'i",
          "/feed buyrug'i",
        ],
      },
      {
        id: "2",
        name: "Premium",
        price: 120000,
        duration: "30 kun",
        features: [
          "Premium prefix va rang",
          "Barcha VIP imtiyozlari",
          "/tp buyrug'i",
          "/god buyrug'i",
        ],
      },
    ],
    team: [],
    tokens: [
      {
        id: "1",
        name: "Donat Token (Kichik)",
        amount: "100 Token",
        price: 25000,
        description: "Maxsus buyumlar uchun",
      },
      {
        id: "2",
        name: "Donat Token (O'rta)",
        amount: "250 Token",
        price: 50000,
        description: "Ko'proq imkoniyatlar uchun",
      },
    ],
    coins: [
      {
        id: "1",
        name: "Donat Coin (Kichik)",
        amount: "10,000 Coin",
        price: 15000,
        description: "O'yin ichidagi pul",
      },
      {
        id: "2",
        name: "Donat Coin (O'rta)",
        amount: "25,000 Coin",
        price: 30000,
        description: "Ko'proq pul va imkoniyatlar",
      },
    ],
  });

  const [formData, setFormData] = useState({});

  // Helper functions for localStorage management
  const getStoredHelpers = () => {
    const saved = localStorage.getItem("epic_helpers");
    return saved ? JSON.parse(saved) : [];
  };

  const saveHelpers = (helpers) => {
    localStorage.setItem("epic_helpers", JSON.stringify(helpers));
  };

  const getStoredAdmins = () => {
    const saved = localStorage.getItem("epic_admins");
    return saved ? JSON.parse(saved) : [];
  };

  const saveAdmins = (admins) => {
    localStorage.setItem("epic_admins", JSON.stringify(admins));
  };

  // Initialize component
  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("admin_authenticated");
    const savedUser = localStorage.getItem("current_user");
    if (authStatus === "true" && savedUser) {
      const user = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setCurrentUser(user);
    }

    // Load shop data
    const saved = localStorage.getItem("epic_shop_data");
    if (saved) {
      try {
        setData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch {}
    }
    
    const savedTeam = localStorage.getItem("epic_team_members");
    if (savedTeam) {
      try {
        setData((prev) => ({ ...prev, team: JSON.parse(savedTeam) }));
      } catch {}
    }
  }, []);

  // Save shop data when it changes
  useEffect(() => {
    const { ranks, tokens, coins } = data;
    localStorage.setItem(
      "epic_shop_data",
      JSON.stringify({ ranks, tokens, coins })
    );
    localStorage.setItem("epic_team_members", JSON.stringify(data.team || []));
  }, [data]);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    // Check Owner credentials
    if (
      loginForm.email === OWNER_CREDENTIALS.email &&
      loginForm.password === OWNER_CREDENTIALS.password
    ) {
      const user = OWNER_CREDENTIALS;
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("current_user", JSON.stringify(user));
      return;
    }

    // Check admins
    const admins = getStoredAdmins();
    const foundAdmin = admins.find(
      (admin) => admin.email === loginForm.email && admin.password === loginForm.password
    );

    if (foundAdmin) {
      setIsAuthenticated(true);
      setCurrentUser(foundAdmin);
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("current_user", JSON.stringify(foundAdmin));
      return;
    }

    // Check helpers
    const helpers = getStoredHelpers();
    const foundHelper = helpers.find(
      (helper) => helper.email === loginForm.email && helper.password === loginForm.password
    );

    if (foundHelper) {
      setIsAuthenticated(true);
      setCurrentUser(foundHelper);
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("current_user", JSON.stringify(foundHelper));
      return;
    }

    setLoginError("Noto'g'ri email yoki parol");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("current_user");
    setLoginForm({ email: "", password: "" });
  };

  // Modal handlers
  const openAddModal = (type) => {
    setActiveTab(type);
    setModalType("add");
    setEditingItem(null);
    setFormData(getEmptyFormData(type));
    setShowModal(true);
  };

  const openEditModal = (item, type) => {
    setActiveTab(type);
    setModalType("edit");
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const getEmptyFormData = (type) => {
    switch (type) {
      case "ranks":
        return {
          name: "",
          price: "",
          duration: "",
          features: [""],
        };
      case "tokens":
      case "coins":
        return {
          name: "",
          amount: "",
          price: "",
          description: "",
        };
      case "team":
        return {
          nickname: "",
          role: "",
          telegram: "",
          avatar: "",
          description: "",
        };
      default:
        return {};
    }
  };

  // CRUD operations
  const handleSave = () => {
    if (modalType === "add") {
      const newItem = {
        ...formData,
        id: Date.now().toString(),
      };
      
      if (activeTab !== "team") {
        newItem.price = parseInt(formData.price);
      }
      
      setData((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newItem],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((item) =>
          item.id === editingItem.id
            ? { 
                ...formData, 
                price: activeTab !== "team" ? parseInt(formData.price) : formData.price 
              }
            : item
        ),
      }));
    }
    setShowModal(false);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Bu elementni o'chirishni xohlaysizmi?")) {
      setData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((item) => item.id !== itemId),
      }));
    }
  };

  // Feature management for ranks
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const updateFeature = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Utility functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  const getUserRoleDisplay = (user) => {
    if (!user) return "";
    switch (user.role) {
      case "owner":
        return "Owner (Asosiy Admin)";
      case "admin":
        return "Admin";
      case "helper":
        return "Helper";
      default:
        return user.role || "";
    }
  };

  const canManageAdmins = () => {
    return currentUser && currentUser.role === "owner";
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login">
          <div className="login-card">
            <h1 className="login-title">Admin Panel</h1>
            <p className="login-subtitle">
              Owner, Admin va Helper'lar uchun kirish
            </p>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-input ${loginError ? "error" : ""}`}
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Parol</label>
                <input
                  type="password"
                  className={`form-input ${loginError ? "error" : ""}`}
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
                {loginError && (
                  <div className="error-message">{loginError}</div>
                )}
              </div>

              <button type="submit" className="login-button">
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="admin-container">
      <div className="admin-content">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Admin Panel</h1>
            <p className="admin-subtitle">
              EPICMINE.FUN - Donat boshqaruv paneli
            </p>
            <div className="user-info">
              <span className="user-role">{getUserRoleDisplay(currentUser)}</span>
              <span className="user-email">
                {currentUser?.nickname || currentUser?.email}
              </span>
            </div>
          </div>
          <div className="admin-actions">
            <button onClick={handleLogout} className="logout-button">
              Chiqish
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab("ranks")}
            className={`admin-tab ${activeTab === "ranks" ? "active" : ""}`}
          >
            Ranklar
          </button>
          <button
            onClick={() => setActiveTab("tokens")}
            className={`admin-tab ${activeTab === "tokens" ? "active" : ""}`}
          >
            Tokenlar
          </button>
          <button
            onClick={() => setActiveTab("coins")}
            className={`admin-tab ${activeTab === "coins" ? "active" : ""}`}
          >
            Coinlar
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`admin-tab ${activeTab === "team" ? "active" : ""}`}
          >
            Jamoa
          </button>
          <button
            onClick={() => setActiveTab("helpers")}
            className={`admin-tab ${activeTab === "helpers" ? "active" : ""}`}
          >
            Helper'lar
          </button>
          {canManageAdmins() && (
            <button
              onClick={() => setActiveTab("admins")}
              className={`admin-tab ${activeTab === "admins" ? "active" : ""}`}
            >
              Adminlar
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="crud-section">
          <div className="crud-header">
            <h2 className="crud-title">
              {activeTab === "ranks" && "Ranklar boshqaruvi"}
              {activeTab === "tokens" && "Tokenlar boshqaruvi"}
              {activeTab === "coins" && "Coinlar boshqaruvi"}
              {activeTab === "team" && "Jamoa aʼzolari boshqaruvi"}
              {activeTab === "helpers" && "Helper'lar ro'yxati"}
              {activeTab === "admins" && "Adminlar boshqaruvi"}
            </h2>
            {!["admins", "helpers"].includes(activeTab) && (
              <button
                onClick={() => openAddModal(activeTab)}
                className="add-button"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Qo'shish
              </button>
            )}
          </div>

          {/* Content based on active tab */}
          {activeTab === "helpers" && <HelpersManager currentUser={currentUser} />}
          {activeTab === "admins" && canManageAdmins() && <AdminsManager />}
          
          {/* Regular data tables */}
          {!["admins", "helpers"].includes(activeTab) && (
            <>
              {data[activeTab].length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nomi</th>
                      {activeTab === "ranks" && <th>Muddati</th>}
                      {activeTab === "team" && <th>Rol</th>}
                      {(activeTab === "tokens" || activeTab === "coins") && (
                        <th>Miqdori</th>
                      )}
                      {activeTab !== "team" && <th>Narxi</th>}
                      <th>Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[activeTab].map((item) => (
                      <tr key={item.id}>
                        <td>{item.name || item.nickname}</td>
                        {activeTab === "ranks" && <td>{item.duration}</td>}
                        {activeTab === "team" && <td>{item.role}</td>}
                        {(activeTab === "tokens" || activeTab === "coins") && (
                          <td>{item.amount}</td>
                        )}
                        {activeTab !== "team" && <td>{formatPrice(item.price)}</td>}
                        <td>
                          <div className="table-actions">
                            <button
                              onClick={() => openEditModal(item, activeTab)}
                              className="edit-button"
                            >
                              Tahrirlash
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="delete-button"
                            >
                              O'chirish
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <div className="empty-title">Hech narsa topilmadi</div>
                  <div className="empty-description">
                    Yangi element qo'shish uchun "Qo'shish" tugmasini bosing
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal for Add/Edit */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">
                  {modalType === "add" ? "Yangi qo'shish" : "Tahrirlash"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>

              <div className="modal-form">
                <div className="form-group">
                  <label className="form-label">
                    {activeTab === "team" ? "Nickname" : "Nomi"}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name || formData.nickname || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ 
                        ...prev, 
                        [activeTab === "team" ? "nickname" : "name"]: e.target.value 
                      }))
                    }
                  />
                </div>

                {activeTab === "ranks" && (
                  <div className="form-group">
                    <label className="form-label">Muddati</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.duration || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="30 kun"
                    />
                  </div>
                )}

                {(activeTab === "tokens" || activeTab === "coins") && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Miqdori</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.amount || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            amount: e.target.value,
                          }))
                        }
                        placeholder="100 Token yoki 10,000 Coin"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tavsif</label>
                      <textarea
                        className="form-input form-textarea"
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Qisqa tavsif"
                      />
                    </div>
                  </>
                )}

                {activeTab === "team" && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Rol</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.role || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Telegram</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.telegram || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            telegram: e.target.value,
                          }))
                        }
                        placeholder="@username"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Avatar URL</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.avatar || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            avatar: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tavsif</label>
                      <textarea
                        className="form-input form-textarea"
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </>
                )}

                {activeTab !== "team" && (
                  <div className="form-group">
                    <label className="form-label">Narxi (so'm)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}

                {activeTab === "ranks" && (
                  <div className="form-group">
                    <label className="form-label">Xususiyatlar</label>
                    <div className="features-list">
                      {(formData.features || [""]).map((feature, index) => (
                        <div key={index} className="feature-item">
                          <input
                            type="text"
                            className="form-input feature-input"
                            value={feature}
                            onChange={(e) =>
                              updateFeature(index, e.target.value)
                            }
                            placeholder="Xususiyat kiriting"
                          />
                          {formData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="remove-feature"
                            >
                              O'chirish
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="add-feature"
                    >
                      Xususiyat qo'shish
                    </button>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  onClick={() => setShowModal(false)}
                  className="cancel-button"
                >
                  Bekor qilish
                </button>
                <button onClick={handleSave} className="save-button">
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper'lar ro'yxati komponenti - barcha foydalanuvchilar ko'ra oladi
const HelpersManager = ({ currentUser }) => {
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    const loadHelpers = () => {
      const saved = localStorage.getItem("epic_helpers");
      setHelpers(saved ? JSON.parse(saved) : []);
    };
    
    loadHelpers();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadHelpers();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div>
      <div className="helpers-info">
        <h3>Helper'lar ro'yxati</h3>
        <p>
          Barcha Helper'lar ro'yxati. Helper'lar admin qiladigan barcha ishni qila oladi, 
          faqat yangi admin qo'shish va o'chirishga ruxsati yo'q.
        </p>
      </div>
      
      {helpers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">Hech qanday Helper topilmadi</div>
          <div className="empty-description">
            Hozircha hech qanday Helper qo'shilmagan
          </div>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Email</th>
              <th>Qo'shilgan sana</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {helpers.map((helper) => (
              <tr key={helper.id}>
                <td>{helper.nickname}</td>
                <td>{helper.email}</td>
                <td>{new Date(helper.createdAt).toLocaleDateString('uz-UZ')}</td>
                <td>
                  <span className="status-online">Faol</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Adminlar boshqaruvi komponenti - faqat Owner ko'ra oladi
const AdminsManager = () => {
  const [admins, setAdmins] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [adminForm, setAdminForm] = useState({ 
    email: "", 
    password: "", 
    nickname: "" 
  });
  const [helperForm, setHelperForm] = useState({ 
    email: "", 
    password: "", 
    nickname: "" 
  });
  const [isAddingHelper, setIsAddingHelper] = useState(false);

  useEffect(() => {
    // Load existing data
    const savedAdmins = localStorage.getItem("epic_admins");
    const savedHelpers = localStorage.getItem("epic_helpers");
    
    setAdmins(savedAdmins ? JSON.parse(savedAdmins) : []);
    setHelpers(savedHelpers ? JSON.parse(savedHelpers) : []);
  }, []);

  // Save admins to localStorage
  const saveAdmins = (newAdmins) => {
    setAdmins(newAdmins);
    localStorage.setItem("epic_admins", JSON.stringify(newAdmins));
  };

  // Save helpers to localStorage
  const saveHelpers = (newHelpers) => {
    setHelpers(newHelpers);
    localStorage.setItem("epic_helpers", JSON.stringify(newHelpers));
  };

  // Add new admin
  const addAdmin = (e) => {
    e.preventDefault();
    if (!adminForm.email || !adminForm.password || !adminForm.nickname) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    
    // Check if email already exists
    const allUsers = [...admins, ...helpers];
    if (allUsers.some(user => user.email === adminForm.email)) {
      alert("Bu email allaqachon ishlatilmoqda!");
      return;
    }
    
    const newAdmin = {
      id: Date.now().toString(),
      email: adminForm.email,
      password: adminForm.password,
      nickname: adminForm.nickname,
      role: "admin",
      createdAt: new Date().toISOString()
    };
    
    saveAdmins([...admins, newAdmin]);
    setAdminForm({ email: "", password: "", nickname: "" });
    alert("Admin muvaffaqiyatli qo'shildi!");
  };

  // Add new helper via POST simulation
  const addHelper = async (e) => {
    e.preventDefault();
    if (!helperForm.email || !helperForm.password || !helperForm.nickname) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    
    // Check if email already exists
    const allUsers = [...admins, ...helpers];
    if (allUsers.some(user => user.email === helperForm.email)) {
      alert("Bu email allaqachon ishlatilmoqda!");
      return;
    }
    
    setIsAddingHelper(true);
    
    try {
      // Simulate POST request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real application, this would be:
      // const response = await fetch('/api/helpers', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: helperForm.email,
      //     password: helperForm.password,
      //     nickname: helperForm.nickname,
      //     role: "helper"
      //   })
      // });
      
      const newHelper = {
        id: Date.now().toString(),
        email: helperForm.email,
        password: helperForm.password,
        nickname: helperForm.nickname,
        role: "helper",
        createdAt: new Date().toISOString()
      };
      
      saveHelpers([...helpers, newHelper]);
      setHelperForm({ email: "", password: "", nickname: "" });
      alert("Helper muvaffaqiyatli qo'shildi va login qila oladi!");
      
    } catch (error) {
      alert("Helper qo'shishda xatolik yuz berdi: " + error.message);
    } finally {
      setIsAddingHelper(false);
    }
  };

  // Remove admin
  const removeAdmin = (adminId) => {
    if (window.confirm("Bu adminni o'chirishni xohlaysizmi?")) {
      const newAdmins = admins.filter(admin => admin.id !== adminId);
      saveAdmins(newAdmins);
      alert("Admin o'chirildi!");
    }
  };

  // Remove helper
  const removeHelper = (helperId) => {
    if (window.confirm("Bu helper'ni o'chirishni xohlaysizmi? U endi login qila olmaydi.")) {
      const newHelpers = helpers.filter(helper => helper.id !== helperId);
      saveHelpers(newHelpers);
      alert("Helper o'chirildi va endi login qila olmaydi!");
    }
  };

  return (
    <div>
      <h2 className="crud-title">Adminlar va Helper'lar boshqaruvi</h2>
      
      {/* Admins Section */}
      <div className="admin-section">
        <h3>Adminlar ro'yxati</h3>
        {admins.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nickname</th>
                <th>Email</th>
                <th>Qo'shilgan sana</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.nickname}</td>
                  <td>{admin.email}</td>
                  <td>{new Date(admin.createdAt).toLocaleDateString('uz-UZ')}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => removeAdmin(admin.id)}
                        className="delete-button"
                      >
                        O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-description">Hech qanday admin qo'shilmagan</div>
          </div>
        )}

        {/* Add Admin Form */}
        <form onSubmit={addAdmin} className="admin-form">
          <h4>Yangi Admin qo'shish</h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nickname</label>
              <input
                type="text"
                className="form-input"
                value={adminForm.nickname}
                onChange={(e) =>
                  setAdminForm((prev) => ({ ...prev, nickname: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={adminForm.email}
                onChange={(e) =>
                  setAdminForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Parol</label>
              <input
                type="password"
                className="form-input"
                value={adminForm.password}
                onChange={(e) =>
                  setAdminForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <button type="submit" className="add-button">
            Admin qo'shish
          </button>
        </form>
      </div>

      {/* Helpers Section */}
      <div className="helper-section" style={{ marginTop: "2rem" }}>
        <h3>Helper'lar ro'yxati</h3>
        {helpers.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nickname</th>
                <th>Email</th>
                <th>Qo'shilgan sana</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {helpers.map((helper) => (
                <tr key={helper.id}>
                  <td>{helper.nickname}</td>
                  <td>{helper.email}</td>
                  <td>{new Date(helper.createdAt).toLocaleDateString('uz-UZ')}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => removeHelper(helper.id)}
                        className="delete-button"
                      >
                        O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-description">Hech qanday helper qo'shilmagan</div>
          </div>
        )}

        {/* Add Helper Form with POST simulation */}
        <form onSubmit={addHelper} className="admin-form">
          <h4>Yangi Helper qo'shish (POST request)</h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nickname</label>
              <input
                type="text"
                className="form-input"
                value={helperForm.nickname}
                onChange={(e) =>
                  setHelperForm((prev) => ({ ...prev, nickname: e.target.value }))
                }
                required
                disabled={isAddingHelper}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={helperForm.email}
                onChange={(e) =>
                  setHelperForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                disabled={isAddingHelper}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Parol</label>
              <input
                type="password"
                className="form-input"
                value={helperForm.password}
                onChange={(e) =>
                  setHelperForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                disabled={isAddingHelper}
              />
            </div>
          </div>
          <button type="submit" className="add-button" disabled={isAddingHelper}>
            {isAddingHelper ? "Qo'shilmoqda..." : "Helper qo'shish (POST)"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
