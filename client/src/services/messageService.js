import API from "./api";

// ===============================
// Get Messages
// ===============================

export const getMessages = async (
  receiverId
) => {
  console.log("📥 Fetching Messages");
  console.log(receiverId);

  const { data } = await API.get(
    `/messages/${receiverId}`
  );

  console.log("Messages API:");
  console.log(data);

  return data;
};

// ===============================
// Send Message
// ===============================

export const sendMessage = async (
  receiverId,
  text
) => {
  console.log("🔥 messageService called");
  console.log("Receiver:", receiverId);
  console.log("Text:", text);

  const { data } = await API.post(
    `/messages/send/${receiverId}`,
    {
      text,
    }
  );

  console.log("✅ Message API Response");
  console.log(data);

  return data;
};