import React from 'react';

const Projects = () => {
  const projects = [
    { id: 1, name: 'E-commerce Platform', status: 'In Progress', progress: 75, deadline: '2023-12-31', team: '5 members' },
    { id: 2, name: 'Mobile App Redesign', status: 'Completed', progress: 100, deadline: '2023-11-15', team: '3 members' },
    { id: 3, name: 'API Integration', status: 'In Progress', progress: 45, deadline: '2024-01-15', team: '2 members' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button className="btn btn-primary">+ New Project</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Deadline</th>
                <th>Team</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td data-label="Project Name" className="font-medium">{project.name}</td>
                  <td data-label="Status">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td data-label="Progress">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-primary" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </td>
                  <td data-label="Deadline">{project.deadline}</td>
                  <td data-label="Team">{project.team}</td>
                  <td className="text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;
