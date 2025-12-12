

const Team = () => {
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Frontend Developer', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'UI/UX Designer', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Robert Johnson', role: 'Backend Developer', email: 'robert@example.com', status: 'On Leave' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team and permissions</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ width: '16px', height: '16px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-all duration-200 gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar removed as requested */}
                <div>
                  <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{member.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="hidden md:flex items-center text-gray-500 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {member.email}
                </div>

                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                  {member.status}
                </span>

                <div className="flex gap-3">
                  <button className="btn btn-primary px-4 py-2 text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all">
                    Message
                  </button>
                  <button className="btn btn-primary px-4 py-2 text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all">
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
