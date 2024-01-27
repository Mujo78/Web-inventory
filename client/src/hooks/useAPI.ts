import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authUser } from "../features/auth/authSlice";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface PropsType<T> {
  condition?: string | number | undefined;
  url: string;
  method: AxiosRequestConfig["method"];
}

function useAPI<T>({ condition, method, url }: PropsType<T>) {
  const { accessUser } = useSelector(authUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [data, setData] = useState<T>();

  useEffect(() => {
    async function getData() {
      try {
        if (accessUser && condition) {
          setLoading(true);
          const res: AxiosResponse<T> = await axios({
            method,
            url,
            headers: {
              Authorization: `Bearer ${accessUser.accessToken}`,
            },
          });

          setData(res.data);

          setLoading(false);
        }
      } catch (error: any) {
        setInfoMessage(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [condition, accessUser, method, url]);

  return { loading, infoMessage, data };
}

export default useAPI;
