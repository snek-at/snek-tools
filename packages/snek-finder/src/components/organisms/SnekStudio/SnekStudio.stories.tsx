import {Meta, Story} from '@storybook/react'
import React from 'react'

import SnekStudio, {SnekStudioProps} from '.'

export default {
  title: 'Organisms/SnekStudio',
  component: SnekStudio
} as Meta

const Template: Story<SnekStudioProps> = args => <SnekStudio {...args} />

export const Primary: Story<SnekStudioProps> = Template.bind({})

Primary.args = {
  src:
    'https://topsexymodels.net/wp-content/uploads/2020/04/_92444178_518742988810667_5403639706982625195_n-820x1024.jpg',
  onComplete: dataURL => console.log('new image: ', dataURL),
  onClose: () => null
}
