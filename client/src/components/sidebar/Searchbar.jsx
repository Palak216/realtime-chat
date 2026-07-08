import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./Searchbar";
const Searchbar = ({
  users,
  setFilteredUsers,
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="p-4">

      <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-500 transition">

        <FiSearch
          size={20}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={handleSearch}
          className="bg-transparent flex-1 outline-none text-white placeholder:text-slate-500"
        />

      </div>

    </div>
  );
};

export default SearchBar;