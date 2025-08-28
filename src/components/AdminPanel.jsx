import React, { useState, useEffect } from "react";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("ranks");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'

  // Secure credentials as specified
  const ADMIN_CREDENTIALS = {
    email: "ryumarof@gmail.com",
    password: "1818epic40",
  };

  // Mock data - in real app this would come from API
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

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
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

  useEffect(() => {
    const { ranks, tokens, coins } = data;
    localStorage.setItem(
      "epic_shop_data",
      JSON.stringify({ ranks, tokens, coins })
    );
    localStorage.setItem("epic_team_members", JSON.stringify(data.team || []));
  }, [data]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (
      loginForm.email === ADMIN_CREDENTIALS.email &&
      loginForm.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
    } else {
      setLoginError("Noto'g'ri email yoki parol");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setLoginForm({ email: "", password: "" });
  };

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
      default:
        return {};
    }
  };

  const handleSave = () => {
    if (modalType === "add") {
      const newItem = {
        ...formData,
        id: Date.now().toString(),
        price: parseInt(formData.price),
      };
      setData((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newItem],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((item) =>
          item.id === editingItem.id
            ? { ...formData, price: parseInt(formData.price) }
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login">
          <div className="login-card">
            <h1 className="login-title">Admin Panel</h1>
            <p className="login-subtitle">
              Administratorlar uchun maxsus kirish
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

  // Admin Dashboard
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
          </div>
          <div className="admin-actions">
            <button onClick={handleLogout} className="logout-button">
              Chiqish
            </button>
          </div>
        </div>

        {/* Tabs */}
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
            onClick={() => setActiveTab("admins")}
            className={`admin-tab ${activeTab === "admins" ? "active" : ""}`}
          >
            Adminlar
          </button>
        </div>

        {/* CRUD Section */}
        <div className="crud-section">
          <div className="crud-header">
            <h2 className="crud-title">
              {activeTab === "ranks" && "Ranklar boshqaruvi"}
              {activeTab === "tokens" && "Tokenlar boshqaruvi"}
              {activeTab === "coins" && "Coinlar boshqaruvi"}
              {activeTab === "team" && "Jamoa aʼzolari boshqaruvi"}
            </h2>
            {activeTab !== "admins" && (
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

          {/* Data Table */}
          {activeTab !== "admins" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nomi</th>
                  {activeTab === "ranks" && <th>Muddati</th>}
                  {(activeTab === "tokens" || activeTab === "coins") && (
                    <th>Miqdori</th>
                  )}
                  <th>Narxi</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {data[activeTab].map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    {activeTab === "ranks" && <td>{item.duration}</td>}
                    {(activeTab === "tokens" || activeTab === "coins") && (
                      <td>{item.amount}</td>
                    )}
                    <td>{formatPrice(item.price)}</td>
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
          )}

          {activeTab !== "admins" && data[activeTab].length === 0 && (
            <div className="empty-state">
              <div className="empty-title">Hech narsa topilmadi</div>
              <div className="empty-description">
                Yangi element qo'shish uchun "Qo'shish" tugmasini bosing
              </div>
            </div>
          )}

          {activeTab === "admins" && <AdminsManager />}
        </div>

        {/* Modal */}
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
                  <label className="form-label">Nomi</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
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
                      <label className="form-label">Nickname</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.nickname || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            nickname: e.target.value,
                          }))
                        }
                      />
                    </div>
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

// Admins manager component (localStorage based)
const AdminsManager = () => {
  const [admins, setAdmins] = useState(() => {
    const saved = localStorage.getItem("epic_admin_accounts");
    return saved ? JSON.parse(saved) : [{ email: "ryumarof@gmail.com" }];
  });
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    localStorage.setItem("epic_admin_accounts", JSON.stringify(admins));
  }, [admins]);

  const add = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setAdmins((prev) => [...prev, { email: form.email }]);
    setForm({ email: "", password: "" });
  };

  const remove = (email) => {
    if (email === "ryumarof@gmail.com") return;
    setAdmins((prev) => prev.filter((a) => a.email !== email));
  };

  return (
    <div>
      <h2 className="crud-title">Adminlar boshqaruvi</h2>
      <div className="data-table" style={{ background: "transparent" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.email}>
                <td>{a.email}</td>
                <td>
                  <div className="table-actions">
                    <button
                      onClick={() => remove(a.email)}
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
      </div>
      <form onSubmit={add} className="login-form" style={{ marginTop: "1rem" }}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Parol</label>
          <input
            type="password"
            className="form-input"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <button type="submit" className="add-button">
          Admin qo'shish
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
