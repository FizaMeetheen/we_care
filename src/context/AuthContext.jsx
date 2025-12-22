import { createContext, useState } from "react";

export const userAuthContext = createContext();

function AuthContext({ children }) {
  const storedUser = JSON.parse(sessionStorage.getItem("existingUser"));
  const storedToken = sessionStorage.getItem("token");

  const [role, setRole] = useState(storedUser?.role || "");
  const [authorisedUser, setAuthorisedUser] = useState(!!storedToken);

  return (
    <userAuthContext.Provider
      value={{
        role,
        setRole,
        authorisedUser,
        setAuthorisedUser
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export default AuthContext;
