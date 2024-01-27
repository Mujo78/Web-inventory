import axios from "axios";

export async function getUserInfo(token: string, userId: string) {
  const res = await axios.get(`/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

function capitalize(word: string) {
  return word.charAt(0).toLocaleUpperCase() + word.slice(1, word.length);
}

export function formatUserName(username: string) {
  const dotIndex = username.indexOf(".");

  const firstName = capitalize(username.slice(0, dotIndex));
  const lastName = capitalize(username.slice(dotIndex + 1, username.length));

  return `${firstName} ${lastName}`;
}
