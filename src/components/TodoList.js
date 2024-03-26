import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import AuditSummary from './AuditSummary';

function TodoList({ todos, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {
  const [filterInput, setFilterInput] = useState("");

  const data = useMemo(() => todos.filter(todo => 
    todo.username.toLowerCase().includes(filterInput.toLowerCase()) || 
    (todo.auditor && todo.auditor.toLowerCase().includes(filterInput.toLowerCase()))
  ), [todos, filterInput]);

  const columns = useMemo(() => [
    {
      Header: 'N',
      accessor: (_, i) => i + 1,
      id: 'row',
      disableSortBy: true, // Disabling sort on index
    },
    {
      Header: 'Auditor',
      accessor: 'auditor',
    },
    {
      Header: 'Period',
      accessor: 'period',
    },
    {
      Header: 'AA',
      accessor: 'username',
    },
    {
      Header: 'AFE',
      accessor: 'afe',
    },
    {
      Header: 'Process',
      accessor: 'processPath',
    },
    {
      Header: 'Error',
      accessor: 'error',
    },
    {
      Header: 'General Coaching',
      accessor: 'coaching',
      disableSortBy: true, // Assuming you might not want to sort by this complex text
    },
    {
      Header: 'Observations',
      accessor: 'durable', // Assuming 'durable' corresponds to observations
      disableSortBy: true, // Assuming sorting is not required
    },
    {
      Header: 'Action',
      id: 'action',
      accessor: (row) => row,
      Cell: ({ value }) => (
        <div>
          <button className="delete-btn" onClick={() => deleteTodo(value.id)}>❌</button>
{/*           <button onClick={() => toggleEdit(value.id)}>🖋</button>
          <button onClick={() => saveEdit(value.id)}>✅</button> */}
        </div>
      ),
      disableSortBy: true, // Actions don't need sorting
    },
  ], [deleteTodo, toggleEdit, saveEdit]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div>
      <AuditSummary todos={todos} />
      <input
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder={"Search by AA or Auditor"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc ? ' 🔽' : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
