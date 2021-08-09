import {Meta, Story} from '@storybook/react'
import React from 'react'

import FileInfoBox, {FileInfoBoxProps} from '.'

export default {
  title: 'Molecules/FileInfoBox',
  component: FileInfoBox
} as Meta

const Template: Story<FileInfoBoxProps> = args => <FileInfoBox {...args} />

export const Primary: Story<FileInfoBoxProps> = Template.bind({})

Primary.args = {
  onUpdate: details => null,
  previewImageSrc:
    'https://topsexymodels.net/wp-content/uploads/2020/04/_92444178_518742988810667_5403639706982625195_n-820x1024.jpg',
  details: {
    fileName: 'Emilia Clarke',
    fileType: 'jpg',
    fileSize: '200 KB',
    createdAt: '20.10.2021',
    modifiedAt: '21.10.2021',
    description:
      '58 Sexy and Hot of Emilia Clarke Pictures – Bikini, Ass, Boobs - Top Sexy Models'
  }
}
