import { act, renderHook } from "@testing-library/react";
import { CHECKBOX_STATES } from "@/ui/CheckBox/TriStateCheckBox";
import useTriStateCheckBox from "@/ui/CheckBox/useTriStateCheckBox";
import { FileData } from "@/data/files_data";

export const mockData: FileData[] = [
  {
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
];

describe("useTriStateCheckBox", () => {
  it("should initialize with empty checked items and Empty selectAllStatus", () => {
    const { result } = renderHook(() => useTriStateCheckBox(mockData));

    expect(result.current.checkedItems).toEqual({});
    expect(result.current.selectAllStatus).toBe(CHECKBOX_STATES.Empty);
  });

  it("should handle selecting one item", () => {
    const { result } = renderHook(() => useTriStateCheckBox(mockData));
    const fileToSelect = mockData[0];

    act(() => {
      result.current.handleSelectOne(true, fileToSelect);
    });

    expect(result.current.checkedItems[fileToSelect.path]).toEqual({
      checked: true,
      file: fileToSelect,
    });
  });

  it("should handle selecting all items", () => {
    const { result } = renderHook(() => useTriStateCheckBox(mockData));

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectAllStatus).toBe(CHECKBOX_STATES.Checked);
    expect(Object.keys(result.current.checkedItems).length).toBe(2); // 2 items are available
  });

  it("should handle unselecting all items", () => {
    const { result } = renderHook(() => useTriStateCheckBox(mockData));

    // First select all items
    act(() => {
      result.current.handleSelectAll();
    });

    // Then unselect all items
    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectAllStatus).toBe(CHECKBOX_STATES.Empty);
    expect(result.current.checkedItems).toEqual({});
  });
});
