import Avatar from "../common/Avatar";

const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
}) => {
  const isSelected = selectedUser?._id === user._id;

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`
      mx-2
      my-2
      px-4
      py-3
      rounded-2xl
      cursor-pointer
      flex
      items-center
      gap-4
      transition-all
      duration-300

      ${
        isSelected
          ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg scale-[1.02]"
          : "hover:bg-slate-800"
      }
      `}
    >
      <Avatar
        name={user.name}
        online={user.online}
      />

      <div className="flex-1 overflow-hidden">
        <h3 className="text-white font-semibold truncate">
          {user.name}
        </h3>

        <p className="text-sm text-slate-300 truncate">
          Tap to start chatting
        </p>
      </div>

      <div>
        {user.online ? (
          <span className="text-green-400 text-xs">
            Online
          </span>
        ) : (
          <span className="text-slate-500 text-xs">
            Offline
          </span>
        )}
      </div>
    </div>
  );
};

export default UserCard;