import axios from "axios";

export async function getInboxChat(token: string, receiverId: string) {
  const response = await axios.post(
    "/api/inbox-messages",
    {
      receiverId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
