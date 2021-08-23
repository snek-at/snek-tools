import {ColorModeScript} from '@chakra-ui/react'
import type {GatsbySSR} from 'gatsby'

import {WrapRootElement} from '../provider'
import theme from '../theme'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents
}) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />
  ])
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = (
  {element},
  pluginOptions
) => {
  return <WrapRootElement element={element} {...pluginOptions} />
}
