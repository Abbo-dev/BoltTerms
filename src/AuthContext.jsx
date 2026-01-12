import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./FirebaseConfig.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const ensureUserDoc = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username:
            user.displayName ||
            user.email?.split("@")[0] ||
            "User",
          email: user.email || "",
          uid: user.uid,
          isPaidUser: false,
          aiQueriesToday: 0,
          createdAt: new Date(),
        });
        return;
      }
      if (!userSnap.data()?.uid) {
        await setDoc(userRef, { uid: user.uid }, { merge: true });
      }
    };

    ensureUserDoc().catch((error) => {
      void error;
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
