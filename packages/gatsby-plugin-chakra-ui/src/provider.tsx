import {ChakraProvider} from '@chakra-ui/react'
import * as React from 'react'

import theme from './theme'

type WrapRootElementProps = {
  element: React.ReactNode
  resetCSS?: boolean
  portalZIndex?: number
}

export const WrapRootElement: React.FC<WrapRootElementProps> = ({
  element,
  resetCSS = true,
  portalZIndex = 40
}) => {
  return (
    <ChakraProvider
      theme={theme}
      resetCSS={resetCSS}
      portalZIndex={portalZIndex}>
      {element}
    </ChakraProvider>
  )
}

const Provider: React.FC<WrapRootElementProps> = ({children, ...props}) => {
  return <WrapRootElement element={children} {...props} />
}

export default Provider
