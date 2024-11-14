import React from "react";
import { useDrag } from "react-dnd";

const Table = ({ table, isSelected, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TABLE",
    item: { id: table.tableId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={onClick}
      style={{
        width: table.size.width,
        height: table.size.height,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? "lightblue" : "lightgray",
        border: isSelected ? "2px solid blue" : "1px solid gray",
        cursor: "move",
        transform: `rotate(${table.rotation}deg)`,
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      className="flex items-center justify-center"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          padding: "4px 8px",
          fontSize: "0.9em",
          fontWeight: "bold",
          borderRadius: "4px",
        }}
      >
        {table.name}
      </div>

      <img
        src="/images/table.png"
        alt="Table"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Table;
