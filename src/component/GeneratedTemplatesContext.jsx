/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../FirebaseConfig"; // make sure Firestore is initialized here
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../AuthContext";
import useStatus from "./userStatus"; // Assuming you have a userStatus hook to get user status
// eslint-disable-next-line react-refresh/only-export-components
export const GeneratedTemplatesContext = createContext();

export function GeneratedTemplatesProvider({ children }) {
  const { user } = useAuth(); // Make sure you're tracking Firebase user
  const [generatedTemplates, setGeneratedTemplates] = useState([]);
  const [userPlan, setUserPlan] = useState("FREE");

  // 🔁 Load templates from Firestore on login
  useEffect(() => {
    const fetchTemplates = async () => {
      if (!user) {
        console.log("No user logged in, skipping template fetch.");
        setGeneratedTemplates([]);
        return;
      }
      //console.log("Fetching templates for user:", user.uid);
      // Fetch templates for the logged-in user
      const q = query(
        collection(db, "templates"),
        where("uid", "==", user.uid),
        orderBy("generatedAt", "desc")
      );
      const snapshot = await getDocs(q);
      const loaded = snapshot.docs.map((doc) => doc.data());
      //console.log("Loaded templates:", loaded);
      setGeneratedTemplates(loaded);
    };
    fetchTemplates();
  }, [user]);
  const { userStatus } = useStatus();
  const isPaidUser = userStatus?.isPaidUser === true;
  // 🔁 Load user plan from Firestore on login
  const canGenerateMore = () => {
    if (isPaidUser) return true;
    return generatedTemplates.length < 2;
  };

  const addGeneratedTemplate = async (template) => {
    if (!canGenerateMore()) {
      throw new Error(
        "Template limit reached. Purchase lifetime access for unlimited generations!"
      );
    }

    const newTemplate = {
      ...template,
      uid: user?.uid || "anonymous",
      generatedAt: new Date().toISOString(),
      planType: userPlan,
    };

    // Save to Firestore
    if (user) {
      await addDoc(collection(db, "templates"), newTemplate);
    }

    // Update local state
    setGeneratedTemplates((prev) => [newTemplate, ...prev]);
  };

  const clearGeneratedTemplates = () => {
    //setGeneratedTemplates([]);
    // Optionally delete from Firestore if needed

    if (user) {
      const q = query(
        collection(db, "templates"),
        where("uid", "==", user.uid)
      );
      getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          // Delete each document
          deleteDoc(doc.ref)
            .then(() => {
              console.log("Deleted template:", doc.id);
            })
            .catch((error) => {
              console.error("Error deleting template:", error);
            });
        });
      });
    }
  };

  const setUserPlanAfterPurchase = (planType) => {
    setUserPlan(planType);
    // Optionally update user metadata in Firestore if needed
  };

  return (
    <GeneratedTemplatesContext.Provider
      value={{
        generatedTemplates,
        addGeneratedTemplate,
        clearGeneratedTemplates,
        userPlan,
        setUserPlanAfterPurchase,
        canGenerateMore,
        isLifetimeMember: userPlan === "LIFETIME",
        isProMember: userPlan === "PRO",
      }}
    >
      {children}
    </GeneratedTemplatesContext.Provider>
  );
}

export const useGeneratedTemplates = () =>
  useContext(GeneratedTemplatesContext);
