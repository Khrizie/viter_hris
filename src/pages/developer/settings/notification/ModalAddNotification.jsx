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
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../../components/form-inputs/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

const ModalAddNotification = ({ itemEdit, filterArrayActiveRoles }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  console.log(filterArrayActiveRoles);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/notification/notification.php?id=${itemEdit.notification_aid}` //update records
          : `${apiVersion}/controllers/developers/settings/notification/notification.php`, //create records
        itemEdit
          ? "put" //put if update a records and post if create new record
          : "post", // and post if create new record
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      }
      if (data.success == false) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    ...itemEdit,
    notification_aid: itemEdit ? itemEdit.notification_aid : "",
    notification_first_name: itemEdit ? itemEdit.notification_first_name : "",
    notification_last_name: itemEdit ? itemEdit.notification_last_name : "",
    notification_purpose: itemEdit ? itemEdit.notification_purpose : "",
    notification_email: itemEdit ? itemEdit.notification_email : "",
    

    notification_first_name_old: itemEdit
      ? itemEdit.notification_first_name
      : "",
    notification_last_name_old: itemEdit ? itemEdit.notification_last_name : "",
    notification_email_old: itemEdit ? itemEdit.notification_email : "",
  };
  const yupSchema = Yup.object({
    notification_first_name: Yup.string().trim().required("required"),
    notification_last_name: Yup.string().trim().required("required"),
    notification_email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("required"),
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <ModalWrapperSide
        handleClose={handleClose}
        className="transition-all ease-in-out transform duration-200"
      >
        {/* header */}
        <div className="modal-header relative mb-4">
          <h3 className="text-dark text-sm">
            {itemEdit ? "Update" : "Add"} notification
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              dispatch(setError(false));
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form className="h-full">
                  <div className="modal-form-container">
                    <div className="modal-container">
                      {/* name */}
                      <div className="relative mb-6">
                        <InputText
                          label="First Name"
                          name="notification_first_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      {/* description */}
                      <div className="relative mt-5 mb-6">
                        <InputText
                          label="Last Name"
                          name="notification_last_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputText
                          label="Email"
                          name="notification_email"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="relative mt-5 mb-6">
                        <InputSelect
                          label="Request Type"
                          name="request_type"
                          disabled={mutation.isPending}
                        >
                          <optgroup label="Select type">
                            <option value="" hidden>
                              --
                            </option>
                            <option value="overtime">Overtime</option>
                            <option value="leave">Leave</option>
                          </optgroup>
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
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleClose}
                        disabled={mutation.isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddNotification;
