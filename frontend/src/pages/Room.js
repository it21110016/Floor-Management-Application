import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrashCan,
  faClone,
  faRotateRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../components/Table";
import NewTable from "../components/NewTable";
import { loadLayout, saveLayout } from "../services/api";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isAdvancedSettingsVisible, setIsAdvancedSettingsVisible] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropAreaRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watchedValues = watch();

  useEffect(() => {
    const fetchLayout = async () => {
      const { data } = await loadLayout(id);
      setRoom(data.roomName);
      setTables(
        data.tables.map((table) => ({
          ...table,
          tableId: table.tableId || uuidv4(),
        }))
      );
    };
    fetchLayout();
  }, [id]);

  useEffect(() => {
    if (selectedTable) {
      setValue("name", selectedTable.name);
      setValue("minCovers", selectedTable.minCovers);
      setValue("maxCovers", selectedTable.maxCovers);
      setValue("size.height", selectedTable.size.height);
      setValue("size.width", selectedTable.size.width);
      setValue("online", selectedTable.online);
    }
  }, [selectedTable, setValue]);

  // Table statistics calculations
  const totalTables = tables.length;
  const totalMinCovers = tables.reduce(
    (sum, table) => sum + table.minCovers,
    0
  );
  const totalMaxCovers = tables.reduce(
    (sum, table) => sum + table.maxCovers,
    0
  );
  const onlineTables = tables.filter((table) => table.online).length;

  const handleSave = async () => {
    await saveLayout({ roomName: room, tables });
    toast.success("Layout saved successfully", { autoClose: 1200 });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const [, drop] = useDrop({
    accept: "TABLE",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropAreaRect = dropAreaRef.current.getBoundingClientRect();
      const initialX = 100;
      const initialY = 100;

      if (item.id === "new-table") {
        const newTable = {
          tableId: uuidv4(),
          name: `T-${tables.length + 1}`,
          position: {
            x: clientOffset?.x - dropAreaRect.left || initialX,
            y: clientOffset?.y - dropAreaRect.top || initialY,
          },
          size: {
            width: 80,
            height: 80,
          },
          rotation: 0,
          minCovers: 1,
          maxCovers: 1,
          online: true,
        };
        setTables((prevTables) => [...prevTables, newTable]);
      } else {
        const delta = monitor.getDifferenceFromInitialOffset();
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.tableId === item.id
              ? {
                  ...table,
                  position: {
                    x: table.position.x + delta.x,
                    y: table.position.y + delta.y,
                  },
                }
              : table
          )
        );
      }
    },
  });

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const handleTableChange = (field, value) => {
    if (selectedTable) {
      const updatedTable = { ...selectedTable, [field]: value };
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.tableId === selectedTable.tableId ? updatedTable : table
        )
      );
      setSelectedTable(updatedTable);
    }
  };

  const handleRotate = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableId === tableId
          ? { ...table, rotation: (table.rotation + 15) % 360 }
          : table
      )
    );
  };

  const handleDelete = (tableId) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table.tableId !== tableId)
    );
  };

  const handleDuplicate = (tableId) => {
    const tableToDuplicate = tables.find((table) => table.tableId === tableId);
    if (tableToDuplicate) {
      const newTable = {
        ...tableToDuplicate,
        tableId: uuidv4(),
        position: {
          x: tableToDuplicate.position.x + 80,
          y: tableToDuplicate.position.y + 80,
        },
      };
      setTables((prevTables) => [...prevTables, newTable]);
    }
  };

  const toggleAdvancedSettings = () => {
    setIsAdvancedSettingsVisible((prev) => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const response = await saveLayout({
        roomName: data.newRoomName,
        tables: [],
      });
      window.location.replace(`/room/${response.data.layout._id}`);
    } catch (error) {
      console.error("Failed to create new room:", error);
      toast.error("Error creating room. Please try again.", {
        autoClose: 1200,
      });
    }
  };

  // const handleIncrement = (field) => {
  //   setValue(field, (watchedValues[field] || 0) + 1);
  // };

  // const handleDecrement = (field) => {
  //   if (watchedValues[field] > 1) {
  //     setValue(field, watchedValues[field] - 1);
  //   }
  // };

  // const handleSliderChange = (event) => {
  //   setValue("online", event.target.checked);
  // };

  return (
    <>
      <div className="shadow-lg p-6 bg-white rounded-lg flex items-center justify-between mb-1">
        {/* Navbar */}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </button>

        <p className="text-xl font-semibold text-gray-800 text-center flex-grow">
          {room} Layout
        </p>

        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          <span>Add Room</span>
        </button>
      </div>

      <div className={selectedTable ? "flex h-full" : "flex h-screen"}>
        {/* Sidebar */}
        <div className="w-1/5 p-4 bg-gray-200 flex flex-col">
          <div className="table-details-form space-y-4 max-w-lg mx-0 bg-white p-6 rounded-lg shadow-md mb-5 flex flex-col items-center">
            <p className="text-center font-bold">Table Options</p>
            <h3 className="text-center text-gray">Drag and drop the table</h3>
            <NewTable />
          </div>

          {/*Table Details Form */}
          {selectedTable ? (
            <form className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
              <div>
                <p className="text-center font-bold mb-2">Table Details</p>
                <label className="block text-sm font-medium text-gray-700">
                  Table Name
                </label>
                <input
                  value={watchedValues.name || ""}
                  {...register("name")}
                  onChange={(e) => handleTableChange("name", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Min Covers
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleTableChange(
                        "minCovers",
                        Math.max(1, watchedValues.minCovers - 1)
                      )
                    }
                    className="w-10 h-10 bg-gray-300 text-xl text-gray-700 rounded-full hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    {...register("minCovers")}
                    disabled
                    value={watchedValues.minCovers || 1}
                    className="w-20 text-center p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleTableChange(
                        "minCovers",
                        (watchedValues.minCovers || 1) + 1
                      )
                    }
                    className="w-10 h-10 bg-gray-300 text-xl text-gray-700 rounded-full hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Covers
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleTableChange(
                        "maxCovers",
                        Math.max(1, watchedValues.maxCovers - 1)
                      )
                    }
                    className="w-10 h-10 bg-gray-300 text-xl text-gray-700 rounded-full hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    {...register("maxCovers")}
                    disabled
                    value={watchedValues.maxCovers || 1}
                    className="w-20 text-center p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleTableChange(
                        "maxCovers",
                        (watchedValues.maxCovers || 1) + 1
                      )
                    }
                    className="w-10 h-10 bg-gray-300 text-xl text-gray-700 rounded-full hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height
                </label>
                <input
                  type="number"
                  {...register("size.height")}
                  value={watchedValues.size?.height || ""}
                  onChange={(e) =>
                    handleTableChange("size", {
                      ...selectedTable.size,
                      height: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Width
                </label>
                <input
                  type="number"
                  {...register("size.width")}
                  value={watchedValues.size?.width || ""}
                  onChange={(e) =>
                    handleTableChange("size", {
                      ...selectedTable.size,
                      width: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Online
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {watchedValues.online ? "Active" : "Inactive"}
                  </span>
                  <input
                    type="checkbox"
                    checked={watchedValues.online}
                    onChange={(e) =>
                      handleTableChange("online", e.target.checked)
                    }
                    className="toggle-checkbox"
                  />
                </div>
              </div>
            </form>
          ) : (
            <p>Select a table to view details</p>
          )}

          {/* Save Room Button */}
          <button
            className="mt-4 bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700"
            onClick={handleSave}
          >
            Save Room
          </button>

          {/* Advanced Settings Toggle */}
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={toggleAdvancedSettings}
          >
            {isAdvancedSettingsVisible
              ? "Hide Advanced Settings"
              : "Show Advanced Settings"}
          </button>

          {isAdvancedSettingsVisible && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h3 className="font-bold text-xl">Advanced Settings</h3>
              <p>This section will be expanded in the future.</p>
            </div>
          )}
        </div>

        {/* Drop Area */}
        {!isModalOpen && (
          <div
            ref={(node) => {
              dropAreaRef.current = node;
              drop(node);
            }}
            className="flex-1 floor-plan relative bg-gray-100 p-4 overflow-hidden"
          >
            {tables.map((table) => (
              <div
                key={table.tableId}
                style={{
                  position: "absolute",
                  left: table.position.x,
                  top: table.position.y,
                }}
                className="relative"
              >
                <Table
                  table={table}
                  isSelected={selectedTable?.tableId === table.tableId}
                  onClick={() => handleTableClick(table)}
                />

                {/* Rotate, Duplicate, Delete Icons */}
                {selectedTable?.tableId === table.tableId && (
                  <>
                    <button
                      onClick={() => handleRotate(table.tableId)}
                      className="absolute -top-8 -right-4 transform -translate-x-1/2 text-black"
                      title="Rotate Table"
                    >
                      <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                    <button
                      onClick={() => handleDuplicate(table.tableId)}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-black "
                      title="Duplicate Table"
                    >
                      <FontAwesomeIcon icon={faClone} />
                    </button>
                    <button
                      onClick={() => handleDelete(table.tableId)}
                      className="absolute -top-8 right-15 transform -translate-x-1/2 text-black "
                      title="Delete Table"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Room Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-gray-700 text-center">
          {/* Total Tables */}
          <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg">
            <span className="text-2xl text-blue-600 mb-1">🪑</span>
            <span className="text-sm text-gray-500">Total Tables</span>
            <span className="text-xl font-bold">{totalTables}</span>
          </div>

          {/* Total Min Covers */}
          <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg">
            <span className="text-2xl text-green-600 mb-1">👥</span>
            <span className="text-sm text-gray-500">Total Min Covers</span>
            <span className="text-xl font-bold">{totalMinCovers}</span>
          </div>

          {/* Total Max Covers */}
          <div className="flex flex-col items-center bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg">
            <span className="text-2xl text-yellow-600 mb-1">👥</span>
            <span className="text-sm text-gray-500">Total Max Covers</span>
            <span className="text-xl font-bold">{totalMaxCovers}</span>
          </div>

          {/* Tables Online */}
          <div className="flex flex-col items-center bg-red-50 p-4 rounded-lg shadow-md hover:shadow-lg">
            <span className="text-2xl text-red-600 mb-1">🌐</span>
            <span className="text-sm text-gray-500">Online Capacity</span>
            <span className="text-xl font-bold">{onlineTables}</span>
          </div>
        </div>
      </div>

      {/* Room creation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Enter Room Name</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register("newRoomName", {
                  required: "Room name is required",
                })}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Room Name"
              />
              {errors.newRoomName && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.newRoomName.message}
                </p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Room;
