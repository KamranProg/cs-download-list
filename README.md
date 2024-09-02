# FileList

![Project Image](docs/images/file_list.png)
![Project Image](docs/images/infinite_scroll_pagination.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, run generate local JSON db and spin local server:

```bash
# Generate mock data
npm run db:generate
# Start JSON server in watch mode
npm run server:run
```

run the app development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You can also build and serve:

```bash
npm run build

npm start

# or
yarn build

yarn start
# or
pnpm build

pnpm start
# or
bun build

bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Composition, Children, and Slots in React Components

### Overview

In React, **composition** and **slots** are powerful concepts used to build flexible and reusable components.
These concepts are foundational in many design systems, such as Material UI, allowing developers to insert custom content into predefined component slots.

## Paginated list Implementation

### Usage Example
```jsx
<Pagination
  pages={pages}
  perPageOptions={[5, 10, 20]}
  currentPage={currentPage}
/>
<ListProvider data={avilableFileData} keyExtractor="path">
  <TableListWrapper
    headerComponent={<TableListHeader />}
    rowsComponent={<TableListRows data={data} />}
  />
</ListProvider>
```

### Pagination Component
- Manages page navigation.
- `currentPage` sets the displayed data.

### ListProvider Component
- Provides context across components, enabling shared data access.

### TableListWrapper Component
- Structures the display layout for data.
- Includes `headerComponent` for headers and `rowsComponent` for data rows.

## Infinite Scroll Implementation

### Usage Example
```jsx
<ListProviderInfiniteScroll
  data={data}
  availableItems={avilableFileData}
  keyExtractor="path"
  filter={{ status: "available" }}
>
  <TableListWrapper
    headerComponent={<TableListHeaderInfiniteScroll />}
    rowsComponent={<TableListRowsInfiniteScroll totalPages={pages} />}
  />
</ListProviderInfiniteScroll>
```

### ListProviderInfiniteScroll Component
- Manages the data context for infinite scrolling features.
- Filters data based on availability with `filter={{ status: "available" }}`.

### TableListWrapper Component
- Organizes the layout for infinite scrolling.
- Utilizes `headerComponent` for dynamic headers and `rowsComponent` for data rows, adapting to page changes.


## Key Benefits
- **Modularity**: Clear separation within components.
- **Reusability**: Simplifies the reuse of components like Pagination, ListProviderInfiniteScroll and its components.
- **Flexibility**: Aids in independent component development and testing.

This architecture is ideal for complex, interactive applications, enhancing both development efficiency and user interaction.




### Example with `FileList` and `FileListHeader`

In this example, the `FileList` component is designed to accept a `header` prop, which acts as a slot.
This slot can be filled with any React component, such as `FileListHeader`, enabling dynamic composition based on the needs of the application.

```jsx
const {
  checkedItems,
  selectedCount,
  isAvailable,
  handleSelectOne,
  selectedMsg,
  selectAllStatus,
  handleSelectAll,
} = useTriStateCheckBox(data.filter((item) => item.status === "available"));

const handleDownload = () => {
  const message = Object.keys(checkedItems)
    .map((key) => {
      const { name, path, status } = checkedItems[key].file;
      if (status === "available") {
        return `${name} available for download from ${path},`;
      }
    })
    .filter((key) => key)
    .join("\n\n");

  alert(message);
};

return (
  <main className={styles.main}>
    <div className="container">
      <h1>FileList</h1>

      <div className={styles.flexGapRow}>
        <FileList
          data={data}
          checkedItems={checkedItems}
          onSelectOne={handleSelectOne}
          header={
            <FileListHeader
              onSelectAll={handleSelectAll}
              onDownload={handleDownload}
              isAvailable={isAvailable}
              selectedCount={selectedCount}
              selectAllStatus={selectAllStatus}
              selectedMsg={selectedMsg}
            />
          }
        />
      </div>

      {/* Additional content */}
    </div>
  </main>
);
```

## State Management with Custom Hooks

Using custom hooks like `useTriStateCheckBox` enhances modularity and maintainability in React applications.
By extracting state logic into a separate hook, components remain clean and focused solely on the presentation.
This pattern not only simplifies the components but also facilitates reuse and testing of the state logic independently.

Here's an example of how `useTriStateCheckBox` is utilized to manage state in a component that handles file selections and downloads:

> **Note:** In case this state is needed for other components other than `FileList`, we could use Context.

## Composition in React Components

The `FileList` component exemplifies a common React pattern known as composition, where a component is designed to encapsulate other components or content passed as props or children. This approach enhances flexibility and reusability across the UI of an application.

```jsx
export default function FileList({
  checkedItems,
  data,
  onSelectOne,
  header,
  className,
}: FileListProps) {
  return (
    <table className={clsx(styles.fileList, className)}>
      {header}
      <tbody>
        {data.map((file: FileData) => (
          <FileListRow
            key={file.path}
            file={file}
            handleSelectOne={onSelectOne}
            checked={checkedItems[file?.path]?.checked || false}
          />
        ))}
      </tbody>
    </table>
  );
}
```

A## Flexible Composition with Slots and Children in React

In React, the design of components can be made highly flexible by using props and children to manage content dynamically. The `FileList` component is an excellent example of how this flexibility can be achieved, particularly in encapsulating content within the `<tbody>` element.

### Slot vs. Children in `FileList`

The `FileList` component can be designed to accept both a `header` prop and a `body` prop as slots, or it can use `children` to allow content to be injected directly from where it's used. This approach provides flexibility in how table rows are defined and rendered:

```jsx
export default function FileList({
  header,
  body, // Optional slot for tbody content
  className,
  children, // Alternatively, use children directly in tbody
}: FileListProps) {
  return (
    <table className={clsx(styles.fileList, className)}>
      {header}
      <tbody>{body || children}</tbody>
    </table>
  );
}
```

The body prop is a slot, which is useful when you want to control the rendering of the body content externally while keeping the layout within FileList.

```jsx
<FileList
  header={<CustomHeader />}
  body={<CustomBody />}
  className="custom-class"
/>
```

using children which will be rendered within the <tbody> is highly flexible and good when the component needs to support a wide range of content structures:

```jsx
<FileList header={<CustomHeader />} className="custom-class">
  <tr>
    <td>Data 1</td>
  </tr>
  <tr>
    <td>Data 2</td>
  </tr>
  {/* More rows as needed */}
</FileList>
```

Choosing between a slot (body) and children gives component users flexibility this is highly dependent on specific requirements.

## Tests React testing library & Jest

run the tests:

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test

# watch in mode
npm run test:watch
# or
yarn test:watch
# or
pnpm test:watch
# or
bun test:watch

```