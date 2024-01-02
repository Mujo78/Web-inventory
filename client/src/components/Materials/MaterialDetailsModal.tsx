import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  getMaterial,
  material,
  resetMaterial,
} from "../../features/material/materialSlice";
import { useSelector } from "react-redux";
import CustomSpinner from "../UI/CustomSpinner";

type Props = {
  id: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const MaterialDetails: React.FC<Props> = ({ id, show, setShow }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMaterial(id));
  }, [dispatch, id]);

  const { specificMaterial } = useSelector(material);

  const onClose = () => {
    dispatch(resetMaterial());
    setShow(false);
  };

  if (specificMaterial === undefined) {
    return (
      <Modal>
        <Modal.Body>
          <CustomSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal dismissible show={show} onClose={onClose} className="font-Rubik">
      <Modal.Header>{specificMaterial?.name}</Modal.Header>
      <Modal.Body>
        <Table>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white divide-x dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Quantity
              </Table.Cell>
              <Table.Cell>{specificMaterial.quantity}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white divide-x dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Min Quantity
              </Table.Cell>
              <Table.Cell>{specificMaterial.min_quantity}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white divide-x dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Unit of measure
              </Table.Cell>
              <Table.Cell>{specificMaterial.unit_of_measure}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white divide-x dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Is it used
              </Table.Cell>
              <Table.Cell>
                {specificMaterial.is_it_used ? "True" : "False"}
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white divide-x dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Price
              </Table.Cell>
              <Table.Cell>{specificMaterial.price}$</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button color="light" className="ml-auto" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MaterialDetails;
