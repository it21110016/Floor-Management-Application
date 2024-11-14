import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/api";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Floor Management</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-gray-200 p-6 cursor-pointer hover:bg-gray-300 rounded shadow-xl hover:shadow-xl"
            onClick={() => navigate(`/room/${room._id}`)}
          >
            <h2 className="text-lg font-semibold">{room.roomName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
