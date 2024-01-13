import React, { useState } from "react";
import { getDate } from "../../helpers/ProductProcessSideFunc";
import { Button, Card, CustomFlowbiteTheme } from "flowbite-react";
import CustomButton from "../UI/CustomButton";
import { FiEdit } from "react-icons/fi";
import { MdDisabledByDefault } from "react-icons/md";
import { useAppDispatch } from "../../app/hooks";
import {
  Process,
  deactivateProcess,
  makeProcessActive,
  resetCurrentProcess,
} from "../../features/process/processSlice";
import { useNavigate } from "react-router-dom";
import ProcessModal from "./ProcessModal";

const customTheme: CustomFlowbiteTheme["card"] = {
  root: {
    children: "flex h-full flex-col justify-center gap-4 !p-0",
  },
};

const style = {
  height: "20px",
  color: "white",
};

interface Props {
  process: Process;
}

const ProcessCard: React.FC<Props> = ({ process }) => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const seeMore = () => {
    setShow(true);
  };

  const makeActive = (event: React.FormEvent, id: string) => {
    event.stopPropagation();
    dispatch(resetCurrentProcess());
    dispatch(makeProcessActive(id));
  };

  const editById = (event: React.FormEvent) => {
    event.stopPropagation();
    navigate(`/edit-process/${process._id}`);
  };

  const makeDeactive = (event: React.FormEvent) => {
    event.stopPropagation();
    dispatch(deactivateProcess(process._id));
  };

  return (
    <>
      <Card
        theme={customTheme}
        onClick={seeMore}
        className={`mb-4 w-full hover:!bg-gray-100 p-0 cursor-pointer overflow-hidden ${
          show && "!bg-green-100"
        }`}
        key={process._id}
      >
        <div className="flex relative">
          <div className="flex items-center p-6 w-11/12">
            <p className="p-0">{process.name}</p>
            {process.start_date && process.end_date ? (
              <div className="flex flex-col mx-auto text-xs">
                <p className="mx-auto font-semi-bold text-green-500">
                  {getDate(process.start_date)}
                </p>
                <p className="mx-auto font-semi-bold text-red-500">
                  {getDate(process.start_date)}
                </p>
              </div>
            ) : process.end_date ? (
              <p className="mx-auto text-xs font-semi-bold text-red-500">
                {getDate(process.end_date)}
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div
            className={`flex items-center ${
              process.start_date && process.end_date && "mr-3"
            } border-l-2 w-fit`}
          >
            <CustomButton
              className="h-full ml-auto rounded-none bg-gray-300 hover:!bg-gray-400"
              onClick={editById}
              v={1}
            >
              <FiEdit style={style} />
            </CustomButton>
            {process.start_date && process.end_date ? (
              ""
            ) : (
              <CustomButton
                className="h-full bg-red-600 rounded-none hover:!bg-red-700"
                onClick={makeDeactive}
                v={2}
              >
                <MdDisabledByDefault style={style} />
              </CustomButton>
            )}
          </div>
          {process.start_date && process.end_date ? (
            ""
          ) : (
            <div>
              <Button
                onClick={(e) => makeActive(e, process._id)}
                className="hover:!bg-red-600 bg-red-500 ml-3 rounded-r-lg h-full rounded-none"
              >
                <div className="h-full text-sm flex justify-center items-center flex-grow-0">
                  <p className="text-[9px]">MA</p>
                </div>
              </Button>
            </div>
          )}
        </div>
      </Card>
      {show && (
        <ProcessModal activeId={process._id} show={show} setShow={setShow} />
      )}
    </>
  );
};

export default ProcessCard;
