import {Meta, Story} from '@storybook/react'
import React from 'react'

import FileContextMenu, {FileContextMenuProps} from '.'

export default {
  title: 'Molecules/FileContextMenu',
  component: FileContextMenu
} as Meta

const Template: Story<FileContextMenuProps> = args => (
  <FileContextMenu {...args} />
)

export const Primary: Story<FileContextMenuProps> = Template.bind({})

Primary.args = {
  items: [
    {_type: 'ITEM', content: <>{'Preview'}</>},
    {_type: 'ITEM', content: <>{'Open'}</>},
    {_type: 'DIVIDER'},
    {_type: 'ITEM', content: <>{'Rename'}</>},
    {_type: 'DIVIDER'},
    {_type: 'ITEM', content: <>{'Show details'}</>},
    {_type: 'ITEM', content: <>{'Copy'}</>},
    {_type: 'ITEM', content: <>{'Download'}</>},
    {_type: 'DIVIDER'},
    {_type: 'ITEM', content: <>{'Delete'}</>}
  ]
}
