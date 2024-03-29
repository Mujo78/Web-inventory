import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProcesses, process } from "../../features/process/processSlice";
import { useAppDispatch } from "../../app/hooks";
import { Alert } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import CustomSpinner from "../../components/UI/CustomSpinner";
import useSelectedPage from "../../hooks/useSelectedPage";
import CurrentActiveProcess from "../../components/ProductProcess/CurrentActiveProcess";
import ProductProcessChart from "../../components/ProductProcess/ProductProcessChart";
import IconButton from "../../components/UI/IconButton";
import ProcessCard from "../../components/ProductProcess/ProcessCard";
import { useQuery } from "../../hooks/useQuery";
import SearchHeader from "../../components/UI/SearchHeader";

const ProductProcess: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const processName = query.get("searchQuery");

  useSelectedPage("Product Processes");

  useEffect(() => {
    if (processName) {
      navigate(`${location.pathname}?searchQuery=${processName}`);
      dispatch(getProcesses({ processName }));
    } else {
      navigate(`${location.pathname}`);
      dispatch(getProcesses());
    }
  }, [dispatch, processName, location.pathname, navigate]);

  const { processes, status } = useSelector(process);
  const [currentActiveProcess, setCurrentActiveProcess] = useState<
    string | undefined
  >();
  useEffect(() => {
    if (processes) {
      setCurrentActiveProcess(
        processes?.find((p) => p.start_date !== null && p.end_date === null)
          ?._id
      );
    }
  }, [processes]);

  return (
    <div className="h-[89vh] w-full flex relative">
      <div className="h-full pr-2 w-3/5 pb-12 overflow-hidden ">
        <SearchHeader
          placeholder="Product process name"
          className="w-full px-3 py-2"
        />
        <div
          id="content"
          className="p-3 scroll-smooths h-full scroll-p-0 overflow-y-scroll"
        >
          {status === "loading" ? (
            <CustomSpinner />
          ) : status === "idle" && processes?.length > 0 ? (
            processes.map(
              (n) =>
                !(n.start_date !== null && n.end_date === null) && (
                  <ProcessCard key={n._id} process={n} />
                )
            )
          ) : status !== "failed" ? (
            <CustomSpinner />
          ) : (
            <Alert color="info" className="flex items-center">
              <h1>There are no processes available!</h1>
            </Alert>
          )}
        </div>
      </div>
      <div className="h-full pl-3 w-2/5 flex flex-col justify-center gap-4">
        <CurrentActiveProcess activeId={currentActiveProcess} />
        <ProductProcessChart />
      </div>
      <IconButton
        onClick={() => navigate("/add-process")}
        className="absolute right-10 !shadow-2xl border-2 !border-gray-100 bottom-10"
      >
        <AiOutlinePlus
          style={{ color: "green", width: 30, height: 30, fontWeight: "bold" }}
        />
      </IconButton>
    </div>
  );
};

export default ProductProcess;
