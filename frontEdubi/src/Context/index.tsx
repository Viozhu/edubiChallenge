import { createContext, useContext } from "react";

const CustomContext = createContext({
  todos: [],
  refreshData: () => {
    return;
  },
});

export const useCustomContext = () => {
  return useContext(CustomContext);
};

export default CustomContext;
