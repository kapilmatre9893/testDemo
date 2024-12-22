import Navbar from "../Navbar";


function Dashboard() {
  const projects = [
    { id: 1, name: "Project Alpha", description: "Alpha Description", deadline: "2024-01-15" },
    { id: 2, name: "Project Beta", description: "Beta Description", deadline: "2024-02-20" },
    { id: 3, name: "Project Gamma", description: "Gamma Description", deadline: "2024-03-10" },
  ];

  const tasks = [
    { id: 1, name: "Task 1", status: "Pending", priority: "High", assignee: "Alice" },
    { id: 2, name: "Task 2", status: "In-progress", priority: "Medium", assignee: "Bob" },
    { id: 3, name: "Task 3", status: "Completed", priority: "Low", assignee: "Charlie" },
    { id: 4, name: "Task 4", status: "Pending", priority: "High", assignee: "Alice" },
  ];

  const teamMembers = [
    { id: 1, name: "Alice", tasks: ["Task 1", "Task 4"] },
    { id: 2, name: "Bob", tasks: ["Task 2"] },
    { id: 3, name: "Charlie", tasks: ["Task 3"] },
  ];

  // Calculate task stats
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In-progress").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  return (
    <div className="App">
  <Navbar />
  <div className="container mt-5">
      <div className="row">
        {/* Total Projects */}
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Projects</h5>
              <p className="card-text display-4">{projects.length}</p>
              <ul className="list-group">
                {projects.map((project) => (
                  <li key={project.id} className="list-group-item">
                    {project.name} - Deadline: {project.deadline}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Total Tasks */}
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Tasks</h5>
              <p className="card-text">
                <strong>Pending:</strong> {pendingTasks} <br />
                <strong>In-Progress:</strong> {inProgressTasks} <br />
                <strong>Completed:</strong> {completedTasks}
              </p>
              <ul className="list-group">
                {tasks.map((task) => (
                  <li key={task.id} className="list-group-item">
                    {task.name} - {task.priority} Priority
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Team Members</h5>
              <ul className="list-group">
                {teamMembers.map((member) => (
                  <li key={member.id} className="list-group-item">
                    {member.name} - <strong>{member.tasks.length}</strong> tasks
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
