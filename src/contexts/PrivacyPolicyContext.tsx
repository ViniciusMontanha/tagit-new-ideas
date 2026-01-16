import { createContext, useContext, useState, ReactNode } from "react";

interface PrivacyPolicyContextType {
  isOpen: boolean;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
}

const PrivacyPolicyContext = createContext<PrivacyPolicyContextType | undefined>(undefined);

export const PrivacyPolicyProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPrivacyPolicy = () => setIsOpen(true);
  const closePrivacyPolicy = () => setIsOpen(false);

  return (
    <PrivacyPolicyContext.Provider value={{ isOpen, openPrivacyPolicy, closePrivacyPolicy }}>
      {children}
    </PrivacyPolicyContext.Provider>
  );
};

export const usePrivacyPolicy = () => {
  const context = useContext(PrivacyPolicyContext);
  if (!context) {
    throw new Error("usePrivacyPolicy deve ser usado dentro de PrivacyPolicyProvider");
  }
  return context;
};
