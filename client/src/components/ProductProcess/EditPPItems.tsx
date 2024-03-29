import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { ProductItem } from "../../features/process/processSlice";
import { Alert, Button, Tooltip } from "flowbite-react";
import LayoutForm from "./LayoutForm";

const EditPPItems: React.FC<{ items: ProductItem[] }> = ({ items }) => {
  const dispatch = useAppDispatch();
  const [messageError, setMessageError] = useState<string>("");
  const [toggleShow, setToggleShow] = useState<boolean>(false);

  return (
    <div>
      <h1 className="font-Rubik text-xl mt-9 ml-3 font-bold">Items</h1>
      {items.length > 0 ? (
        <div>
          <p className="text-xs text-gray-500 font-normal pb-5 ml-3">
            Hover material name to change quantity of process item!
          </p>
          <div className="flex w-full">
            {items.map((n) => (
              <Tooltip
                key={n._id}
                className={!toggleShow ? "!bg-green-100" : "!bg-red-100"}
                content={
                  <LayoutForm
                    quantity={n.quantity}
                    toggleShow={toggleShow}
                    setToggleShow={setToggleShow}
                    _id={n._id}
                    name={n.material_id.name}
                    materialQuantity={n.material_id.quantity}
                  />
                }
                animation="duration-1000"
              >
                <Button color="gray" className="m-2 hover:!text-green-500">
                  {n.material_id.name}
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Alert color="info" className="flex items-center mt-5">
            There are no items for this process!
          </Alert>
        </div>
      )}
    </div>
  );
};

export default EditPPItems;
