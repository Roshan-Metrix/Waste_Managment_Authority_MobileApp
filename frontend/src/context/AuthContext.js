import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { clearOldTransaction } from "../utils/storage";
import { InternetContext } from "./InternetContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isConnected, checked } = useContext(InternetContext);

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // AUTO LOGIN ON APP START
  useEffect(() => {
    if (!checked) return;

    const loadUserFromToken = async () => {
      if (!isConnected) {
        setLoading(false);
        return;
      }

      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        let res;

        try {
          res = await api.get("/auth/manager/profile");
        } catch {
          try {
            res = await api.get("/auth/admin/profile");
          } catch {
            res = await api.get("/auth/store/profile");
          }
        }

        if (res?.data?.success) {
          setUser(res.data.manager || res.data.admin || res.data.store);
        } else {
          await AsyncStorage.removeItem("token");
          setUser(null);
        }
      } catch (err) {
        console.log("Auto-login error:", err.message);
        await AsyncStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    };

    loadUserFromToken();
  }, [isConnected, checked]);

  // LOGIN
  const login = async (email, password) => {
    if (!isConnected) {
      return { success: false, message: "No internet connection" };
    }

    try {
      const { data } = await api.post("/auth/login", { email, password });

      if (!data.success) {
        setError(data.message);
        return data;
      }

      await AsyncStorage.setItem("token", data.token);

      if (!data.user.isApproved) {
        setError("Your account is not approved yet.");
        setUser(null);
        return { success: false };
      }

      setUser(data.user);
      setError("");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await clearOldTransaction();
      setUser(null);
      setError("");
    } catch (err) {
      console.log("Logout error:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        login,
        logout,
        isConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import api from "../api/api";
// import { clearOldTransaction } from "../utils/storage";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   // AUTO LOGIN ON APP START
//   useEffect(() => {
//     const loadUserFromToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         let res;

//         try {
//           res = await api.get("/auth/manager/profile");

//           if (!res) {
//             res = await api.get("/auth/admin/profile");
//           }

//           if (!res) {
//             res = await api.get("/auth/store/profile");
//           }
//         } catch {
//           // Token invalid
//           await AsyncStorage.removeItem("token");
//           setUser(null);
//           setLoading(false);
//           return;
//         }

//         if (res.data?.success) {
//           setUser(res.data.manager || res.data.admin || res.data.store);
//         } else {
//           await AsyncStorage.removeItem("token");
//           setUser(null);
//         }
//       } catch (err) {
//         console.log("Auto-login error:", err);
//         await AsyncStorage.removeItem("token");
//         setUser(null);
//       }

//       setLoading(false);
//     };

//     loadUserFromToken();
//   }, []);

//   // LOGIN
//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post("/auth/login", { email, password });

//       if (!data.success) {
//         setError(data.message);
//         return data;
//       }

//       // save token
//       await AsyncStorage.setItem("token", data.token);

//       if (!data.user.isApproved) {
//         setError("Your account is not approved yet.");
//         setUser(null);
//         return { success: false };
//       }

//       setUser(data.user);
//       setError("");

//       return { success: true, message: "Login successful" };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, message: err.message };
//     }
//   };

//   // LOGOUT

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       await clearOldTransaction();
//       setUser(null);
//       setError("");
//     } catch (err) {
//       console.log("Logout error:", err.message);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         setError,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
