import { useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext.jsx";

const UserStatuts = () => {
  const [UserStatuts, setUserStatuts] = useState({ isPaidUser: false });

  const { user } = useAuth();

  useEffect(() => {
    const fetchUserStatuts = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserStatuts(userData);
        }
      }
    };

    fetchUserStatuts();
  }, [user]);

  return { UserStatuts };
};

export default UserStatuts;
