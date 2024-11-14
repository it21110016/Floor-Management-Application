import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Wrapper = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

describe("Table Component", () => {
  const mockTable = {
    tableId: "1",
    name: "Table 1",
    size: { width: 100, height: 100 },
    rotation: 0,
  };

  const mockOnClick = jest.fn();

  it("renders the table with correct styles", () => {
    render(
      <Wrapper>
        <Table table={mockTable} isSelected={false} onClick={mockOnClick} />
      </Wrapper>
    );

    const tableElement = screen.getByAltText("Table");
    expect(tableElement).toBeInTheDocument();

    expect(tableElement).toHaveStyle("width: 100%");
    expect(tableElement).toHaveStyle("height: 100%");

    const tableName = screen.getByText("Table 1");
    expect(tableName).toBeInTheDocument();
  });

  it("applies correct styles when selected", () => {
    render(
      <Wrapper>
        <Table table={mockTable} isSelected={true} onClick={mockOnClick} />
      </Wrapper>
    );

    const tableDiv = screen.getByAltText("Table").closest("div");
    expect(tableDiv).toHaveStyle("backgroundColor: lightblue");
    expect(tableDiv).toHaveStyle("border: 2px solid blue");
  });

  it("applies correct styles when not selected", () => {
    render(
      <Wrapper>
        <Table table={mockTable} isSelected={false} onClick={mockOnClick} />
      </Wrapper>
    );

    const tableDiv = screen.getByAltText("Table").closest("div");
    expect(tableDiv).toHaveStyle("backgroundColor: lightgray");
    expect(tableDiv).toHaveStyle("border: 1px solid gray");
  });

  it("calls onClick when clicked", () => {
    render(
      <Wrapper>
        <Table table={mockTable} isSelected={false} onClick={mockOnClick} />
      </Wrapper>
    );

    const tableDiv = screen.getByAltText("Table").closest("div");

    fireEvent.click(tableDiv);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
