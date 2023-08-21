import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
// import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import todoState from "../../recoil/atoms/todo-atom";
// import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  setShowTodoForm: Dispatch<SetStateAction<boolean>>;
};
const API_URL = import.meta.env.VITE_API_URL;

const AuthPage: React.FC<Props> = ({ setShowTodoForm }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [addingTodo, setAddingTodo] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    description: "",
  });

  async function addTodoHandler() {
    setAddingTodo(true);
    const { data } = await axios.post(
      `${API_URL}/api/todo_app/todo`,
      {
        ...details,
        done: false,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setTodos([...todos, data.data[0]]);
    setAddingTodo(false);
    setShowTodoForm(false);
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="card">
      <Typography variant="h4" textAlign="center" fontWeight={600}>
        Add todo
      </Typography>
      <TextField
        label="Title"
        placeholder="Enter title"
        name="title"
        onChange={changeHandler}
        value={details.title}
      />
      <TextField
        label="Description"
        placeholder="Enter description"
        name="description"
        onChange={changeHandler}
        value={details.description}
      />

      <div className="action_container">
        <Button
          onClick={() => {
            setShowTodoForm((prev) => !prev);
          }}
        >
          Cancel
        </Button>
        <Button onClick={addTodoHandler} variant="contained">
          {addingTodo ? "adding.." : "Add Todo"}
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
