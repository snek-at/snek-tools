import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import {ChangeEvent, useEffect, useState} from 'react'

export type ContextModalProps = {
  isOpen: boolean
  title: string
  inputPlaceholder: string
  inputText?: string
  finishBtnLabel?: string
  cancelBtnLabel?: string
  onFinish: (input: string) => void
  onClose: () => void
  onCancel: () => void
}

const ContextModal: React.FC<ContextModalProps> = props => {
  const [inputText, setInputText] = useState<string>(props.inputText || '')

  useEffect(() => {
    setInputText(props.inputText || '')
  }, [props.inputText])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder={props.inputPlaceholder}
                value={inputText}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => props.onFinish(inputText)}>
              {props.finishBtnLabel || 'Save'}
            </Button>
            <Button onClick={props.onCancel}>
              {props.cancelBtnLabel || 'Cancel'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ContextModal
