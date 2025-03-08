import { useState } from "react";

const TodosList = () => {
  // State for storing todos
  const [todos, setTodos] = useState([]);

  // State for input fields
  const [input, setInput] = useState({
    item: "",
    itemDescription: "",
    date: "",
    time: "",
  });

  // State to track editing
  const [editIndex, setEditIndex] = useState(null);

  // Handle input field changes
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Add new data or update existing data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.item || !input.itemDescription || !input.date || !input.time) {
      alert("Please fill out all fields.");
      return;
    }

    if (editIndex !== null) {
      // Editing existing todo
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...input } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Adding new todo
      setTodos([...todos, { ...input }]);
    }

    setInput({ item: "", itemDescription: "", date: "", time: "" });
  };

  // Delete a todo item
  const deleteData = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setInput({ item: "", itemDescription: "", date: "", time: "" });
    }
  };

  // Edit a todo item
  const editData = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
    setInput({ item: "", itemDescription: "", date: "", time: "" });
  };

  return (
    <div className="bg-warning w-50 mx-auto mt-5 rounded-3 p-4">
      <h2>Todo APP</h2>

      {/* Form for adding/updating todo */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={handleInputs}
          name="item"
          value={input.item}
          placeholder="Enter Your Item"
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Item Description"
          value={input.itemDescription}
          name="itemDescription"
          onChange={handleInputs}
        />
        <br />
        <input
          type="date"
          className="form-control"
          onChange={handleInputs}
          name="date"
          value={input.date}
        />
        <br />
        <input
          type="time"
          className="form-control"
          name="time"
          onChange={handleInputs}
          value={input.time}
        />
        <br />
        <button type="submit" className="btn btn-success">
          {editIndex !== null ? "Update Data" : "Add Data"}
        </button>
        {editIndex !== null && (
          <button type="button" className="btn btn-secondary mx-2" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {/* Todo List Table */}
      {todos.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>SR No</th>
              <th>Item List</th>
              <th>Item Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.item}</td>
                <td>{data.itemDescription}</td>
                <td>{data.date}</td>
                <td>{data.time}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => editData(index)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteData(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodosList;
