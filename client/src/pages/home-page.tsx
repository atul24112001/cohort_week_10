import React, { useState } from "react";
import styled from "styled-components";
import TodoForm from "../components/home/TodoForm";
import TodoList from "../components/home/TodoList";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  .card {
    background-color: white;
    color: black;
    width: 40vw;
    padding: 12px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);

    .action_container {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 10px;
    }
  }
`;

const HomePage: React.FC = () => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  return (
    <Container>
      {showTodoForm ? (
        <TodoForm setShowTodoForm={setShowTodoForm} />
      ) : (
        <TodoList setShowTodoForm={setShowTodoForm} />
      )}
    </Container>
  );
};

export default HomePage;
