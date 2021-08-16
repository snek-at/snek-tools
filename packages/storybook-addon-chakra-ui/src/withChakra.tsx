import {
  ChakraProvider,
  ColorMode,
  extendTheme,
  useColorMode
} from '@chakra-ui/react'
import {StoryFn, StoryContext} from '@storybook/addons'
import * as React from 'react'

const theme = extendTheme({})

type ChakraColorModeToggleProps = {
  colorMode: ColorMode
}
const ChakraColorModeToggle: React.FC<ChakraColorModeToggleProps> = ({
  colorMode
}) => {
  const {setColorMode} = useColorMode()

  setColorMode(colorMode)

  return null
}

export function withChakra(Story: StoryFn<JSX.Element>, context: StoryContext) {
  const chakraParameters = context.parameters.chakra
  const isDarkmode = context.globals.isDarkmode

  return (
    <ChakraProvider theme={theme} {...chakraParameters}>
      <ChakraColorModeToggle colorMode={isDarkmode ? 'dark' : 'light'} />
      <Story {...context} />
    </ChakraProvider>
  )
}
