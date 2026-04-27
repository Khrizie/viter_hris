import React from "react";
import { apiVersion } from "../../../../functions/functions-general";
import NoData from "../../../../partials/NoData";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/TableLoading";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import Status from "../../../../partials/Status";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import ServerError from "../../../../partials/ServerError";
import Loadmore from "../../../../partials/Loadmore";
import SearchBar from "../../../../partials/SearchBar";

const NotificationList = ({ setItemEdit, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });

  const { ref, inView } = useInView();
  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "notification",
      search.current.value,
      store.isSearch,
      filterData,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "", // no separate search endpoint
        `${apiVersion}/controllers/developers/settings/notification/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        "post",
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  // ACTIONS
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  return (
    <>
      {/* FILTER + SEARCH */}
      <div className="py-5 flex items-center justify-between">
        <div>
          <label>Status</label>
          <select
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>

      {/* TABLE */}
      <div className="relative">
        {status !== "pending" && isFetching && <FetchingSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING / EMPTY */}
            {!error &&
              (status === "pending" || result?.pages[0]?.count === 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status === "pending" ? (
                      <TableLoading cols={5} count={10} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}

            {/* ERROR */}
            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {/* DATA */}
            {result?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page?.data?.map((item, index) => (
                  <tr key={index}>
                    <td>{counter++}</td>
                    <td>
                      <Status
                        text={
                          item.notification_is_active == 1
                            ? "active"
                            : "inactive"
                        }
                      />
                    </td>
                    <td>
                      {item.notification_first_name}{" "}
                      {item.notification_last_name}
                    </td>
                    <td>{item.notification_email}</td>
                    <td>{item.notification_purpose}
                    </td>
                    <td>
                      <div className="flex gap-3">
                        {item.notification_is_active == 1 ? (
                          <>
                            <button onClick={() => handleEdit(item)}>
                              <FaEdit />
                            </button>
                            <button onClick={() => handleArchive(item)}>
                              <FaArchive />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleRestore(item)}>
                              <FaTrashRestore />
                            </button>
                            <button onClick={() => handleDelete(item)}>
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* LOAD MORE */}
        <div className="flex justify-center py-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || store?.isFilter}
          />
        </div>
      </div>

      {/* MODALS */}

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/notification/active.php?id=${itemEdit.notification_aid}`}
          msg="Are you sure you want to archive this record?"
          successMsg="Successfully archived."
          item={{
            name: `${itemEdit.notification_first_name} ${itemEdit.notification_last_name}`,
          }}
          dataItem={itemEdit}
          queryKey="notification"
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/notification/active.php?id=${itemEdit.notification_aid}`}
          msg="Are you sure you want to restore this record?"
          successMsg="Successfully restored."
          item={{
            name: `${itemEdit.notification_first_name} ${itemEdit.notification_last_name}`,
          }}
          dataItem={itemEdit}
          queryKey="notification"
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/notification/delete.php?id=${itemEdit.notification_aid}`}
          msg="Are you sure you want to delete this record?"
          successMsg="Successfully deleted."
          item={{
            name: `${itemEdit.notification_first_name} ${itemEdit.notification_last_name}`,
          }}
          dataItem={itemEdit}
          queryKey="notification"
        />
      )}
    </>
  );
};

export default NotificationList;
