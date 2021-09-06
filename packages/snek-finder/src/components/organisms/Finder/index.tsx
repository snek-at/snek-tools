import {DeleteIcon} from '@chakra-ui/icons'
import {Box, Divider} from '@chakra-ui/layout'
import {
  AbsoluteCenter,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Portal,
  Text,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import {FaFile} from '@react-icons/all-files/fa/FaFile'
import {FaFilePdf} from '@react-icons/all-files/fa/FaFilePdf'
import {FaFolder} from '@react-icons/all-files/fa/FaFolder'
import update from 'immutability-helper'
import {MouseEvent, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import {MimeTypes} from '../../../common/mimeTypes'
import {fileToBase64} from '../../../common/toBase64'
import {uuidv4} from '../../../common/uuid'
import ContextModal from '../../molecules/ContextModal'
import FileContextMenu from '../../molecules/FileContextMenu'
import FileInfoBox, {
  FileDetails,
  FileInfoBoxProps
} from '../../molecules/FileInfoBox'
import FileList from '../../molecules/FileList'
import Toolbar from '../../molecules/Toolbar'
import {
  FinderData,
  FinderFileItem,
  FinderFolderItem,
  FinderItem,
  FinderMode,
  MimeType,
  SnekFinderAction
} from './types'

export type SnekFinderProps = {
  mode?: FinderMode
  onSelectorClose?: () => void
  onSelectorSelect?: (item: FinderItem) => void
  data: FinderData
  rootUUID: string
  onItemOpen: (uuid: string) => void
  onDataChanged: (data: FinderData, action: SnekFinderAction) => void
}

const Finder: React.FC<SnekFinderProps> = ({mode = 'browser', ...props}) => {
  const toast = useToast()
  const folderCreateContextModal = useDisclosure()
  const itemRenameContextModal = useDisclosure()

  const [showInfoCard, setShowInfoCard] = useState(false)
  const infoCardToggle = () => setShowInfoCard(!showInfoCard)

  let [data, setData] = useState<FinderData>(props.data)

  useEffect(() => {
    if (
      JSON.stringify(Object.keys(data)) !==
      JSON.stringify(Object.keys(props.data))
    ) {
      setData(props.data)
    } else {
      data = props.data
    }
  }, [props.data])
  const [rootUUID, setRootUUID] = useState(props.rootUUID)

  const [parentNodeHistory, setParentNodeHistory] = useState<
    {index: string; text: string}[]
  >([{index: rootUUID, text: data[rootUUID].name}])

  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [contextMenu, setContextMenu] = useState<{
    id: number | undefined
    spawnX: number
    spawnY: number
  } | null>(null)

  const switchParentNode = (uuid: string) => {
    // find uuid in parentNodeHistory and remove it and all following elements
    const index = parentNodeHistory.findIndex(
      (item: {index: string}) => item.index === uuid
    )

    if (index !== -1) {
      setParentNodeHistory(parentNodeHistory.slice(0, index + 1))
    } else {
      setParentNodeHistory(
        parentNodeHistory.concat({index: uuid, text: data[uuid].name})
      )
    }

    setRootUUID(uuid)
    // add uuid to parentNodeHistory state
  }

  const resolveUUIDFromIndex = (index: number) => {
    const folder = data[rootUUID] as FinderFolderItem

    return folder.childUUIDs[index] || rootUUID
  }

  const handleSelectionChange = (ids: number[]) => {
    setSelectedFiles(ids)
  }

  const handleContextMenu = (event: MouseEvent, id: number | undefined) => {
    setContextMenu({id, spawnX: event.clientX, spawnY: event.clientY})
  }

  const handleMove = (dragUUID: string, dropUUID: string) => {
    const folder = data[rootUUID] as FinderFolderItem

    // Push dragUUID to data[dropUUID].childUUIDs without duplicates
    const droppable = data[dropUUID] as FinderFolderItem

    if (!droppable.childUUIDs.includes(dragUUID)) {
      // Remove dragUUID from folder.childUUIDs
      const newRootChildUUIDs = folder.childUUIDs.filter(
        (uuid: string) => uuid !== dragUUID
      )

      const newData = update(data, {
        [rootUUID]: {
          childUUIDs: {$set: newRootChildUUIDs}
        },
        [dropUUID]: {
          childUUIDs: {$push: [dragUUID]}
        }
      })

      setData(newData)

      toast({
        title: `Moved item`,
        status: 'info',
        isClosable: true,
        position: 'bottom-right'
      })

      props.onDataChanged(newData, {type: 'UPDATE'})
    }
  }

  const handleListMove = (dragIndex: number, dropIndex: number) => {
    const dragUUID = resolveUUIDFromIndex(dragIndex)
    const dropUUID = resolveUUIDFromIndex(dropIndex)

    handleMove(dragUUID, dropUUID)
  }

  const handleBreadcrumbMove = (dragIndex: number, dropUUID: string) => {
    const dragUUID = resolveUUIDFromIndex(dragIndex)

    handleMove(dragUUID, dropUUID)
  }

  const handleUpload = async (acceptedFiles: File[]) => {
    const todayDate = new Date().toDateString()

    let newData: FinderData | undefined

    for (const file of acceptedFiles) {
      const {name, type, size} = file

      // convert size to kb or mb
      const kb = size / 1024
      const mb = kb / 1024
      const sizeString = mb > 1 ? `${mb.toFixed(2)} MB` : `${kb.toFixed(2)} KB`

      // convert file to datauri string
      const fileDataUrl = (await fileToBase64(file)) as string
      const fileName = name.split('.')[0]

      // Generate a uuid
      const uuid = uuidv4()

      // add uuid to data[rootUUID].childUUIDs
      newData = update(newData || data, {
        [rootUUID]: {
          childUUIDs: {$push: [uuid]}
        }
      })

      newData = {
        ...newData,
        [uuid]: {
          name: fileName,
          createdAt: todayDate,
          modifiedAt: todayDate,
          src: fileDataUrl,
          mimeType: type as MimeType,
          size: sizeString
        }
      }

      props.onDataChanged(newData, {type: 'ADD', payload: {uuid, file}})
    }

    newData && setData(newData)

    toast.closeAll()

    toast({
      title: `Uploaded ${acceptedFiles.length} file${
        draggedFiles.length > 1 ? 's' : ''
      }`,
      status: 'success',
      isClosable: true,
      position: 'bottom-right'
    })
  }

  const handleFileInfoBoxUpdate = (details: FileDetails) => {
    const uuid = resolveUUIDFromIndex(selectedFiles[0])

    const todayDate = new Date().toDateString()

    // update details of uuid item
    const newData = update(data, {
      [uuid]: {
        name: {$set: details.fileName},
        description: {$set: details.description},
        modifiedAt: {$set: todayDate}
      }
    })

    setData(newData)

    props.onDataChanged(newData, {type: 'UPDATE'})
  }

  const handleFinishFolderCreate = (name: string) => {
    const todayDate = new Date().toDateString()

    // Create new folder
    const uuid = uuidv4()

    let newData = update(data, {
      [rootUUID]: {
        childUUIDs: {$push: [uuid]}
      }
    })

    newData = {
      ...newData,
      [uuid]: {
        isFolder: true,
        name,
        createdAt: todayDate,
        modifiedAt: todayDate,
        childUUIDs: []
      }
    }

    // Update data with new folder
    setData(newData)

    toast({
      title: `Created folder`,
      status: 'success',
      isClosable: true,
      position: 'bottom-right'
    })

    folderCreateContextModal.onClose()
    props.onDataChanged(newData, {type: 'ADD', payload: {uuid}})
  }

  const handleItemRename = (name: string) => {
    // Get uuid from selected item
    const uuid = resolveUUIDFromIndex(selectedFiles[0])
    const todayDate = new Date().toDateString()

    // Rename uuid and update modfiedAt
    const newData = update(data, {
      [uuid]: {
        name: {$set: name},
        modifiedAt: {$set: todayDate}
      }
    })

    setData(newData)

    itemRenameContextModal.onClose()
    props.onDataChanged(newData, {type: 'UPDATE'})
  }

  //#region > Context Menu handlers
  const handleFileOpen = () => {
    // get uuid of selected file
    const uuid = resolveUUIDFromIndex(selectedFiles[0])
    const item = data[uuid]

    setContextMenu(null)

    if ((item as FinderFolderItem).isFolder) {
      switchParentNode(uuid)
    } else {
      if (mode === 'selector') {
        if (props.onSelectorSelect) {
          props.onSelectorSelect(item)
        }
      } else {
        props.onItemOpen(uuid)
      }
    }
  }

  const handleFileRename = () => {
    setContextMenu(null)

    itemRenameContextModal.onOpen()
    //props.onItemRename(contextMenu.id)
  }

  const handleFileDelete = () => {
    setContextMenu(null)

    // Unset uuid from data and update data[rootUUID].childUUIDs
    const uuid = resolveUUIDFromIndex(selectedFiles[0])

    const newData = update(data, {
      $unset: [uuid],
      [rootUUID]: {
        childUUIDs: arr => arr.filter(_uuid => _uuid !== uuid)
      }
    })

    setSelectedFiles([])
    setData(newData)
    props.onDataChanged(newData, {type: 'DELETE', payload: {uuid}})
  }

  const handleNewFolder = () => {
    setContextMenu(null)
    folderCreateContextModal.onOpen()
  }
  //#endregion

  const prepareFileListItems = () => {
    // if parentNode is null tree.nodes is prepared else parentNode.children

    const children = (data[rootUUID] as FinderFolderItem).childUUIDs.map(
      uuid => ({
        uuid,
        ...data[uuid]
      })
    )

    return children.map(item => {
      let prefix: JSX.Element

      const folderItem = item as FinderFolderItem
      const fileItem = item as FinderFileItem

      if (folderItem.isFolder) {
        prefix = <Icon as={FaFolder} w={6} h={6} />
      } else {
        const {mimeType, src} = fileItem

        if (mimeType && mimeType.startsWith('image/')) {
          prefix = <Image w={6} h={6} src={src}></Image>
        } else if (mimeType && mimeType.startsWith('application/pdf')) {
          prefix = <Icon as={FaFilePdf} w={6} h={6} />
        } else {
          prefix = <Icon as={FaFile} w={6} h={6} />
        }
      }

      return {
        prefix,
        name: item.name,
        modifiedAt: item.modifiedAt,
        fileSize: fileItem.size,
        isFolder: folderItem.isFolder
      }
    })
  }

  const prepareFileInfoBoxProps = () => {
    const uuid = resolveUUIDFromIndex(selectedFiles[0])
    const item = data[uuid]

    const folderItem = item as FinderFolderItem
    const fileItem = item as FinderFileItem

    let props: FileInfoBoxProps = {
      onUpdate: handleFileInfoBoxUpdate,
      details: {
        fileName: item.name,
        fileType:
          (folderItem.isFolder && 'Folder') || MimeTypes[fileItem.mimeType],
        fileSize: fileItem.size,
        createdAt: item.createdAt,
        modifiedAt: item.modifiedAt,
        description: item.description
      }
    }

    if (folderItem.isFolder) {
      props['previewElement'] = <Icon as={FaFolder} h={200} w={200} />
    } else {
      const {mimeType, src, previewSrc} = fileItem

      if (mimeType && mimeType.includes('image/')) {
        props['previewImageSrc'] = src
      } else {
        if (previewSrc) {
          props['previewImageSrc'] = previewSrc
        } else {
          props['previewElement'] = <Icon as={FaFile} h={200} w={200} />
        }
      }
    }

    return props
  }

  // !BUG: useDropzone clashes with react-dnd dropzone inside of FileList component
  // This creates unnecessary re-rendering of this component when FileList dnd is used
  // (occures on drag and drop / click on rows)
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    draggedFiles
  } = useDropzone({
    onDrop: handleUpload
  })

  useEffect(() => {
    if (isDragActive && isDragAccept) {
      toast({
        title: `Drop to upload ${draggedFiles.length} file${
          draggedFiles.length > 1 ? 's' : ''
        }`,
        status: 'info',
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [isDragActive, isDragAccept, draggedFiles.length])

  const finder = (
    <>
      {contextMenu && (
        <Box
          pos="absolute"
          top={contextMenu.spawnY}
          left={contextMenu.spawnX}
          w="3xs">
          <FileContextMenu
            items={
              contextMenu.id !== undefined
                ? [
                    {
                      _type: 'ITEM',
                      content: <>{mode === 'selector' ? 'Select' : 'Open'}</>,
                      onItemClick: handleFileOpen
                    },
                    {
                      _type: 'ITEM',
                      content: <>{'Rename'}</>,
                      onItemClick: handleFileRename
                    },
                    {
                      _type: 'ITEM',
                      content: (
                        <HStack spacing={2}>
                          <DeleteIcon />
                          <Text>Delete</Text>
                        </HStack>
                      ),
                      onItemClick: handleFileDelete
                    }
                  ]
                : [
                    {
                      _type: 'ITEM',
                      content: <>{'New folder'}</>,
                      onItemClick: handleNewFolder
                    }
                  ]
            }
          />
        </Box>
      )}
      <Box h="90vh" w="100%" userSelect="none">
        <Toolbar
          view="LIST"
          onViewToggleClick={() => null}
          onInfoToggleClick={infoCardToggle}
          breadcrumbs={parentNodeHistory}
          onBreadcrumbClick={switchParentNode}
          onBreadcrumbDnDMove={handleBreadcrumbMove}
          onUpload={handleUpload}
          onNewFolder={handleNewFolder}
        />

        <Divider />

        <Flex>
          <Box mt={5} mb={5} flex="1" h={'90vh'} overflowY="scroll">
            <Box
              {...getRootProps()}
              h={'100%'}
              _focus={{outline: 'none'}}
              onClick={e => e.stopPropagation()}
              onContextMenu={e => {
                e.preventDefault()
              }}>
              <input {...getInputProps()} />

              <FileList
                items={prepareFileListItems()}
                onSelectionDoubleClick={handleFileOpen}
                onSelectionChange={handleSelectionChange}
                onContextMenu={handleContextMenu}
                onDnD={handleListMove}
                onContextMenuClose={() => setContextMenu(null)}
              />
            </Box>
          </Box>
          <Box>
            {showInfoCard && <FileInfoBox {...prepareFileInfoBoxProps()} />}
          </Box>
        </Flex>
      </Box>
      <ContextModal
        title="Create folder"
        inputPlaceholder="Your new folder"
        finishBtnLabel="Create"
        onFinish={handleFinishFolderCreate}
        isOpen={folderCreateContextModal.isOpen}
        onClose={folderCreateContextModal.onClose}
        onCancel={folderCreateContextModal.onClose}
      />
      <ContextModal
        title="Rename"
        inputPlaceholder="File name"
        inputText={data[resolveUUIDFromIndex(selectedFiles[0])].name}
        finishBtnLabel="Rename"
        onFinish={handleItemRename}
        isOpen={itemRenameContextModal.isOpen}
        onClose={itemRenameContextModal.onClose}
        onCancel={itemRenameContextModal.onClose}
      />
    </>
  )

  if (mode === 'selector' && props.onSelectorClose) {
    return (
      <Modal
        isOpen={true}
        onClose={props.onSelectorClose}
        isCentered
        size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SnekFinder - Selector</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{finder}</ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return finder
}

export default Finder
