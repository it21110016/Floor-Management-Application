import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const TableDetailsForm = ({ table, onChange }) => {
  const { register, reset, watch, setValue } = useForm({
    defaultValues: table,
  });
  const prevTableRef = useRef();

  const watchedValues = watch();

  useEffect(() => {
    if (prevTableRef.current?.tableId !== table.tableId) {
      reset(table);
    }
    prevTableRef.current = table;
  }, [table, reset]);

  useEffect(() => {
    if (
      JSON.stringify(watchedValues) !== JSON.stringify(prevTableRef.current)
    ) {
      if (onChange) {
        onChange({ ...table, ...watchedValues });
      }
    }
  }, [watchedValues, table, onChange]);

  const handleIncrement = (field) => {
    setValue(field, watchedValues[field] + 1);
  };

  const handleDecrement = (field) => {
    if (watchedValues[field] > 1) {
      setValue(field, watchedValues[field] - 1);
    }
  };

  const handleSliderChange = (event) => {
    setValue("online", event.target.checked);
  };

  return (
    <form className="table-details-form space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div>
        <p className="text-center font-bold mb-2">Table Details</p>
        <label className="block text-sm font-medium text-gray-700">
          Table Name
        </label>
        <input
          {...register("name")}
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
            onClick={() => handleDecrement("minCovers")}
            className="w-10 h-10 bg-gray-300 text-xl text-gray-700 rounded-full hover:bg-gray-400 transition"
          >
            -
          </button>
          <input
            type="text"
            {...register("minCovers")}
            className="w-20 text-center p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
          <button
            type="button"
            onClick={() => handleIncrement("minCovers")}
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
            onClick={() => handleDecrement("maxCovers")}
            className="w-10 h-10 bg-gray-300 text-xl text-gray-700 rounded-full hover:bg-gray-400 transition"
          >
            -
          </button>
          <input
            type="text"
            {...register("maxCovers")}
            className="w-20 text-center p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
          <button
            type="button"
            onClick={() => handleIncrement("maxCovers")}
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
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Width</label>
        <input
          type="number"
          {...register("size.width")}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Online</label>
        <div className="flex items-center space-x-2">
          {table.online ? (
            <span className="text-sm text-gray-500">Active</span>
          ) : (
            <span className="text-sm text-gray-500">Inactive</span>
          )}
          <input
            type="checkbox"
            checked={watchedValues.online}
            onChange={handleSliderChange}
            className="toggle-checkbox"
          />
        </div>
      </div>
    </form>
  );
};

export default TableDetailsForm;
