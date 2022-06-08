import { CollectionBase, Node, SelectionMode, Sortable, SortDescriptor } from "@react-types/shared";
import { GridState } from "@react-stately/grid";
import { TableCollection, TableHeaderProps, TableBodyProps, ColumnProps, RowProps, CellProps } from "@react-types/table";
import { Key } from "react";
import { MultipleSelectionStateProps } from "@react-stately/selection";
export interface TableState<T> extends GridState<T, TableCollection<T>> {
    /** A collection of rows and columns in the table. */
    collection: TableCollection<T>;
    /** Whether the row selection checkboxes should be displayed. */
    showSelectionCheckboxes: boolean;
    /** The current sorted column and direction. */
    sortDescriptor: SortDescriptor;
    /** Calls the provided onSortChange handler with the provided column key and sort direction. */
    sort(columnKey: Key): void;
}
export interface CollectionBuilderContext<T> {
    showSelectionCheckboxes: boolean;
    selectionMode: SelectionMode;
    columns: Node<T>[];
}
export interface TableStateProps<T> extends CollectionBase<T>, MultipleSelectionStateProps, Sortable {
    /** Whether the row selection checkboxes should be displayed. */
    showSelectionCheckboxes?: boolean;
}
/**
 * Provides state management for a table component. Handles building a collection
 * of columns and rows from props. In addition, it tracks row selection and manages sort order changes.
 */
export function useTableState<T extends object>(props: TableStateProps<T>): TableState<T>;
/**
 * A TableHeader is a container for the Column elements in a Table. Columns can be statically defined
 * as children, or generated dynamically using a function based on the data passed to the `columns` prop.
 */
export let TableHeader: <T>(props: TableHeaderProps<T>) => JSX.Element;
/**
 * A TableBody is a container for the Row elements of a Table. Rows can be statically defined
 * as children, or generated dynamically using a function based on the data passed to the `items` prop.
 */
export let TableBody: <T>(props: TableBodyProps<T>) => JSX.Element;
/**
 * A Column represents a field of each item within a Table. Columns may also contain nested
 * Column elements to represent column groups. Nested columns can be statically defined as
 * children, or dynamically generated using a function based on the `childColumns` prop.
 */
export let Column: <T>(props: ColumnProps<T>) => JSX.Element;
/**
 * A Row represents a single item in a Table and contains Cell elements for each column.
 * Cells can be statically defined as children, or generated dynamically using a function
 * based on the columns defined in the TableHeader.
 */
export let Row: (props: RowProps) => JSX.Element;
/**
 * A Cell represents the value of a single Column within a Table Row.
 */
export let Cell: (props: CellProps) => JSX.Element;
export { Section } from '@react-stately/collections';

//# sourceMappingURL=types.d.ts.map
