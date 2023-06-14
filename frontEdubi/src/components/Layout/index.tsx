import React, { useEffect, useState } from "react";

import CustomContext from "../../Context";
import { getTodos } from "../../helpers/getList";
import { TodoInterface } from "../../interface/todoInterface";
import * as styles from "./styles";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const [todos, setTodos] = useState([]);
  const [callData, setCallData] = useState(false);

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
    <div className={styles.Container}>
      <CustomContext.Provider value={{ todos, refreshData }}>
        {children}
      </CustomContext.Provider>
    </div>
  );
};

export default Layout;
