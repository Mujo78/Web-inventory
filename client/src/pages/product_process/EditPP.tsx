import {
  Accordion,
  Alert,
  Button,
  Label,
  TextInput,
  Toast,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addManyProcessItems,
  deactivateProcess,
  editSpecificProcess,
  getProcessById,
  makeProcessActive,
  makeProcessUsable,
  process,
  resetSpecificProcess,
} from "../../features/process/processSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationProcessSchema } from "../../validations/processValidation";
import { MdRecommend, MdSaveAlt } from "react-icons/md";
import EditPPItems from "../../components/ProductProcess/EditPPItems";
import { useAppDispatch } from "../../app/hooks";
import CustomSpinner from "../../components/UI/CustomSpinner";
import { ProcessToEdit } from "../../features/process/processService";
import axios from "axios";
import ProcessItemsToAdd from "../../components/ProductProcess/ProcessItemsToAdd";
import { selectedMaterials } from "../../components/ProductProcess/PPItems";
import Header from "../../components/UI/Header";
import useSelectedPage from "../../hooks/useSelectedPage";

export interface MaterialToAdd {
  _id: string;
  name: string;
  quantity: number;
}

const EditProductProcess: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message, specificProcess } = useSelector(process);
  const [materialsToAdd, setMaterialsToAdd] = useState<MaterialToAdd[]>([]);
  const [materialsItems, setMaterialsItems] = useState<selectedMaterials[]>([]);

  useSelectedPage("Product Processes");

  const getMaterialsToAdd = async () => {
    try {
      const res = await axios.get(`/api/process/${id}`);
      const data = res.data;

      setMaterialsToAdd(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getProcessById(id));
      getMaterialsToAdd();
    }
    return () => {
      dispatch(resetSpecificProcess());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const initialState: ProcessToEdit = {
    name: specificProcess?.processData?.name || "",
    price: specificProcess?.processData?.price || 0,
  };

  const handleSubmit = (processData: ProcessToEdit) => {
    if (id) {
      dispatch(editSpecificProcess({ id, processData }));
      if (message === "") navigate("/processes");
    }
  };

  const handleCancel = () => {
    navigate("/processes");
  };

  const makeActive = (id: string) => {
    dispatch(makeProcessActive(id));
    navigate("/processes");
  };

  const makeProcessUsableAgain = (id: string) => {
    dispatch(makeProcessUsable(id));
    navigate("/processes");
  };

  const makeDeactive = (id: string) => {
    dispatch(deactivateProcess(id));
    navigate("/processes");
  };

  const saveChanges = () => {
    if (materialsItems.length > 0) {
      dispatch(addManyProcessItems(materialsItems));
    }
    navigate("/processes");
  };

  return (
    <div className="h-[89vh] flex flex-col gap-3 overflow-hidden">
      <Header title="Edit product process">
        <Toast className="h-[50px]">
          <div className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-200 dark:bg-blue-100 dark:text-blue-200">
            <MdRecommend className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3 text-xs font-normal">
            <p>
              {" "}
              <b>Recomended</b>: Do not change the price! Price depends on
              product process items!{" "}
            </p>
          </div>
          <Toast.Toggle />
        </Toast>
      </Header>

      {!specificProcess ? (
        <CustomSpinner />
      ) : (
        <div className="h-3/4 flex flex-col justify-between">
          <div className="flex h-full justify-between gap-3">
            <div className="w-2/3 p-6 border rounded-lg">
              <Formik
                enableReinitialize={true}
                validationSchema={validationProcessSchema}
                onSubmit={handleSubmit}
                initialValues={initialState}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col gap-6">
                    <h1 className="text-24 font-Rubik text-xl font-bold">
                      Process data
                    </h1>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col w-4/6">
                        <Label htmlFor="name" className="mb-2">
                          Name
                        </Label>
                        <Field
                          as={TextInput}
                          color={errors.name && touched.name && "failure"}
                          autoComplete="off"
                          type="text"
                          id="name"
                          name="name"
                        />
                        <div className="h-7">
                          <ErrorMessage
                            name="name"
                            component="span"
                            className="text-red-600 text-xs"
                          />
                          {status === "failed" && !errors.name && (
                            <span className="text-red-600 text-xs">
                              {message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col mx-auto w-1/5">
                        <Label htmlFor="price" className="mb-2">
                          Price
                        </Label>
                        <Field
                          as={TextInput}
                          type="number"
                          id="price"
                          color={errors.price && touched.price && "failure"}
                          name="price"
                        />
                        <div className="h-7">
                          <ErrorMessage
                            name="price"
                            component="span"
                            className="text-red-600 text-xs"
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        type="submit"
                        className="mt-2"
                        color="success"
                      >
                        <MdSaveAlt />
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <hr />
              <div>
                <EditPPItems items={specificProcess?.processItems || []} />
              </div>
            </div>
            <div className="w-1/3 p-4 border rounded-lg">
              <Accordion id="content" className="w-full h-4/6 border-none">
                <Accordion.Panel id="content">
                  <Accordion.Title>Add new Items</Accordion.Title>
                  <Accordion.Content className="h-full overflow-y-auto">
                    {materialsToAdd.length > 0 ? (
                      <div id="content" className="h-full overflow-y-auto">
                        <p className="text-xs text-gray-500 pb-3">
                          Name (quantity) - quantity to add{" "}
                        </p>
                        <ul className="divide-y h-full p-0">
                          {materialsToAdd.map((n) => (
                            <ProcessItemsToAdd
                              item={n}
                              process_id={id ? id : ""}
                              key={n._id}
                              setMaterialsItems={setMaterialsItems}
                              materialsItems={materialsItems}
                            />
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Alert>
                        <h1>There are no materials to add to this process!</h1>
                      </Alert>
                    )}
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
          <div className="flex mt-auto h-1/4 justify-between items-end">
            <div className="flex justify-end align-bottom items-end">
              <Button onClick={handleCancel} className="mr-4" color="light">
                Cancel
              </Button>
            </div>
            <div className="flex justify-end align-bottom items-end">
              {specificProcess?.processData.end_date !== null &&
                specificProcess?.processData.start_date !== null && (
                  <Button
                    color="gray"
                    className="mr-4"
                    onClick={() =>
                      makeProcessUsableAgain(specificProcess.processData._id)
                    }
                  >
                    Use process again
                  </Button>
                )}

              {((specificProcess?.processData.start_date !== null &&
                specificProcess?.processData.end_date === null) ||
                (specificProcess?.processData.start_date === null &&
                  specificProcess?.processData.end_date === null)) && (
                <Button
                  className="mr-4"
                  onClick={() => makeDeactive(specificProcess.processData._id)}
                  color="failure"
                >
                  Deactivate process
                </Button>
              )}

              {specificProcess?.processData.end_date === null &&
                specificProcess?.processData.start_date === null && (
                  <Button
                    color="success"
                    className="mr-4"
                    onClick={() => makeActive(specificProcess.processData._id)}
                  >
                    Activate process
                  </Button>
                )}

              <Button color="success" outline onClick={() => saveChanges()}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductProcess;
