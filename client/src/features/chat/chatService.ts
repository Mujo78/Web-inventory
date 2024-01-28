import axios from "axios";

const getInboxes = async (token: string) => {
  const res = await axios.get("/api/inbox", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getInboxChat = async (token: string, inboxId: string) => {
  const res = await axios.get(`/api/inbox-messages/${inboxId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getInboxById = async (token: string, inboxId: string) => {
  const res = await axios.get(`/api/inbox/${inboxId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const deleteInboxWithPerson = async (token: string, inboxId: string) => {
  const res = await axios.patch(
    `/api/delete-inbox/${inboxId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

const chatServices = {
  getInboxes,
  getInboxChat,
  getInboxById,
  deleteInboxWithPerson,
};

export default chatServices;
