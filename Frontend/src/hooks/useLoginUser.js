import { useState } from 'react';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { useStore } from '../store/store';

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setUser} = useStore();

  const loginUser = async ({ documento, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/users/documento/${documento}`);
      const userData = response.data;

      if (!userData || !userData.email) {
        throw new Error('Usuario no encontrado');
      }

      const { email } = userData;

      // Get auth instance
      const auth = getAuth(app);

      // Sign in with email and password (documento as password)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

    userCredential && setUser(userData);

      return userData;
    } catch (err) {
      console.error('Error iniciando sesión:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
