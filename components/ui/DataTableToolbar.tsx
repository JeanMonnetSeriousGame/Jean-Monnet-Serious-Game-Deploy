'use client';

import { Table } from '@tanstack/react-table';
import { Input } from './input';
import AddUnit from '@/app/(main)/teach/create-unit';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between pt-4 ">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter units..."
          value={
            (table.getState().globalFilter as string) ?? ''
          }
          onChange={event => {
            table.setGlobalFilter(event.target.value);
          }}
          className=" w-[150px] lg:w-[250px]"
        />
      </div>
      <AddUnit />
    </div>
  );
}
