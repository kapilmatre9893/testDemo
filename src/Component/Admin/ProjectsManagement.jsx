import React, { useState } from "react";
import Navbar from "./Navbar";

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", description: "Alpha description", deadline: "2024-01-15" },
    { id: 2, name: "Project Beta", description: "Beta description", deadline: "2024-02-20" },
    { id: 3, name: "Project Gamma", description: "Gamma description", deadline: "2024-03-05" },
    { id: 4, name: "Project Delta", description: "Delta description", deadline: "2024-04-10" },
    { id: 5, name: "Project Epsilon", description: "Epsilon description", deadline: "2024-05-01" },
    { id: 6, name: "Project Zeta", description: "Zeta description", deadline: "2024-06-18" },
    // Add more dummy data as needed
  ]);

  const [formValues, setFormValues] = useState({ id: null, name: "", description: "", deadline: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3; // Number of items to show per page
  const totalPages = Math.ceil(projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase())).length / itemsPerPage);

  // Filtered and paginated projects
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle adding a new project
  const handleAddProject = () => {
    if (formValues.name && formValues.description && formValues.deadline) {
      setProjects([...projects, { id: projects.length + 1, ...formValues }]);
      resetForm();
    }
  };

  // Handle editing an existing project
  const handleEditProject = (project) => {
    setFormValues(project);
    setIsEditing(true);
  };

  const handleUpdateProject = () => {
    setProjects(projects.map((project) => (project.id === formValues.id ? formValues : project)));
    resetForm();
    setIsEditing(false);
  };

  // Handle deleting a project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Reset the form values
  const resetForm = () => {
    setFormValues({ id: null, name: "", description: "", deadline: "" });
    setIsEditing(false);
  };

  // Handle search term changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page after searching
  };

  // Handle pagination
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <h2 className="mb-4">Projects Management</h2>
      <div className="row">
        {/* Projects List */}
        <div className="col-md-8">
          <h4>Projects List</h4>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Search projects by name"
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
            />
          </div>

          {paginatedProjects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <ul className="list-group">
              {paginatedProjects.map((project) => (
                <li key={project.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{project.name}</h5>
                      <p>{project.description}</p>
                      <small>Deadline: {project.deadline}</small>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditProject(project)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProject(project.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="mt-3 d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="col-md-4">
          <h4>{isEditing ? "Edit Project" : "Add New Project"}</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formValues.deadline}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button
              type="button"
              className={`btn ${isEditing ? "btn-primary" : "btn-success"} w-100`}
              onClick={isEditing ? handleUpdateProject : handleAddProject}
            >
              {isEditing ? "Update Project" : "Add Project"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary mt-2 w-100"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectsManagement;
