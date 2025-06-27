/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    {
      ("storing");
    }
    const storedFormData = localStorage.getItem("formData");
    return storedFormData
      ? JSON.parse(storedFormData)
      : {
          businessName: "",
          websiteURL: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
export const useForm = () => useContext(FormContext);
