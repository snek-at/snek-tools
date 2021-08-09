import {Meta, Story} from '@storybook/react'
import React from 'react'

import FileGrid from '.'

export default {
  title: 'Molecules/FileGrid',
  component: FileGrid
} as Meta

const Template: Story = args => <FileGrid {...args} />

export const Primary = Template.bind({})

Primary.args = {}
