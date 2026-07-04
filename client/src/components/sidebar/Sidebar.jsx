import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import UserCard from "./UserCard";

const Sidebar = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="w-80 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          Pulse

        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Real-Time Messenger
        </p>

      </div>

      {/* Search */}

      <SearchBar
        users={users}
        setFilteredUsers={setFilteredUsers}
      />

      {/* Users */}

      <div className="flex-1 overflow-y-auto pb-3">

        {filteredUsers.length === 0 ? (

          <div className="flex justify-center mt-12 text-slate-500">

            No users found

          </div>

        ) : (

          filteredUsers.map((user) => (

            <UserCard
              key={user._id}
              user={user}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />

          ))

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <div className="text-center text-xs text-slate-500">

          Pulse v1.0

        </div>

      </div>

    </div>
  );
};

export default Sidebar;