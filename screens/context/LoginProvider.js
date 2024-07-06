import { createContext, useState } from "react";


const loginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState(false);
    return (
        <loginContext.Provider value={{isRegistered, setIsRegistered}} >
            {/* any children can wrapped within can access the context value */}
            {children}
        </loginContext.Provider>
    );
};

export default LoginProvider;