import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // adjust path as needed

export default function useStatus() {
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      setUserStatus(docSnap.data());
    });
    return () => unsub();
  }, []);

  return { userStatus };
}
