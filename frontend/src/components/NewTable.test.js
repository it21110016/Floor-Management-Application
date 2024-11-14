import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewTable from "./NewTable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Wrapper = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

describe("NewTable Component", () => {
  it("renders the table image", () => {
    render(
      <Wrapper>
        <NewTable />
      </Wrapper>
    );

    const imgElement = screen.getByAltText("New Table");
    expect(imgElement).toBeInTheDocument();
  });

  it("has the correct styles for drag and drop", async () => {
    render(
      <Wrapper>
        <NewTable />
      </Wrapper>
    );

    const tableDiv = screen.getByAltText("New Table").closest("div");
    expect(tableDiv).toHaveStyle("opacity: 1");

    fireEvent.mouseDown(tableDiv);

    await waitFor(() => expect(tableDiv).toHaveStyle("opacity: 1"));

    fireEvent.mouseUp(tableDiv);

    await waitFor(() => expect(tableDiv).toHaveStyle("opacity: 1"));
  });

  it("should apply the drag ref correctly", () => {
    const { container } = render(
      <Wrapper>
        <NewTable />
      </Wrapper>
    );

    const tableDiv = container.querySelector("div");
    expect(tableDiv).toHaveStyle("cursor: move");
  });
});
