import type {GatsbyBrowser} from 'gatsby'
import * as React from 'react'

import {WrapRootElement} from '../provider'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  {element},
  pluginOptions
) => {
  return <WrapRootElement element={element} {...pluginOptions} />
}
