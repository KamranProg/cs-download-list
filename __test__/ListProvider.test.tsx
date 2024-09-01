import { renderHook, act } from "@testing-library/react";
import { ListProvider, useListContext } from "@/ui/FileList/ListProvider";
import { ReactNode } from "react";

const mockData = [
  { id: 1, label: "Item 1" },
  { id: 2, label: "Item 2" },
  { id: 3, label: "Item 3" },
];
type MockDataItem = (typeof mockData)[0];
const keyExtractor = (item: MockDataItem) => item.id.toString();

describe("ListProvider and useListContext", () => {
  it("initializes with correct default values", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ListProvider data={mockData} keyExtractor={keyExtractor}>
        {children}
      </ListProvider>
    );
    const { result } = renderHook(() => useListContext(), { wrapper });

    expect(result.current.checkedItems).toEqual({});
    expect(result.current.selectedCount).toBe(0);
  });
  it("throws error when useListContext is used outside of ListProvider", () => {
    expect(() => {
      renderHook(() => useListContext());
    }).toThrow("useListContext must be used within a ListProvider");
  });

  it("handles selecting and unselecting an item", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ListProvider data={mockData} keyExtractor={keyExtractor}>
        {children}
      </ListProvider>
    );
    const { result } = renderHook(() => useListContext(), { wrapper });

    act(() => {
      result.current.handleSelectOne(true, mockData[0]);
    });

    expect(
      result.current.checkedItems[mockData[0].id.toString()].checked
    ).toBeTruthy();

    act(() => {
      result.current.handleSelectOne(false, mockData[0]);
    });

    expect(
      result.current.checkedItems[mockData[0].id.toString()]
    ).toBeUndefined();
  });

  it("handles selecting all items", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ListProvider data={mockData} keyExtractor={keyExtractor}>
        {children}
      </ListProvider>
    );
    const { result } = renderHook(() => useListContext(), { wrapper });

    act(() => {
      result.current.handleSelectAll(true);
    });

    expect(Object.keys(result.current.checkedItems).length).toBe(
      mockData.length
    );
    expect(result.current.selectedCount).toBe(mockData.length);

    // Toggle off all selections
    act(() => {
      result.current.handleSelectAll(false);
    });

    expect(result.current.checkedItems).toEqual({});
    expect(result.current.selectedCount).toBe(0);
  });
});
