import {ChevronRightIcon, InfoIcon} from '@chakra-ui/icons'
import {Box} from '@chakra-ui/layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Spacer
} from '@chakra-ui/react'
import {FaFolderPlus} from '@react-icons/all-files/fa/FaFolderPlus'
import {FaTh} from '@react-icons/all-files/fa/FaTh'
import {FaThList} from '@react-icons/all-files/fa/FaThList'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import UploadButton from '../../atoms/UploadButton'
import DnDBcrmbItem from './DnDBcrmbItem'

export type ContainerViewType = 'LIST' | 'GRID'
export type ToolbarProos = {
  view: ContainerViewType
  onViewToggleClick: () => void
  onInfoToggleClick: () => void
  breadcrumbs: {index: string; text: string}[]
  onBreadcrumbClick: (index: string) => void
  onBreadcrumbDnDMove: (dragIndex: number, dropIndex: string) => void
  onUpload: (acceptedFiles: File[]) => void
  onNewFolder: () => void
}

const Toolbar: React.FC<ToolbarProos> = props => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box maxW="100%" p={2}>
        <Flex>
          <ButtonGroup>
            <UploadButton onUpload={props.onUpload} />
            <IconButton
              aria-label=""
              onClick={props.onNewFolder}
              icon={<FaFolderPlus />}
            />
          </ButtonGroup>

          {/* <Divider orientation="horizontal" /> */}

          <Box ml={5} p={2}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}>
              {props.breadcrumbs.map(({index, text}, key) => {
                const isCurrentPage = props.breadcrumbs.length - 1 === key

                return (
                  <BreadcrumbItem key={key} isCurrentPage={isCurrentPage}>
                    <DnDBcrmbItem
                      index={index}
                      onClick={props.onBreadcrumbClick}
                      onDnd={props.onBreadcrumbDnDMove}>
                      {text}
                    </DnDBcrmbItem>
                  </BreadcrumbItem>
                )
              })}
            </Breadcrumb>
          </Box>
          <Spacer />
          <Box>
            {props.view === 'GRID' && (
              <IconButton bg="transparent" icon={<FaThList />} aria-label="" />
            )}
            {props.view === 'LIST' && (
              <IconButton
                bg="transparent"
                disabled
                icon={<FaTh />}
                aria-label=""
              />
            )}

            <IconButton
              bg="transparent"
              icon={<InfoIcon />}
              aria-label=""
              onClick={props.onInfoToggleClick}
            />
          </Box>
        </Flex>
      </Box>
    </DndProvider>
  )
}

export default Toolbar
