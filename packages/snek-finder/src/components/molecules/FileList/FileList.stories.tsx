import {FaFileExcel} from '@react-icons/all-files/fa/FaFileExcel'
import {FaFolder} from '@react-icons/all-files/fa/FaFolder'
import {Meta, Story} from '@storybook/react'
import React from 'react'

import FileList, {FileListProps} from '.'

export default {
  title: 'Molecules/FileList',
  component: FileList
} as Meta

const Template: Story<FileListProps> = args => <FileList {...args} />

export const Primary: Story<FileListProps> = Template.bind({})

Primary.args = {
  items: [
    {
      prefix: <FaFolder />,
      name: 'Folder',
      modifiedAt: '20.10.2001',
      fileSize: '1 KB',
      isFolder: true
    },
    {
      prefix: <FaFileExcel />,
      name: 'Test file',
      modifiedAt: '20.10.2001',
      fileSize: '1 KB'
    },
    {
      prefix: <FaFileExcel />,
      name: 'Test file2',
      modifiedAt: '20.10.2001',
      fileSize: '1 KB'
    }
  ]
}
