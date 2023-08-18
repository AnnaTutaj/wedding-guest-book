import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@common/util/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  getAdditionalUserInfo,
  AdditionalUserInfo
} from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';
import { UserCredential as FirebaseUserCredential } from 'firebase/auth';
import { serverTimestamp, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import UserActions from '@common/redux/UserActions';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { isAdmin } from '@common/helpers/UserHelper';
import { IUserProfile, initUserProfile, useUserProfile } from './UserProfile/UserProfileContext';
import { Language } from '@common/constants/Language';

export interface IAuthContext {
  userAuth: FirebaseUser | null;
  isUserLoading: boolean;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  login?: (email: string, password: string) => Promise<FirebaseUserCredential>;
  register: (email: string, password: string) => void;
  logout: () => void;
  updateProfileSettings: (values: Partial<IUserProfile>) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  userAuth: null,
  isUserLoading: false,
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  register: () => {},
  logout: () => {},
  updateProfileSettings: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: any) {
  const dispatch = useDispatch();
  const { showError } = useErrorMessage();

  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);
  const [userAuth, setUserAuth] = useState<FirebaseUser | null>(null);
  const { setUserProfile } = useUserProfile();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      setIsUserLoading(true);
      setUserAuth(user ? user : null);

      if (user?.uid) {
        const snap = await getDoc(doc(db, 'users', user.uid));

        if (snap.exists()) {
          const userSnap = snap.data();
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            lastActivity: serverTimestamp()
          });

          setUserProfile({
            uid: user.uid,
            createdAt: userSnap.createdAt || '',
            pictureURL: userSnap.pictureURL || '',
            username: userSnap.username || '',
            language: userSnap?.language || Language.en,
            theme: userSnap.theme || {},
            isAdmin: isAdmin(user.uid)
          });
        } else {
          setUserProfile({ ...initUserProfile });
          setUserAuth(null);
        }
      } else {
        setUserProfile({ ...initUserProfile });
      }
      setIsUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const getProfile = async () => {
    if (!userAuth) {
      return;
    }

    setIsUserLoading(true);

    const snap = await getDoc(doc(db, 'users', userAuth.uid));

    if (snap.exists()) {
      const userSnap = snap.data();

      setUserProfile({
        uid: userAuth.uid,
        createdAt: userSnap.createdAt || '',
        pictureURL: userSnap.pictureURL || '',
        username: userSnap.username || '',
        language: userSnap?.language || Language.en,
        theme: userSnap.theme || {},
        isAdmin: isAdmin(userAuth.uid)
      });
    }
    setIsUserLoading(false);
  };

  const updateProfileSettings = async (values: Partial<IUserProfile>) => {
    if (userAuth) {
      const userRef = doc(db, 'users', userAuth.uid);

      await updateDoc(userRef, {
        username: values.username,
        language: values.language
      });

      getProfile();
    }
  };

  const logout = () => {
    UserActions.userLogoutAction()(dispatch);
    return signOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const details: AdditionalUserInfo | null = getAdditionalUserInfo(userCredential);
    if (details?.isNewUser) {
      const newUser = {
        username: userCredential.user.displayName,
        pictureURL: userCredential.user.photoURL,
        language: siteLanguage,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, `users/${userCredential.user.uid}`), { ...newUser });
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);

      const details: AdditionalUserInfo | null = getAdditionalUserInfo(userCredential);
      if (details?.isNewUser) {
        const newUser = {
          username: userCredential.user.displayName,
          pictureURL: userCredential.user.photoURL,
          language: siteLanguage,
          createdAt: serverTimestamp()
        };

        await setDoc(doc(db, `users/${userCredential.user.uid}`), { ...newUser });
      }
    } catch (error) {
      showError(error);
    }
  };

  const value = {
    userAuth,
    isUserLoading,
    signInWithGoogle,
    signInWithFacebook,
    login,
    register,
    logout,
    updateProfileSettings
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
