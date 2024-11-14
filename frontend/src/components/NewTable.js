import React from "react";
import { useDrag } from "react-dnd";

const NewTable = () => {
  const [{ isDragging }, drag] = useDrag({
    type: "TABLE",
    item: { id: "new-table" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        width: 100,
        height: 100,
        border: "1px solid gray",
        backgroundColor: "lightgray",
        borderRadius: "8px",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="text-center"
    >
      <img
        src="/images/table.png"
        alt="New Table"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default NewTable;