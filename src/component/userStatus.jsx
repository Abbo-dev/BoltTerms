import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // adjust path as needed
import { useAuth } from "../AuthContext.jsx";

export default function useStatus() {
  const [userStatus, setUserStatus] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setUserStatus(null);
      return;
    }

    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (docSnap) => {
        setUserStatus(docSnap.exists() ? docSnap.data() : null);
      },
      (error) => {
        console.error("Failed to load user status:", error);
        setUserStatus(null);
      }
    );
    return () => unsub();
  }, [user]);

  return { userStatus };
}
