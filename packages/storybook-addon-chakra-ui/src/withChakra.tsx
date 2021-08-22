import {ChakraProvider, extendTheme, useColorMode} from '@chakra-ui/react'
import {StoryFn, StoryContext} from '@storybook/addons'
import addons from '@storybook/addons'
import {UPDATE_GLOBALS} from '@storybook/core-events'
import {useEffect} from 'react'

const theme = extendTheme({})

export function withChakra(Story: StoryFn<JSX.Element>, context: StoryContext) {
  const chakraParameters = context.parameters.chakra

  return (
    <ChakraProvider theme={theme} {...chakraParameters}>
      <Story {...context} />
    </ChakraProvider>
  )
}

export function withChakraColorMode(
  Story: StoryFn<JSX.Element>,
  context: StoryContext
) {
  const {colorMode, setColorMode} = useColorMode()
  const isDarkMode = colorMode === 'dark'
  const isGlobalDarkMode = context.globals.isDarkmode

  useEffect(() => {
    if (isGlobalDarkMode !== isDarkMode) {
      setColorMode(isGlobalDarkMode ? 'dark' : 'light')
    }
  }, [isGlobalDarkMode])

  useEffect(() => {
    if (isGlobalDarkMode !== isDarkMode) {
      addons.getChannel().emit(UPDATE_GLOBALS, {
        globals: {
          isDarkmode: isDarkMode
        }
      })
    }
  }, [isDarkMode])

  return <Story {...context} />
}
