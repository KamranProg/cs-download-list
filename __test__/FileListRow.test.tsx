import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FileListRow from "@/ui/FileList/FileListRow"; // Adjust the import path if necessary
import "@testing-library/jest-dom";
import { FileData } from "@/data/files_data";

// Mock data for the tests
const mockFileData: FileData = {
  name: "Example.exe",
  device: "Desktop",
  path: "\\path\\to\\Example.exe",
  status: "available",
};

const mockFileDataScheduled: FileData = {
  ...mockFileData,
  status: "scheduled",
};

describe("FileListRow", () => {
  it("renders correctly with available status", () => {
    render(
      <FileListRow
        file={mockFileData}
        checked={false}
        handleSelectOne={() => {}}
      />
    );

    expect(
      screen.getByLabelText(
        `Select ${mockFileData.name}, status: ${mockFileData.status}`
      )
    ).not.toBeDisabled();
    expect(screen.getByText(mockFileData.name)).toBeInTheDocument();
  });

  it("renders correctly with scheduled status", () => {
    render(
      <FileListRow
        file={mockFileDataScheduled}
        checked={false}
        handleSelectOne={() => {}}
      />
    );

    expect(
      screen.getByLabelText(
        `File ${mockFileDataScheduled.name}, status: ${mockFileDataScheduled.status}, Option not available`
      )
    ).toBeDisabled();
  });

  it("handles checkbox click", () => {
    const handleSelectOne = jest.fn();
    render(
      <FileListRow
        file={mockFileData}
        checked={false}
        handleSelectOne={handleSelectOne}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleSelectOne).toHaveBeenCalledWith(true, mockFileData);
  });

  it("displays row as selected when checkbox is checked", () => {
    const { container } = render(
      <FileListRow
        file={mockFileData}
        checked={true}
        handleSelectOne={() => {}}
      />
    );
    expect(container.querySelector("tr")).toHaveClass("rowSelected");
  });

  it("toggles the row's selected state when the row is clicked", () => {
    const handleSelectOne = jest.fn();
    render(
      <FileListRow
        file={mockFileData}
        checked={false}
        handleSelectOne={handleSelectOne}
      />
    );

    const row = screen.getByRole("row");
    fireEvent.click(row);

    expect(handleSelectOne).toHaveBeenCalledWith(true, mockFileData);
  });

  it("indicates non-selectable status correctly", () => {
    render(
      <FileListRow
        file={mockFileDataScheduled}
        checked={false}
        handleSelectOne={() => {}}
      />
    );
    expect(screen.getByText(mockFileDataScheduled.status)).toBeInTheDocument();
    const row = screen.getByRole("row");
    expect(row).toHaveClass("rowNotSelectable");
  });
});
