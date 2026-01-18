import React, { createContext, useContext, useReducer, useEffect } from 'react';
import LocalStorageService from '../services/localStorage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        user: action.payload.user, 
        token: action.payload.token,
        isAuthenticated: true,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAuthenticated: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        token: null, 
        isAuthenticated: false,
        error: null 
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = LocalStorageService.getCurrentUser();
    
    if (token && user) {
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, []);

  const login = async (email, password, role) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await LocalStorageService.login(email, password, role);
      if (response.success) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: response.data 
        });
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.message 
      });
      throw error;
    }
  };

  const register = async (email, password, name, role) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await LocalStorageService.register(email, password, name, role);
      if (response.success) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: response.data 
        });
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.message 
      });
      throw error;
    }
  };

  const logout = async () => {
    LocalStorageService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};