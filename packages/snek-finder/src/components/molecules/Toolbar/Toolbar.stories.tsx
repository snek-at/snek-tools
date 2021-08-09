import {Meta, Story} from '@storybook/react'
import React from 'react'

import Toolbar, {ToolbarProos} from '.'

export default {
  title: 'Molecules/Toolbar',
  component: Toolbar
} as Meta

const Template: Story<ToolbarProos> = args => <Toolbar {...args} />

export const Primary: Story<ToolbarProos> = Template.bind({})

Primary.args = {
  breadcrumbs: [{index: 'e97dc8a6-e984-4a45-8ad0-4406223012b2', text: 'A'}]
}
