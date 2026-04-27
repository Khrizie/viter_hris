import React from "react";
import Layout from "../../Layout";
import NotificationList from "./NotificationList";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { FaPlus } from "react-icons/fa";
import ModalAddNotification from "./ModalAddNotification";
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../functions/functions-general";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const Notification = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const { isLoading } = useQueryData(
    `${apiVersion}/controllers/developers/settings/notification/notification.php`,
    "get",
    "notification",
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="notification">
        {/* header */}
        <div className="flex items-center w-full justify-between">
          <h1>Notification</h1>

          <div>
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <button
                type="button"
                className="flex items-center gap-1 hover:underline"
                onClick={handleAdd}
              >
                <FaPlus className="text-primary" />
                Add
              </button>
            )}
          </div>
        </div>

        {/* content */}
        <div>
          <NotificationList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && <ModalAddNotification itemEdit={itemEdit} />}
    </>
  );
};

export default Notification;
