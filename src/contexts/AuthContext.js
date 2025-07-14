import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 LOGIN: Firebase + envío al backend
  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCred.user.getIdToken();

    // ✅ Solo en login se envía al backend
    await axios.post("http://localhost:5000/auth/iniciar-sesion", { idToken }, {
      withCredentials: true
    });

    setCurrentUser(userCred.user);
  };

  //  SIGNUP: solo crea la cuenta, no llama al backend
  const signup = async (email, password) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCred.user);
    return userCred; // Se usa en tu Register.jsx para obtener el idToken si luego lo necesitas
  };

  //  LOGOUT: Firebase + backend
  const logout = async () => {
    await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
    await signOut(auth);
    setCurrentUser(null);
  };

  // Listener de sesión
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signup // ✅ ya está disponible en useAuth()
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
