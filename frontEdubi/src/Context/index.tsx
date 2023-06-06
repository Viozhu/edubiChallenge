import { createContext, useContext } from "react";

const CustomContext = createContext({
  todos: [],
  refreshData: () => {
    return;
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomContext = () => {
  return useContext(CustomContext);
};

export default CustomContext;
