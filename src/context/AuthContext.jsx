import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'https://68add6e9a0b85b2f2cf4d20e.mockapi.io/EpicMinePost';

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('epicmine_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Check if user already exists
      const existingUsers = await fetch(`${API_BASE}/foydalanuvchi`);
      const users = await existingUsers.json();
      
      const userExists = users.find(u => 
        u.email === userData.email || u.nickname === userData.nickname
      );
      
      if (userExists) {
        throw new Error('Email yoki nickname allaqachon mavjud');
      }

      // Create new user
      const response = await fetch(`${API_BASE}/foydalanuvchi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          createdAt: new Date().toISOString(),
          avatar: userData.avatar || `https://crafatar.com/avatars/${userData.nickname}?overlay`,
          role: 'user',
          isActive: true,
          lastLogin: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Ro\'yxatdan o\'tishda xatolik yuz berdi');
      }

      const newUser = await response.json();
      setUser(newUser);
      localStorage.setItem('epicmine_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      // Get all users and find matching credentials
      const response = await fetch(`${API_BASE}/foydalanuvchi`);
      const users = await response.json();
      
      const user = users.find(u => 
        (u.email === email || u.nickname === email) && u.password === password
      );
      
      if (!user) {
        throw new Error('Email/nickname yoki parol noto\'g\'ri');
      }

      if (!user.isActive) {
        throw new Error('Hisobingiz bloklangan. Admin bilan bog\'laning');
      }

      // Update last login
      await fetch(`${API_BASE}/foydalanuvchi/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          lastLogin: new Date().toISOString()
        }),
      });

      setUser(user);
      localStorage.setItem('epicmine_user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('epicmine_user');
  };

  const updateProfile = async (updateData) => {
    try {
      if (!user) throw new Error('Foydalanuvchi tizimga kirmagan');

      const response = await fetch(`${API_BASE}/foydalanuvchi/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          ...updateData,
          updatedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Profil yangilanmadi');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('epicmine_user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isAdmin = () => {
    return user && (user.role === 'admin' || user.role === 'super_admin');
  };

  const isModerator = () => {
    return user && (user.role === 'moderator' || user.role === 'admin' || user.role === 'super_admin');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAdmin,
    isModerator
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
