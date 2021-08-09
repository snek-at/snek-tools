import {BreadcrumbLink} from '@chakra-ui/react'
import {useDrop} from 'react-dnd'

import {DND_FILE_LIST_ITEM_TYPE} from '../FileList/TableRow'

type DnDBcrmbItemProps = {
  index: string
  onClick: (index: string) => void
  onDnd: (dragIndex: number, dropIndex: string) => void
}

const DnDBcrmbItem: React.FC<DnDBcrmbItemProps> = props => {
  const [, drop] = useDrop({
    accept: DND_FILE_LIST_ITEM_TYPE,
    drop(item: {type: typeof DND_FILE_LIST_ITEM_TYPE; index: number}, monitor) {
      props.onDnd(item.index, props.index)
    }
  })

  return (
    <BreadcrumbLink ref={drop} onClick={() => props.onClick(props.index)}>
      {props.children}
    </BreadcrumbLink>
  )
}

export default DnDBcrmbItem
