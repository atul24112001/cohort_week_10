import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import todoState, { Todo } from "../../recoil/atoms/todo-atom";
import axios from "axios";
import styled from "styled-components";

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  setShowTodoForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const API_URL = import.meta.env.VITE_API_URL;

const TodoList: React.FC<Props> = ({ setShowTodoForm }) => {
  // const todos: Todo[] = useRecoilValue(todoState);
  const [todos, setTodos] = useRecoilState(todoState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      (async () => {
        try {
          const { data } = await axios.get(`${API_URL}/api/todo_app/todo`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setTodos(data.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [loading]);

  const deleteTodoHandler = async (todo: Todo, index: number) => {
    try {
      await axios.delete(`${API_URL}/api/todo_app/todo/${todo.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTodo = JSON.parse(JSON.stringify(todos));
      updatedTodo.splice(index, 1);
      setTodos(updatedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const markDoneHandler = async (todo: Todo, index: number) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/todo_app/todo/${todo.id}`,
        {
          title: todo.title,
          description: todo.description,
          done: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const updatedTodo = JSON.parse(JSON.stringify(todos));
      updatedTodo.splice(index, 1, data.data[0]);
      setTodos(updatedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div
        style={{ justifyContent: "space-between" }}
        className="action_container"
      >
        <h3>TodoList</h3>

        <Button
          variant="contained"
          onClick={() => {
            setShowTodoForm((prev) => !prev);
          }}
        >
          Add Todo
        </Button>
      </div>
      <div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : todos.length == 0 ? (
          <div
            style={{ textAlign: "center", fontWeight: "bold", color: "#ccc" }}
          >
            No todo, add one.
          </div>
        ) : (
          todos.map((todo: Todo, key: number) => {
            return (
              <TodoContainer key={(key + 1).toString()}>
                <h4>
                  {key + 1}. {todo.title}
                </h4>
                <div>
                  <Button
                    onClick={() => {
                      deleteTodoHandler(todo, key);
                    }}
                    color="error"
                  >
                    Delete
                  </Button>
                  {!todo.done && (
                    <Button
                      onClick={() => {
                        markDoneHandler(todo, key);
                      }}
                    >
                      Done
                    </Button>
                  )}
                </div>
              </TodoContainer>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodoList;
