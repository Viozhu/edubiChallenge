import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Axios from "../../helpers/Axios";
import { SnackBar } from "../../styleComponents";
import { useCustomContext } from "../../Context";
import * as styles from "./styles";
const Create = (): JSX.Element => {
  const { refreshData } = useCustomContext();
  const [todo, setTodo] = useState({
    task: "",
    date: "",
  });

  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!todo.task || !todo.date)
      return setOpenSnack({
        open: true,
        message: "Please fill all the fields",
        severity: "error",
      });
    try {
      Axios.post("/todos/create", {
        ...todo,
        created_at: `${todo.date}T00:00:00Z`,
      }).then(() => {
        refreshData();
        setTodo({
          task: "",
          date: "",
        });
        setOpenSnack({
          open: true,
          message: "Todo created successfully",
          severity: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setOpenSnack({
        open: true,
        message: `Todo updated failed - ${error}`,
        severity: "error",
      });
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TextContainer}>Create your to Do!</div>
      <div className={styles.FormContainer}>
        <TextField
          label="Task"
          name="task"
          value={todo.task}
          sx={{ backgroundColor: "white", borderRadius: "5px", opacity: "0.8" }}
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          type="date"
          name="date"
          value={todo.date}
          sx={{ backgroundColor: "white", borderRadius: "5px", opacity: "0.8" }}
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={() => handleSubmit()}>
          Create
        </Button>
      </div>
      <SnackBar
        open={openSnack.open}
        severity={openSnack.severity}
        message={openSnack.message}
        onClose={() => setOpenSnack({ ...openSnack, open: false })}
      />
    </div>
  );
};

export default Create;
