import {
  Box,
  Center,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Image,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Textarea,
  Th,
  Tr
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'

export type FileDetails = {
  fileName: string
  fileType: string
  fileSize: string
  createdAt: string
  modifiedAt: string
  description?: string
}

export type FileInfoBoxProps = {
  onUpdate: (details: FileDetails) => void
  previewImageSrc?: string
  previewElement?: JSX.Element
  details: FileDetails
}

const FileInfoBox: React.FC<FileInfoBoxProps> = props => {
  const [details, setDetails] = useState<FileDetails>(props.details)

  useEffect(() => {
    setDetails(props.details)
  }, [props.details])

  const updateDetails = (key: string, value: string) => {
    const updatedDetails = {...details, [key]: value}

    setDetails(updatedDetails)
  }

  return (
    <Box borderWidth="1px" w={'xs'} overflow="hidden">
      <Box
        m={2}
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        maxH="50%">
        <Center h={400}>
          {props.previewImageSrc && (
            <Image
              h={400}
              src={props.previewImageSrc}
              objectFit="scale-down"
              alt=""
            />
          )}
          {props.previewElement}
        </Center>
      </Box>
      <Divider />
      <Stack direction="row" h="25%" p={2}>
        <Divider orientation="vertical" />
        {/* <Text>Chakra UI</Text> */}
        <Table size="sm" variant="unstyled">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>
                <Editable
                  placeholder="Enter a name"
                  onChange={nextValue => updateDetails('fileName', nextValue)}
                  onSubmit={() => props.onUpdate(details)}
                  value={details.fileName}>
                  <EditableInput />
                  <EditablePreview />
                </Editable>
              </Td>
            </Tr>
            <Tr>
              <Th>File type</Th>
              <Td>
                <Tag>{details.fileType}</Tag>
              </Td>
            </Tr>
            <Tr>
              <Th>File size</Th>
              <Td>{details.fileSize || '-'}</Td>
            </Tr>
            <Tr>
              <Th>Created at</Th>
              <Td>{details.createdAt}</Td>
            </Tr>
            <Tr>
              <Th>Modified at</Th>
              <Td>{details.modifiedAt}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
      <Divider />
      <Stack direction="row" p={2}>
        <Textarea
          onChange={e => updateDetails('description', e.target.value)}
          onBlur={() => props.onUpdate(details)}
          value={
            details.description ? details.description : 'Add a description'
          }
        />
      </Stack>
    </Box>
  )
}

export default FileInfoBox
