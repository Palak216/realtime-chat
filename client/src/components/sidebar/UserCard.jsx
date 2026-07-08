import Avatar from "../common/Avatar";
import { useChat } from "../../context/ChatContext";

const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
}) => {
  const { unreadMessages } = useChat();

  const isSelected = selectedUser?._id === user._id;

  const unreadCount = unreadMessages[user._id] || 0;

  const handleClick = () => {
    console.log("=================================");
    console.log("👤 User Selected");
    console.log(user);

    setSelectedUser(user);
  };

  return (
    <div
      onClick={handleClick}
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
            ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-xl scale-[1.02]"
            : "hover:bg-slate-800"
        }
      `}
    >
      {/* Avatar */}

      <div className="relative">

        <Avatar
          name={user.name}
          online={user.online}
        />

        {/* Online Dot */}

        <span
          className={`
            absolute
            bottom-0
            right-0
            w-4
            h-4
            rounded-full
            border-2
            border-slate-900

            ${
              user.online
                ? "bg-green-500"
                : "bg-gray-500"
            }
          `}
        />

      </div>

      {/* User Info */}

      <div className="flex-1 overflow-hidden">

        <h3 className="text-white font-semibold truncate">
          {user.name}
        </h3>

        <p className="text-sm text-slate-400 truncate">
          {user.online ? "Online" : "Offline"}
        </p>

      </div>

      {/* Unread Badge */}

      {unreadCount > 0 && (
        <div
          className="
            min-w-[24px]
            h-6
            px-2
            rounded-full
            bg-red-500
            flex
            items-center
            justify-center
            text-white
            text-xs
            font-bold
          "
        >
          {unreadCount}
        </div>
      )}

    </div>
  );
};

export default UserCard;