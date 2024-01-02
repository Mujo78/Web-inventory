import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { authUser, setSelected } from "../features/auth/authSlice";

const useSelectedPage = (pageName: string) => {
  const dispatch = useAppDispatch();
  const { selected } = useSelector(authUser);

  useEffect(() => {
    if (selected !== pageName) {
      dispatch(setSelected(pageName));
    }
  }, [selected, pageName, dispatch]);
};

export default useSelectedPage;
