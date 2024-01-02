import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSuppliers, supplier } from "../../features/supplier/suppSlice";
import { useAppDispatch } from "../../app/hooks";
import { Alert, Button, Card, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import CustomSpinner from "../../components/UI/CustomSpinner";
import useSelectedPage from "../../hooks/useSelectedPage";
import EditSupplier from "./EditSupplier";

const Supplier: React.FC = () => {
  const [selected, setSelected] = useState<string>();
  const dispatch = useAppDispatch();
  const { suppliers, status } = useSelector(supplier);
  const navigate = useNavigate();

  useSelectedPage("Suppliers");

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const supplierDetail = (id: string) => {
    setSelected(id);
  };

  const resetSelected = () => {
    setSelected(undefined);
  };

  const addNewSupplier = () => {
    navigate("/add-supplier");
  };

  return (
    <div className="flex">
      <div className="h-4/5 scroll-smooths w-full ">
        {status === "loading" ? (
          <CustomSpinner />
        ) : status !== "failed" && suppliers.length > 0 ? (
          <div>
            <div className="flex w-full gap-3">
              <div className="w-2/4 mx-auto flex gap-3">
                <TextInput className="w-full" />
                <Button size="md" color="success">
                  Search
                </Button>
              </div>
              <Button onClick={addNewSupplier} color="success">
                Add New Supplier +
              </Button>
            </div>
            <div className="flex w-full mt-3">
              <div className="w-3/4 flex flex-wrap">
                {suppliers.map((n) => (
                  <Card
                    onClick={() => supplierDetail(n._id)}
                    className={`mt-2 max-w-1/3 mr-2 hover:bg-gray-100 cursor-pointer ${
                      selected === n._id && "!bg-green-100"
                    }`}
                    key={n._id}
                  >
                    <div className="flex flex-col">
                      <h5 className="text-xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                        {n.name}
                      </h5>
                      <h5 className="text-md ml-auto font-semibold tracking-tight text-gray-900 dark:text-white">
                        {n.email}
                      </h5>
                      <h5 className="text-md ml-auto font-bold tracking-tight text-gray-900 dark:text-white">
                        {n.pdv} %
                      </h5>
                    </div>
                    <div className="font-normal flex flex-col text-left text-gray-700 dark:text-gray-400">
                      <p>{`S: ${n.start_date?.toString().substring(0, 10)}`}</p>
                      {n.end_date && (
                        <p className="text-red-500">
                          {`E: ${n.end_date?.toString().substring(0, 10)}`}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="border-l border-gray-200 relative w-1/4">
                {selected ? (
                  <>
                    <button
                      onClick={resetSelected}
                      className="bg-none hover:bg-white hover:scale-125 transition-all duration-300 absolute right-2"
                    >
                      <GrFormClose style={{ height: "35px", width: "35px" }} />
                    </button>

                    <EditSupplier id={selected} />
                  </>
                ) : (
                  <div className="flex items-center justify-center mt-24">
                    <span>You need to select supplier</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Alert color="info" className="flex items-center mt-6">
              <h1>There are no suppliers available.</h1>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;
