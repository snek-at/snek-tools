import {ChakraProvider, CSSReset, extendTheme} from '@chakra-ui/react'
import {addDecorator} from '@storybook/react'
import React from 'react'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

addDecorator(storyFn => (
  <ChakraProvider theme={extendTheme({config: {initialColorMode: 'dark'}})}>
    <CSSReset />
    {storyFn()}
  </ChakraProvider>
))
