import API from "./api";

// ===============================
// Get Messages
// ===============================

export const getMessages = async (
  receiverId
) => {
  console.log(
    "📥 Fetching messages:",
    receiverId
  );

  const { data } = await API.get(
    `/api/messages/${receiverId}`
  );

  console.log("Messages API:", data);

  return data;
};

// ===============================
// Send Message
// ===============================

export const sendMessage = async (
  receiverId,
  text
) => {
  console.log(
    "📤 Sending message:",
    text
  );

  const { data } = await API.post(
    `/api/messages/send/${receiverId}`,
    {
      text,
    }
  );

  console.log("Send API:", data);

  return data;
};