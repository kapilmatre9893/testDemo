import React, { useState } from "react";
import Navbar from "./Navbar";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task Alpha",
      description: "Description of Task Alpha",
      priority: "High",
      status: "Pending",
      assignee: "Alice Johnson",
    },
    {
      id: 2,
      name: "Task Beta",
      description: "Description of Task Beta",
      priority: "Medium",
      status: "In-progress",
      assignee: "Bob Smith",
    },
    {
      id: 3,
      name: "Task Gamma",
      description: "Description of Task Gamma",
      priority: "Low",
      status: "Completed",
      assignee: "Charlie Davis",
    },
  ]);

  const [formValues, setFormValues] = useState({
    id: null,
    name: "",
    description: "",
    priority: "Low",
    status: "Pending",
    assignee: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddOrUpdateTask = () => {
    if (isEditing) {
      setTasks(
        tasks.map((task) =>
          task.id === formValues.id ? { ...formValues } : task
        )
      );
    } else {
      setTasks([
        ...tasks,
        { ...formValues, id: tasks.length + 1 },
      ]);
    }
    resetForm();
  };

  const handleEditTask = (task) => {
    setFormValues(task);
    setIsEditing(true);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const resetForm = () => {
    setFormValues({ id: null, name: "", description: "", priority: "Low", status: "Pending", assignee: "" });
    setIsEditing(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredTasks.length / itemsPerPage)));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Task Management</h2>

        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search tasks by name"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
<div className="row"><div className="col-md-8">
   {/* Task List */}
   <div className="mb-4">
          {paginatedTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assignee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                    <td>{task.assignee}</td>
                    <td>
                      <button onClick={() => handleEditTask(task)} className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)} className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between">
          <button onClick={goToPreviousPage} className="btn btn-secondary" disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(filteredTasks.length / itemsPerPage)}
          </span>
          <button onClick={goToNextPage} className="btn btn-secondary" disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage)}>
            Next
          </button>
        </div>
</div>

<div className="col-md-4">
  {/* Add/Edit Form */}
  <div className="">
          <h4>{isEditing ? "Edit Task" : "Add New Task"}</h4>
          <form>
            <div className="mb-3">
              <label>Task Name</label>
              <input type="text" name="name" value={formValues.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea name="description" value={formValues.description} onChange={handleChange} className="form-control"></textarea>
            </div>
            <div className="mb-3">
              <label>Priority</label>
              <select name="priority" value={formValues.priority} onChange={handleChange} className="form-control">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select name="status" value={formValues.status} onChange={handleChange} className="form-control">
                <option value="Pending">Pending</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Assignee</label>
              <input type="text" name="assignee" value={formValues.assignee} onChange={handleChange} className="form-control" />
            </div>
            <button type="button" className={`btn ${isEditing ? "btn-primary" : "btn-success"} w-100`} onClick={handleAddOrUpdateTask}>
              {isEditing ? "Update Task" : "Add Task"}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary mt-2 w-100" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>
</div>
</div>
     

      
      </div>
    </>
  );
};

export default TaskManagement;
