import { useEffect } from "react";
import SearchHeader from "../UI/SearchHeader";
import PersonMessage from "./PersonMessage";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { chat, getMyInbox } from "../../features/chat/chatSlice";
import CustomSpinner from "../UI/CustomSpinner";

const Messages = () => {
  const dispatch = useAppDispatch();
  const { status, inbox, message } = useSelector(chat);
  const { receiverId } = useParams();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyInbox());
  }, [dispatch]);

  useEffect(() => {
    if (!receiverId && inbox.length > 0) {
      navigate(`${location}/${inbox[0].participant._id}`);
    }
  }, [location, navigate, inbox, receiverId]);

  return (
    <div className="h-[89vh] w-full flex flex-col px-3 py-2 items-start gap-6">
      <SearchHeader placeholder="Name" className="w-full" />
      <div className="flex-grow-1 w-full flex flex-col gap-1">
        {status === "loading" || status === "start" ? (
          <CustomSpinner />
        ) : inbox && inbox.length > 0 ? (
          inbox.map((m) => <PersonMessage key={m._id} {...m} />)
        ) : (
          status === "failed" && <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
