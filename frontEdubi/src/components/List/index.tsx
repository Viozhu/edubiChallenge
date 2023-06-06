import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import Axios from "../../helpers/Axios";
import {
  TodoEditInterface,
  TodoInterface,
} from "../../interface/todoInterface";
import { CustomSwitch, SnackBar } from "../../styleComponents";
import { useCustomContext } from "../../Context";

const List = (): JSX.Element => {
  const { todos, refreshData } = useCustomContext();
  const [editTodo, setEditTodo] = useState<TodoEditInterface>({
    todo: null,
    enabled: true,
  });
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleEdit = async (id: number) => {
    const { todo } = editTodo;
    try {
      await Axios.put(`/todos/${id}`, todo).then(() => {
        refreshData();
        setEditTodo({
          todo: null,
          enabled: true,
        });
        setOpenSnack({
          open: true,
          message: "Todo updated successfully",
          severity: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setOpenSnack({
        open: true,
        message: "Todo updated failed",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await Axios.delete(`/todos/${id}`).then(() => {
        refreshData();
        setOpenSnack({
          open: true,
          message: "Todo deleted successfully",
          severity: "success",
        });
        setEditTodo({
          todo: null,
          enabled: true,
        });
      });
    } catch (error) {
      console.log(error);
      setOpenSnack({
        open: true,
        message: "Todo deleted failed",
        severity: "error",
      });
    }
  };

  return (
    <div className="w-1/3 bg-slate-50 overflow-x-auto h-3/5 bg-opacity-30 flex flex-col items-center space-y-5 justify-center p-8 pt-0 rounded ">
      {todos.length !== 0 ? (
        todos.map((todo: TodoInterface) => {
          return (
            <div className="flex justify-between items-center p-2 w-full bg-white rounded bg-opacity-70">
              <div className="w-[70%]">
                <p className="text-sm">
                  {dayjs(todo.created_at).format("DD/MM/YYYY")}
                </p>
                <p className="text-lg truncate">
                  {editTodo.enabled || editTodo?.todo?.id !== todo.id ? (
                    todo.task
                  ) : (
                    <TextField
                      label={todo.task}
                      name="task"
                      size="small"
                      variant="outlined"
                      onChange={(e) =>
                        setEditTodo({
                          ...editTodo,
                          todo: { ...todo, task: e.target.value },
                        })
                      }
                    />
                  )}
                </p>
              </div>

              <div>
                <Tooltip title={"Change Status"}>
                  <CustomSwitch
                    defaultChecked={todo.completed ? true : false}
                    onChange={() =>
                      setEditTodo({
                        ...editTodo,
                        todo: { ...todo, completed: !todo.completed },
                      })
                    }
                    disabled={
                      editTodo.enabled || editTodo?.todo?.id !== todo.id
                    }
                  />
                </Tooltip>
                {editTodo.enabled || editTodo?.todo?.id !== todo.id ? (
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit"
                      onClick={() =>
                        setEditTodo({ todo, enabled: !editTodo.enabled })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Delete">
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          color="warning"
                          onClick={() => handleDelete(todo.id)}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Save">
                      <IconButton>
                        <CheckIcon
                          fontSize="small"
                          color="success"
                          onClick={() => handleEdit(todo.id)}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Go back">
                      <IconButton>
                        <CloseIcon
                          fontSize="small"
                          color="error"
                          onClick={() =>
                            setEditTodo({
                              todo: null,
                              enabled: !editTodo.enabled,
                            })
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center p-2 w-full bg-white rounded bg-opacity-70">
          <p className="text-lg">No todos yet</p>
        </div>
      )}
      <SnackBar
        open={openSnack.open}
        severity={openSnack.severity}
        message={openSnack.message}
        onClose={() => setOpenSnack({ ...openSnack, open: false })}
      />
    </div>
  );
};

export default List;
