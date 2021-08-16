// OutlineSelector.js
import {SunIcon, MoonIcon} from '@chakra-ui/icons'
import {Icon, useColorMode} from '@chakra-ui/react'
import addons from '@storybook/addons'
import {useGlobals} from '@storybook/api'
import {Icons, IconButton} from '@storybook/components'
import {FORCE_RE_RENDER} from '@storybook/core-events'
import React, {useCallback} from 'react'

const CMSelector = () => {
  const [globals, updateGlobals] = useGlobals()

  const isDarkmode = globals['isDarkmode'] || false

  console.log('selector', globals['isDarkmode'], isDarkmode)

  // Function that will update the global value and trigger a UI refresh.
  const refreshAndUpdateGlobal = () => {
    // Updates Storybook global value
    updateGlobals({
      ['isDarkmode']: !isDarkmode
    }),
      // Invokes Storybook's addon API method (with the FORCE_RE_RENDER) event to trigger a UI refresh
      addons.getChannel().emit(FORCE_RE_RENDER)
  }

  const toggleDarkmode = useCallback(() => refreshAndUpdateGlobal(), [
    isDarkmode
  ])

  return (
    <IconButton
      key="colormode"
      title="Apply colormode to the preview2"
      onClick={toggleDarkmode}>
      {/* <Icons icon={`${isDarkmode ? 'lightning' : 'lightningoff'}`} /> */}
      {isDarkmode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}

export default CMSelector
