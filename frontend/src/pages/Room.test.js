import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Room from "../pages/Room";
import { loadLayout } from "../services/api";

jest.mock("../services/api", () => ({
  loadLayout: jest.fn(),
}));

describe("Room Component", () => {
  test("renders room name", async () => {
    loadLayout.mockResolvedValueOnce({
      data: {
        roomName: "Dining Room",
        tables: [],
      },
    });

    render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter initialEntries={["/room/1"]}>
          <Room />
        </MemoryRouter>
      </DndProvider>
    );

    await waitFor(() => expect(screen.getByText("Dining Room Layout")).toBeInTheDocument());
  });
});
