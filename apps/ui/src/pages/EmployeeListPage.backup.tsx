import { useQuery } from 'react-query';
import { getEmployeeList } from '../api/employee';
import { Employee } from '../config/types';
import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';

const EmployeeListPage = () => {
  const [tableData, setTableData] = useState<Employee[]>([]);
  const { data } = useQuery<Employee[]>('employees', getEmployeeList);
  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
    }),
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (props) => (
        <Link to={`/employee/${props.row.getValue('id')}`}>
          Upload Documents
        </Link>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          {table.getFlatHeaders().map((header) => (
            <th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeListPage;
