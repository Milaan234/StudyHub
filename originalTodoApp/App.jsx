import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  })

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  function addTodo() {
    if (task === "") return;

    setTodos([...todos, task]);

    setTask("");
  }

  function deleteTodo(indexToDelete) {
    const newTodos = todos.filter((_, index) => {
      return index !== indexToDelete;
    })
    setTodos(newTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos];
    updatedTodos[id] = editingText;
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <>
      <div className="App">
        <title>To-Do App</title>
        <form onSubmit={(e) => {e.preventDefault()}}>
          <h2>Enter Task Name:</h2>
          <input type="text" id="newTaskNameInput" value={task} onChange={(e) => setTask(e.target.value)} placeholder='What needs to be done?'></input>
          <button id="addNewTodo" onClick={addTodo}>Add To-do</button>
        </form>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                {index === todoEditing ? (
                  <div>
                    <input type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText}></input>
                    <button onClick={() => submitEdits(index)}>Submit Edits</button>
                  </div>
                ) : (
                  <div>
                    {todo}
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                    <button onClick={() => {
                      setEditingText(todo);
                      setTodoEditing(index);
                    }}>
                      Edit</button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
