import axios from "axios";

const getInboxes = async (token: string) => {
  const res = await axios.get("/api/inbox", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getInboxChat = async (token: string, receiverId: string) => {
  const res = await axios.get(`/api/inbox-messages/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const chatServices = {
  getInboxes,
  getInboxChat,
};

export default chatServices;
