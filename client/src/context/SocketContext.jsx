import { createContext } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  );
};