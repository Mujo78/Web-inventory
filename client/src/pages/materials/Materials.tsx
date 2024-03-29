import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { getMaterials, material } from "../../features/material/materialSlice";
import { Alert } from "flowbite-react";
import MaterialChart from "../../components/Materials/MaterialChart";
import { useLocation, useNavigate } from "react-router-dom";
import MaterialCard from "../../components/Materials/MaterialCard";
import axios from "axios";
import CustomSpinner from "../../components/UI/CustomSpinner";
import useSelectedPage from "../../hooks/useSelectedPage";
import { AiOutlinePlus } from "react-icons/ai";
import { Tooltip as ToolTp } from "flowbite-react";
import { useQuery } from "../../hooks/useQuery";
import SearchHeader from "../../components/UI/SearchHeader";
import IconButton from "../../components/UI/IconButton";

interface materialsQuantity {
  name: string;
  quantity: number;
}

interface supplierMaterial {
  supplier: string;
  materialsCount: number;
}

export interface SupplierWithMaterialAndQuantity {
  materialsQuantity: materialsQuantity[];
  supplierMaterialCounts: supplierMaterial[];
}

const Materials: React.FC = () => {
  const [suppMatt, setSuppMatt] = useState<SupplierWithMaterialAndQuantity>();
  const location = useLocation();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");

  useSelectedPage("Materials");

  const getSupplierMaterials = async () => {
    const res = await axios.get("/api/supplier-materials");
    const data = res.data;
    setSuppMatt(data);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchQuery) {
      navigate(`${location.pathname}?searchQuery=${searchQuery}`);
      dispatch(getMaterials({ searchQuery }));
    } else {
      navigate(`${location.pathname}`);
      dispatch(getMaterials());
    }
  }, [dispatch, searchQuery, location.pathname, navigate]);

  const { materials, status } = useSelector(material);

  useEffect(() => {
    getSupplierMaterials();
  }, [materials]);

  return (
    <div className="flex relative w-full h-[89vh] overflow-y-hidden ">
      <div className=" flex w-full h-full">
        <div className="w-2/4 p-6 h-full overflow-y-hidden">
          <SearchHeader placeholder="Material name" className="w-full" />

          <div className="pt-4 pb-12 h-full w-full">
            <div
              id="content"
              className="h-full overflow-y-auto overflow-x-hidden w-full"
            >
              {status === "loading" ? (
                <CustomSpinner size="md" />
              ) : materials.length > 0 ? (
                materials.map((m) => (
                  <MaterialCard
                    key={m._id}
                    _id={m._id}
                    name={m.name}
                    quantity={m.quantity}
                  />
                ))
              ) : (
                <div>
                  <Alert color="info" className="text-center flex items-center">
                    <p>There are no materials available.</p>
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
        {suppMatt && (
          <div className="ml-5 h-full w-2/4">
            <MaterialChart suppMatt={suppMatt} />
          </div>
        )}
      </div>
      <IconButton
        onClick={() => navigate("/add-material")}
        className="absolute right-10 bottom-10"
      >
        <ToolTp
          content="Add new material"
          className="text-xs w-[140px] h-[50px] text-center flex justify-center items-center"
        >
          <AiOutlinePlus
            style={{
              color: "green",
              width: 30,
              height: 30,
              fontWeight: "bold",
            }}
          />
        </ToolTp>
      </IconButton>
    </div>
  );
};

export default Materials;
