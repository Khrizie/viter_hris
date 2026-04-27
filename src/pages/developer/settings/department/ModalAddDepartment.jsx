import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../functions/functions-general";
import {
  setIsAdd,
  setSuccess,
  setError,
  setMessage,
} from "../../../../store/StoreAction";
import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import {
  InputText,
  InputSelect,
} from "../../../../components/form-inputs/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

const ModalAddDepartment = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/department/department.php?id=${itemEdit.department_aid}`
          : `${apiVersion}/controllers/developers/settings/department/department.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["department"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      } else {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    department_name: itemEdit ? itemEdit.department_name : "",
    department_is_active: itemEdit ? itemEdit.department_is_active : "1",
    department_name_old: itemEdit ? itemEdit.department_name : "",
  };

  const yupSchema = Yup.object({
    department_name: Yup.string()
      .trim() 
      .required("Department name is required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <ModalWrapperSide handleClose={handleClose}>
      {/* header */}
      <div className="modal-header relative mb-4">
        <h3 className="text-dark text-sm">
          {itemEdit ? "Update" : "Add"} Department
        </h3>
        <button
          type="button"
          className="absolute top-0 right-4"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>

      {/* body */}
      <div className="modal-body">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={(values) => {
            dispatch(setError(false));
            mutation.mutate(values);
          }}
        >
          {(props) => (
            <Form className="h-full">
              <div className="modal-form-container">
                <div className="modal-container">
                  {/* Department Name */}
                  <div className="relative mb-6">
                    <InputText
                      label="Department Name"
                      name="department_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* Status */}
                  <div className="relative mb-6">
                    <InputSelect
                      label="Status"
                      name="department_is_active"
                      disabled={mutation.isPending}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </InputSelect>
                  </div>

                  {store.error && <MessageError />}
                </div>

                {/* buttons */}
                <div className="modal-action">
                  <button
                    type="submit"
                    disabled={mutation.isPending || !props.dirty}
                    className="btn-modal-submit"
                  >
                    {mutation.isPending ? (
                      <ButtonSpinner />
                    ) : itemEdit ? (
                      "Save"
                    ) : (
                      "Add"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={handleClose}
                    disabled={mutation.isPending}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalWrapperSide>
  );
};

export default ModalAddDepartment;
