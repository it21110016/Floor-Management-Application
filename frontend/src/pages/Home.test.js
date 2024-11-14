import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { getRooms } from "../services/api";
import { BrowserRouter } from "react-router-dom";

jest.mock("../services/api", () => ({
  getRooms: jest.fn(),
}));

describe("Home Component", () => {
  const mockRooms = [
    { _id: "1", roomName: "Room 1" },
    { _id: "2", roomName: "Room 2" },
    { _id: "3", roomName: "Room 3" },
  ];

  beforeEach(() => {
    getRooms.mockResolvedValue({ data: mockRooms });
  });

  it("renders the floor management title", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const title = screen.getByText(/Floor Management/i);
    expect(title).toBeInTheDocument();
  });

  it("fetches and displays rooms correctly", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      const room1 = screen.getByText(/Room 1/i);
      const room2 = screen.getByText(/Room 2/i);
      const room3 = screen.getByText(/Room 3/i);
      expect(room1).toBeInTheDocument();
      expect(room2).toBeInTheDocument();
      expect(room3).toBeInTheDocument();
    });

    expect(getRooms).toHaveBeenCalledTimes(1);
  });

  it("navigates to the correct room page on click", async () => {
    const mockNavigate = jest.fn();

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText(/Room 1/i));

    const room1 = screen.getByText(/Room 1/i);
    fireEvent.click(room1);

  });
});
