/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../FirebaseConfig"; // make sure Firestore is initialized here
import {
  collection,
  addDoc,
  doc,
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
        setGeneratedTemplates([]);
        return;
      }
      // Fetch templates for the logged-in user
      const q = query(
        collection(db, "templates"),
        where("uid", "==", user.uid),
        orderBy("generatedAt", "desc")
      );
      try {
        const snapshot = await getDocs(q);
        const loaded = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setGeneratedTemplates(loaded);
      } catch (error) {
        setGeneratedTemplates([]);
        void error;
      }
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
    let docRef;
    if (user) {
      docRef = await addDoc(collection(db, "templates"), newTemplate);
    }

    // Update local state
    const newTemplateWithId = docRef
      ? { id: docRef.id, ...newTemplate }
      : newTemplate;
    setGeneratedTemplates((prev) => [newTemplateWithId, ...prev]);
  };

  const clearGeneratedTemplates = async () => {
    setGeneratedTemplates([]);

    if (!user) {
      return;
    }

    try {
      const q = query(
        collection(db, "templates"),
        where("uid", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      await Promise.all(
        snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref))
      );
    } catch (error) {
      void error;
    }
  };

  const deleteGeneratedTemplate = async (templateId) => {
    if (!user || !templateId) {
      return;
    }

    try {
      await deleteDoc(doc(db, "templates", templateId));
      setGeneratedTemplates((prev) =>
        prev.filter((template) => template.id !== templateId)
      );
    } catch (error) {
      void error;
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
        deleteGeneratedTemplate,
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
