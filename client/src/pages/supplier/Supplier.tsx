import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSuppliers, supplier } from "../../features/supplier/suppSlice";
import { useAppDispatch } from "../../app/hooks";
import { Alert, Card } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import CustomSpinner from "../../components/UI/CustomSpinner";
import useSelectedPage from "../../hooks/useSelectedPage";
import EditSupplier from "./EditSupplier";
import { useQuery } from "../../hooks/useQuery";
import CustomPagination from "../../components/UI/Pagination";
import SupplierHeader from "../../components/Supplier/SupplierHeader";

const Supplier: React.FC = () => {
  const [selected, setSelected] = useState<string>();
  const query = useQuery();

  const searchQuery = query.get("searchQuery");
  const page = Number(query.get("page")) || 1;
  const dispatch = useAppDispatch();
  const { suppliers, status } = useSelector(supplier);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const limit = 12;
  useSelectedPage("Suppliers");

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery !== null) {
        dispatch(getSuppliers({ searchQuery, page, limit }));
        navigate(`${location}?searchQuery=${searchQuery}&page=${page}`);
      } else {
        dispatch(getSuppliers({ limit, page }));
        navigate(`${location}?page=${page}`);
      }
    };

    fetchData();
  }, [dispatch, searchQuery, page, location, navigate]);

  const supplierDetail = (id: string) => {
    setSelected(id);
  };

  const resetSelected = () => {
    setSelected(undefined);
  };

  const handleNavigate = (pageNum: number) => {
    let page: number = pageNum;
    if (searchQuery !== null) {
      dispatch(getSuppliers({ searchQuery, page, limit }));
      navigate(`${location}?searchQuery=${searchQuery}&page=${page}`);
    } else {
      dispatch(getSuppliers({ limit, page }));
      navigate(`${location}?page=${page}`);
    }
  };

  return (
    <div className="h-[89vh] overflow-y-hidden w-full">
      {status !== "failed" && suppliers.data.length > 0 ? (
        <div>
          <SupplierHeader />
          <div className="flex flex-col w-full mt-3 h-[70vh]">
            <div className="flex w-full h-full">
              <div className="w-3/4 flex flex-wrap justify-center">
                {status === "loading" ? (
                  <CustomSpinner />
                ) : (
                  suppliers.data.map((n) => (
                    <Card
                      onClick={() => supplierDetail(n._id)}
                      className={`mt-2 w-1/5 mr-2 hover:bg-gray-100 h-52 cursor-pointer ${
                        selected === n._id && "!bg-green-100"
                      }`}
                      key={n._id}
                    >
                      <div className="flex flex-col">
                        <h5 className="text-xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                          {n.name}
                        </h5>
                        <h5 className="text-md ml-auto font-semibold mx-auto tracking-tight text-gray-900 dark:text-white">
                          {n.email}
                        </h5>
                        <h5 className="text-md ml-auto font-bold tracking-tight text-gray-900 dark:text-white">
                          {n.pdv} %
                        </h5>
                      </div>
                      <div className="font-normal flex flex-col text-left text-gray-700 dark:text-gray-400">
                        <p>{`S: ${n.start_date
                          ?.toString()
                          .substring(0, 10)}`}</p>
                        {n.end_date && (
                          <p className="text-red-500">
                            {`E: ${n.end_date?.toString().substring(0, 10)}`}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))
                )}
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
                  <div className="flex items-center justify-center mt-48 text-gray-500">
                    <span>You need to select supplier</span>
                  </div>
                )}
              </div>
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

      <div className="mt-10">
        {suppliers.currentPage && suppliers.numOfPages && (
          <CustomPagination
            handleNavigate={handleNavigate}
            totalPages={suppliers.numOfPages}
            currentPage={suppliers.currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Supplier;
