import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import FileList from "@/ui/FileList/FileList";
import { FileListRowProps } from "@/ui/FileList/FileListRow";
import { FileData } from "@/data/files_data";
import FileListHeader from "@/ui/FileList/FileListHeader";
import { CHECKBOX_STATES } from "@/ui/CheckBox/TriStateCheckBox";

jest.mock("@/ui/FileList/FileListRow", () => {
  return {
    __esModule: true,
    default: ({ file, checked, handleSelectOne }: FileListRowProps) => (
      <tr data-testid="file-list-row">
        <td>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleSelectOne(!checked, file)}
            data-testid={`checkbox-${file.path}`}
          />
        </td>
        <td>{file.name}</td>
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

    // Check header
    expect(screen.getByText("Header")).toBeInTheDocument();

    // Check rows count and content
    const rows = screen.getAllByTestId("file-list-row");
    expect(rows.length).toBe(2);
    expect(within(rows[0]).getByText("File 1")).toBeInTheDocument();
    expect(within(rows[1]).getByText("File 2")).toBeInTheDocument();

    // Check checkbox states
    const checkboxInFirstRow = within(rows[0]).getByRole(
      "checkbox"
    ) as HTMLInputElement; // Type assertion here
    expect(checkboxInFirstRow.checked).toBe(true);

    const checkboxInSecondRow = within(rows[1]).getByRole(
      "checkbox"
    ) as HTMLInputElement; // Type assertion here
    expect(checkboxInSecondRow.checked).toBe(false);
  });
});

describe("FileList with FileListHeader", () => {
  const mockOnSelectOne = jest.fn();
  const mockOnDownload = jest.fn();
  const checkedItems = {
    "path/to/file1": { checked: true, file: sampleData[0] },
  };

  it("renders with header and rows, interacts with download button", () => {
    const header = (
      <FileListHeader
        onSelectAll={() => {}}
        onDownload={mockOnDownload}
        isAvailable={true}
        selectedCount={1}
        selectAllStatus={CHECKBOX_STATES.Checked}
        selectedMsg="1 item selected"
      />
    );

    render(
      <FileList
        data={sampleData}
        checkedItems={checkedItems}
        onSelectOne={mockOnSelectOne}
        header={header}
      />
    );

    // Check for header elements
    expect(screen.getByText("1 item selected")).toBeInTheDocument();

    // Check for rows
    const rows = screen.getAllByTestId("file-list-row");
    expect(rows.length).toBe(2);
    expect(screen.getByText("File 1")).toBeInTheDocument();
    expect(screen.getByText("File 2")).toBeInTheDocument();

    // Trigger the download button and verify it calls the mock function
    const downloadButton = screen.getByRole('button', { name: /download selected/i });
    fireEvent.click(downloadButton);
    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it("calls onSelectOne with the correct arguments when a row is interacted", () => {
    const header = (
      <FileListHeader
        onSelectAll={() => {}}
        onDownload={mockOnDownload}
        isAvailable={true}
        selectedCount={1}
        selectAllStatus={CHECKBOX_STATES.Checked}
        selectedMsg="1 item selected"
      />
    );

    render(
      <FileList
        data={sampleData}
        checkedItems={checkedItems}
        onSelectOne={mockOnSelectOne}
        header={header}
      />
    );

    // Simulate interaction with the checkbox in the first row
    const checkboxInFirstRow = screen.getByTestId(
      `checkbox-${sampleData[0].path}`
    );
    fireEvent.click(checkboxInFirstRow);

    // Verify onSelectOne has been called with the correct parameters
    expect(mockOnSelectOne).toHaveBeenCalledWith(false, sampleData[0]); // Assuming 'false' because it was initially true
  });
});
