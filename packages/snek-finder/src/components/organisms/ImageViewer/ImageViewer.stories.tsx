import {Meta, Story} from '@storybook/react'
import React from 'react'

import ImageViewer, {ImageViewerProps} from '.'

const styles = {
  transform: 'scale(1)',
  height: '100vh'
}

export default {
  title: 'Organisms/ImageViewer',
  component: ImageViewer,
  decorators: [storyFn => <div style={styles}>{storyFn()}</div>]
} as Meta

const Template: Story<ImageViewerProps> = args => <ImageViewer {...args} />

export const Primary: Story<ImageViewerProps> = Template.bind({})

Primary.args = {
  src:
    'https://topsexymodels.net/wp-content/uploads/2020/04/_92444178_518742988810667_5403639706982625195_n-820x1024.jpg',
  onClose: () => null,
  onOpenStudio: () => null
}
