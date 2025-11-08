import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, register as apiRegister } from '../api/endpoints';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          setUser({ name: 'Aluno FIAP', email: 'user@fiap.com.br' });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(email, password);
      const { token: newToken, user: newUser } = response.data;

      if (newToken && newUser) {
        await AsyncStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
        console.log('[AuthContext] Login bem-sucedido:', newUser);
        return true;
      }

      Alert.alert('Erro', 'Resposta inválida da API de login.');
      return false;
    } catch (error) {
      Alert.alert('Erro de Login', error.message || 'Falha ao realizar login.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    setIsLoading(true);
    try {
      await apiRegister(name, email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
      return true;
    } catch (error) {
      Alert.alert('Erro de Cadastro', error.message || 'Falha ao realizar cadastro.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 NOVO: flag clara de autenticação
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
