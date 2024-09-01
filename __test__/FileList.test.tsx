import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import FileList from "@/ui/FileList/FileList";
import FileListHeader from "@/ui/FileList/FileListHeader";
import { CHECKBOX_STATES } from "@/ui/CheckBox/TriStateCheckBox";
import { FileData } from "@/data/files_data";
import { FileListRowProps } from "@/ui/FileList/FileListRow";

jest.mock("@/ui/FileList/FileListRow", () => {
  return {
    __esModule: true,
    default: ({ itemData, checked, handleSelectOne }: FileListRowProps) => (
      <tr data-testid="file-list-row">
        <td>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              if (handleSelectOne) {
                handleSelectOne(!checked, itemData);
              }
            }}
            data-testid={`checkbox-${itemData.path}`}
          />
        </td>
        <td>{itemData.name}</td>
      </tr>
    ),
  };
});

const sampleData: FileData[] = [
  {
    name: "File 1",
    device: "Device A",
    path: "path/to/file1",
    status: "available",
  },
  {
    name: "File 2",
    device: "Device B",
    path: "path/to/file2",
    status: "scheduled",
  },
];

describe("FileList with some header", () => {
  const mockOnSelectOne = jest.fn();

  const checkedItems = {
    "path/to/file1": { checked: true, file: sampleData[0] },
  };

  it("renders a table with the correct header and rows", () => {
    render(
      <FileList
        data={sampleData}
        checkedItems={checkedItems}
        onSelectOne={mockOnSelectOne}
        header={
          <thead>
            <tr>
              <th>Header</th>
            </tr>
          </thead>
        }
      />
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    const rows = screen.getAllByTestId("file-list-row");
    expect(rows.length).toBe(2);
    expect(within(rows[0]).getByText("File 1")).toBeInTheDocument();
    expect(within(rows[1]).getByText("File 2")).toBeInTheDocument();
    expect(within(rows[0]).getByRole("checkbox")).toBeChecked();
    expect(within(rows[1]).getByRole("checkbox")).not.toBeChecked();
  });

  it("renders with FileListHeader and interacts with download button", () => {
    const mockOnDownload = jest.fn();
    render(
      <FileList
        data={sampleData}
        checkedItems={checkedItems}
        onSelectOne={mockOnSelectOne}
        header={
          <FileListHeader
            onSelectAll={() => {}}
            onDownload={mockOnDownload}
            isAvailable={true}
            selectedCount={1}
            selectAllStatus={CHECKBOX_STATES.Checked}
            selectedMsg="1 item selected"
          />
        }
      />
    );

    expect(screen.getByText("1 item selected")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /download selected/i }));
    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it("handles onSelectOne interaction correctly", () => {
    render(
      <FileList
        data={sampleData}
        checkedItems={checkedItems}
        onSelectOne={mockOnSelectOne}
        header={
          <thead>
            <tr>
              <th>Header</th>
            </tr>
          </thead>
        }
      />
    );

    const checkbox = screen.getByTestId(`checkbox-${sampleData[0].path}`);
    fireEvent.click(checkbox);
    expect(mockOnSelectOne).toHaveBeenCalledWith(false, sampleData[0]);
  });
});
