import {Td, Tr, useColorModeValue} from '@chakra-ui/react'
import {ConnectableElement, useDrag, useDrop} from 'react-dnd'
import {Row} from 'react-table'

type TableRowProps = {
  row: Row<object>
  index: number
  isSelected: boolean
  onDnD: (dragIndex: number, hoverIndex: number) => void
  onClick: (event: React.MouseEvent<HTMLTableRowElement>, id: number) => void
  onDoubleClick: (
    event: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => void
  onContextMenu: (
    event: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => void
}

export const DND_FILE_LIST_ITEM_TYPE = 'row'

const TableRow: React.FC<TableRowProps> = props => {
  const blueBgColor = useColorModeValue('blue.100', 'blue.400')

  const [, drop] = useDrop({
    accept: DND_FILE_LIST_ITEM_TYPE,
    drop(item: {type: typeof DND_FILE_LIST_ITEM_TYPE; index: number}, monitor) {
      //monitor.isOver({shallow: false})
      props.onDnD(item.index, props.index)
    }
  })

  const [{isDragging}, drag] = useDrag({
    type: DND_FILE_LIST_ITEM_TYPE,
    item: {type: DND_FILE_LIST_ITEM_TYPE, index: props.index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  const dndRefs = (el: ConnectableElement) => {
    drag(el)
    drop(el)
  }

  return (
    <Tr
      ref={dndRefs}
      style={{opacity}}
      fontSize="sm"
      bg={props.isSelected ? blueBgColor : undefined}
      onClick={e => props.onClick(e, props.index)}
      onDoubleClick={e => props.onDoubleClick(e, props.index)}
      onContextMenu={e => props.onContextMenu(e, props.index)}>
      {props.row.cells.map(cell => (
        <Td {...cell.getCellProps()} isNumeric={(cell.column as any).isNumeric}>
          {cell.render('Cell')}
        </Td>
      ))}
    </Tr>
  )
}

export default TableRow
