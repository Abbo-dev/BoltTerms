import { useEffect, useState } from "react";
import { db } from "../FirebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext.jsx";

const UserStatus = () => {
  const [userStatus, setUserStatus] = useState({ isPaidUser: false });

  const { user } = useAuth();

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserStatus(userData);
        }
      }
    };

    fetchUserStatus();
  }, [user]);

  return { userStatus };
};

export default UserStatus;
