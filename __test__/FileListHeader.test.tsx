import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FileListHeader from "@/ui/FileList/FileListHeader";
import { CHECKBOX_STATES } from "@/ui/CheckBox/TriStateCheckBox";

describe("FileListHeader", () => {
  const mockOnDownload = jest.fn();
  const mockOnSelectAll = jest.fn();

  it("renders correctly", () => {
    render(
      <FileListHeader
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        isAvailable={true}
        selectedCount={1}
        selectAllStatus={CHECKBOX_STATES.Checked}
        selectedMsg="1 item selected"
      />
    );

    // Correct the aria-label expectation to match the dynamically generated label
    expect(
      screen.getByLabelText("Select all files, currently 1 item selected")
    ).toBeInTheDocument();
    expect(screen.getByText("1 item selected")).toBeInTheDocument();
    // Verify that the download button is correctly rendered
    expect(
      screen.getByRole("button", { name: /download selected/i })
    ).toBeInTheDocument();
  });

  it("calls onSelectAll when TriStateCheckbox is interacted with", () => {
    render(
      <FileListHeader
        onSelectAll={mockOnSelectAll}
        selectAllStatus={CHECKBOX_STATES.Empty}
        selectedCount={0}
        selectedMsg="None selected"
      />
    );

    fireEvent.click(
      screen.getByLabelText("Select all files, currently none selected")
    );
    expect(mockOnSelectAll).toHaveBeenCalled();
  });

  it("enables the download button when items are selected and available", () => {
    render(
      <FileListHeader
        onDownload={mockOnDownload}
        isAvailable={true}
        selectedCount={5}
        selectAllStatus={CHECKBOX_STATES.Checked}
        selectedMsg="5 items selected"
      />
    );

    const downloadButton = screen.getByText("Download selected");
    expect(downloadButton).not.toBeDisabled();
  });

  it("disables the download button when no items are selected or not available", () => {
    render(
      <FileListHeader
        onDownload={mockOnDownload}
        isAvailable={false}
        selectedCount={0}
        selectAllStatus={CHECKBOX_STATES.Empty}
        selectedMsg="None selected"
      />
    );

    const downloadButton = screen.getByRole("button", {
      name: /download selected/i,
    });
    expect(downloadButton).toBeDisabled();
  });
});
