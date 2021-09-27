import {
  Box,
  Button,
  Center,
  CloseButton,
  Divider,
  Flex,
  HStack,
  IconButton,
  Portal,
  Spacer,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {FaSearchMinus} from '@react-icons/all-files/fa/FaSearchMinus'
import {FaSearchPlus} from '@react-icons/all-files/fa/FaSearchPlus'
import {useState} from 'react'
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch'

export type ImageViewerProps = {
  onClose: () => void
  onOpenStudio: () => void
  src: string
}

const ImageViewer: React.FC<ImageViewerProps> = props => {
  const bg = useColorModeValue('white', 'gray.600')
  const borderColor = useColorModeValue('gray.100', '#FFFFFF14')

  const [scale, setScale] = useState(1)

  return (
    <Portal appendToParentPortal={false}>
      <Box pos="fixed" top={0} zIndex="popover" w="100%" h="100vh">
        <TransformWrapper
          initialScale={scale}
          doubleClick={{disabled: true}}
          onZoom={ref => {
            setScale(ref.state.scale)
          }}
          minScale={0.5}
          maxScale={8}>
          {({zoomIn, zoomOut, resetTransform, ...rest}) => (
            <>
              <Flex
                direction="column"
                overflow="hidden"
                left={0}
                top={0}
                h="100%"
                w="100%"
                pos="absolute">
                <HStack
                  borderBottom="solid 1px"
                  bg={bg}
                  borderColor={borderColor}
                  pb={3}
                  pt={3}
                  pr={2}
                  h={'7.5vh'}
                  zIndex={999}>
                  <Flex width="100%">
                    <Spacer />
                    <HStack>
                      <Button onClick={props.onOpenStudio}>Snek Studio</Button>
                      <Divider orientation="vertical" />
                      <Text
                        fontSize="xs"
                        minW={35}
                        textAlign="center"
                        userSelect="none">
                        {Math.round(scale * 100)}%
                      </Text>
                      <IconButton
                        aria-label="a"
                        icon={<FaSearchPlus />}
                        opacity={scale === 8 ? 0.5 : 1}
                        // onClick={() => onSetScale(1)}
                        onClick={() => {
                          zoomIn()
                          if (scale + 0.2 > 8) {
                            setScale(8)
                          } else {
                            setScale(scale + 0.2)
                          }
                        }}
                      />
                      <IconButton
                        aria-label="a"
                        icon={<FaSearchMinus />}
                        opacity={scale === 0.5 ? 0.5 : 1}
                        // onClick={() => onSetScale(0)}
                        onClick={() => {
                          zoomOut()

                          if (scale - 0.2 < 0.5) {
                            setScale(0.5)
                          } else {
                            setScale(scale - 0.2)
                          }
                        }}
                      />
                      <CloseButton onClick={props.onClose} />
                    </HStack>
                  </Flex>
                </HStack>
                <Box bg="rgba(0,0,0,0.6)" flex="1">
                  <Center>
                    <TransformComponent>
                      <img src={props.src} alt="test" />
                    </TransformComponent>
                  </Center>
                </Box>
              </Flex>
            </>
          )}
        </TransformWrapper>
      </Box>
    </Portal>
  )
}

export default ImageViewer
