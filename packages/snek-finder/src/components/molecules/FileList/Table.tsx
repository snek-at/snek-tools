import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'
import {Box, chakra, Table, Tbody, Th, Thead, Tr} from '@chakra-ui/react'
import update from 'immutability-helper'
import React, {MouseEvent, useEffect, useState} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useSortBy, useTable} from 'react-table'

import TableRow from './TableRow'

type TableProps = {
  columns: any
  records: any
  initialState: any
  onDnD: (dragIndex: number, dropIndex: number) => void
  onContextMenu: (event: React.MouseEvent<any>, id?: number) => void
  onSelectionDoubleClick: () => void
  onSelectionChange: (ids: number[]) => void
  onContextMenuClose: () => void
}

const TheTable: React.FC<TableProps> = props => {
  const [records, setRecords] = useState(props.records)
  const [selectedRows, setSelectedRows] = useState<number[]>([]) // currently only one selection is supported

  useEffect(() => {
    setRecords(props.records)
  }, [props.records])

  const handleRowClick = (
    _event: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => {
    const selection = [id]
    setSelectedRows(selection)

    props.onSelectionChange(selection)
    props.onContextMenuClose()
  }

  const handleRowDoubleClick = (
    _event: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => props.onSelectionDoubleClick()

  const handleRowContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => {
    event.preventDefault()
    const selection = [id]
    setSelectedRows(selection)

    props.onSelectionChange(selection)
    props.onContextMenu(event, id)

    return false
  }

  const handleDnD = (dragIndex: number, dropIndex: number) => {
    // Don't replace items with themselves
    if (dragIndex === dropIndex) {
      return
    }

    const dropRecord = records[dropIndex]

    // remove dragIndex from records if dropRecord is a dropzone
    if (dropRecord.isDropzone) {
      setRecords(
        update(records, {
          $splice: [[dragIndex, 1]]
        })
      )

      props.onDnD(dragIndex, dropIndex)
    }
  }

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedRows([])
      props.onSelectionChange([])
      props.onContextMenuClose()
    }
  }

  const handleContainerContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      props.onSelectionChange([])
      props.onContextMenu(event)
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      data: records,
      columns: props.columns,
      initialState: props.initialState,
      //@ts-ignore
      autoResetFilters: false,
      autoResetSortBy: false
    },
    useSortBy
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        onClick={handleContainerClick}
        onContextMenu={handleContainerContextMenu}
        h="100%">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                    w={column.width}
                    minW={200}>
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              const index = row.index

              return (
                <TableRow
                  index={index}
                  row={row}
                  onDnD={handleDnD}
                  isSelected={selectedRows.includes(index)}
                  onClick={handleRowClick}
                  onDoubleClick={handleRowDoubleClick}
                  onContextMenu={handleRowContextMenu}
                  {...row.getRowProps()}
                />
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </DndProvider>
  )
}

export default React.memo(TheTable)
