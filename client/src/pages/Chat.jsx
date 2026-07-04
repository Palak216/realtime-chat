import { useChat } from "../context/ChatContext";

import Sidebar from "../components/sidebar/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";

const Chat = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    messages,
  } = useChat();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex overflow-hidden">

      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <div className="flex flex-col flex-1">

        <ChatHeader
          selectedUser={selectedUser}
        />

        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
        />

        <MessageInput
          selectedUser={selectedUser}
        />

      </div>

    </div>
  );
};

export default Chat;