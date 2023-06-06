import React, { useEffect } from "react";

import CustomContext from "../../Context";
import { getTodos } from "../../helpers/getList";
import { TodoInterface } from "../../interface/todoInterface";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const [todos, setTodos] = React.useState([]);
  const [callData, setCallData] = React.useState(false);

  useEffect(() => {
    getTodos().then((res) =>
      setTodos(
        res.sort((a: TodoInterface, b: TodoInterface) =>
          b.created_at.localeCompare(a.created_at)
        )
      )
    );
  }, [callData]);

  const refreshData = () => {
    setCallData(!callData);
  };
  return (
    <div className="flex flex-col justify-center h-[100vh] items-center space-y-8">
      <CustomContext.Provider value={{ todos, refreshData }}>
        {children}
      </CustomContext.Provider>
    </div>
  );
};

export default Layout;
