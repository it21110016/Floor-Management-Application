import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/layout";

// Get all rooms
export const getRooms = () => axios.get(`${API_URL}/rooms`);

// Load layout of a specific room
export const loadLayout = (id) => axios.get(`${API_URL}/rooms/${id}`);

// Save room layout
export const saveLayout = (layout) => axios.post(`${API_URL}/rooms`, layout);
