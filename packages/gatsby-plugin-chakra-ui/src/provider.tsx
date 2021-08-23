import {ChakraProvider} from '@chakra-ui/react'
import * as React from 'react'

import theme from './theme'

type WrapRootElementProps = {
  element: React.ReactNode
  disableProvider?: boolean
  resetCSS?: boolean
  portalZIndex?: number
}

export const WrapRootElement: React.FC<WrapRootElementProps> = ({
  element,
  disableProvider = false,
  resetCSS = true,
  portalZIndex = 40
}) => {
  if (disableProvider) {
    return <>{element}</>
  }

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
