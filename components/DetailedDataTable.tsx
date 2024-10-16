"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";
import { useTranslation } from "next-export-i18n";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  columnToSearch: string[];
  searchPlaceholder?: string;
  className?: string;
  visibility?: any;
  columnToFilter?: any;
  pageSize?: number;
  pagination?: boolean;
  isLoading?: boolean;
  filterByCol?: FilterByCol[];
  setPage?: (page: number) => void;
}
export default function DetailedDataTable<TData, TValue>({
  title = "Titlee",
  data = [],
  columns,
  columnToSearch = [],
  searchPlaceholder = "Search",
  className = "",
  pageSize = 20,
  visibility = {},
  columnToFilter = [],
  pagination = data.length > pageSize,
  isLoading = false,
  filterByCol = [],
  setPage,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const generalI18n = t("general");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    ...columnToFilter,
  ]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ ...visibility });
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility: columnVisibility,
      rowSelection,
    },
    initialState: {
      columnFilters: columnFilters,
      columnVisibility: columnVisibility,
      pagination: {
        pageSize: pageSize,
      },
    },
    globalFilterFn:  (row, columnId, filterValue) => {
      return columnToSearch.some((col: any) => {
        const cellValue = row.getValue(col);
        return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    }
  });

  useEffect(() => {
    filterByCol.map((item) => {
      table.getColumn(item.column)?.setFilterValue(item.filterValue);
    });
  }, [filterByCol]);

  return (
    <Card className={`${cn(className)} border-2 bg-cstm-card shadow-sm`}>
      <h5 className="text-lg rounded-t-md bg-cstm-primary p-4 font-semibold tracking-tight text-cstm-tertiary">
        {title}
      </h5>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-4 pt-0">
          <Input
            placeholder={searchPlaceholder}
            value={
              globalFilter
            }
            onChange={(event) => {
              setGlobalFilter(event.target.value);
            }}
            className="max-w-sm"
          />

          <div className="ml-auto flex space-x-4">
{/*             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  {generalI18n.columns} <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu> */}
            
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-cstm-tertiary">
          {isLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : (
            <>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className="font-semibold text-cstm-tertiary"
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        className="text-cstm-tertiary"
                        key={row.id + title}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell className="py-2" key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-cstm-tertiary"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </div>
        <div className="flex flex-col justify-center items-end">
            <div className="flex items-center justify-end space-x-2">
              {pagination && (
                <div className="space-x-2">
                  <Button
                    size="sm"
                    className="bg-cstm-primary text-cstm-tertiary"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {generalI18n.previous}
                  </Button>
                  <Button
                    size="sm"
                    className="bg-cstm-primary text-cstm-tertiary"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {generalI18n.next}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-white mt-2">
              Showing {table.getRowModel().rows.length.toLocaleString()} of {table.getRowCount().toLocaleString()} rows.  
            </p>
        </div>
      </div>
    </Card>
  );
}
