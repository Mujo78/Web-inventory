import { Card, CustomFlowbiteTheme } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { deleteMaterialById } from "../../features/material/materialSlice";
import CustomButton from "../UI/CustomButton";
import MaterialDetails from "./MaterialDetailsModal";

const customTheme: CustomFlowbiteTheme["card"] = {
  root: {
    base: "flex rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300 bg-white shadow-md dark:border-gray-700 w-full dark:bg-gray-800",
  },
};

export interface Props {
  _id: string;
  name: string;
  quantity: number;
}

const style = {
  height: "20px",
  color: "black",
};

const MaterialCard: React.FC<Props> = ({ _id, name, quantity }) => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editMaterial = (event: React.FormEvent) => {
    event.stopPropagation();
    navigate(`/edit-material/${_id}`);
  };

  const deleteMaterial = (event: React.FormEvent) => {
    event.stopPropagation();
    dispatch(deleteMaterialById(_id));
  };

  const viewMaterial = () => {
    setShow(true);
  };

  return (
    <>
      <Card
        onClick={viewMaterial}
        theme={customTheme}
        className={`${
          show && "!bg-green-100"
        } mb-3 h-[70px] cursor-pointer mr-3`}
      >
        <div className="flex w-full items-center justify-between">
          <h1>
            {name} - ({quantity}x)
          </h1>
          <div className="flex ml-auto gap-3">
            <CustomButton onClick={(e) => editMaterial(e)} v={1}>
              <FiEdit style={style} />
            </CustomButton>
            <CustomButton onClick={(e) => deleteMaterial(e)} v={1}>
              <AiOutlineDelete style={{ color: "red", height: "20px" }} />
            </CustomButton>
          </div>
        </div>
      </Card>
      {show && <MaterialDetails id={_id} show={show} setShow={setShow} />}
    </>
  );
};

export default MaterialCard;
