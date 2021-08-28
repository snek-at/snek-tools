import {Meta, Story} from '@storybook/react'
import React from 'react'

import SnekFinder, {SnekFinderProps} from '.'

export default {
  title: 'Organisms/Finder',
  component: SnekFinder,
  parameters: {actions: {argTypesRegex: '^on.*'}}
} as Meta

const Template: Story<SnekFinderProps> = args => <SnekFinder {...args} />

export const Primary: Story<SnekFinderProps> = Template.bind({})

Primary.args = {
  rootUUID: 'ae4b3bf8-6ed2-4ac6-bf18-722321af298c',
  data: {
    'ae4b3bf8-6ed2-4ac6-bf18-722321af298c': {
      name: 'Snek Root Folder',
      createdAt: '',
      modifiedAt: '',
      isFolder: true,
      childUUIDs: [
        'a3217d3d-2dbb-4164-9833-27fadb07b2a6',
        '621ea705-be84-49e1-8abd-919c46bb5750',
        '55f207c7-6350-4496-ab0a-0397cc294b6a'
      ]
    },
    '55f207c7-6350-4496-ab0a-0397cc294b6a': {
      name: 'Folder 2',
      createdAt: '',
      modifiedAt: '',
      isFolder: true,
      childUUIDs: []
    },
    'a3217d3d-2dbb-4164-9833-27fadb07b2a6': {
      name: 'PDF 1',
      createdAt: '',
      modifiedAt: '',
      src:
        'https://cors.snek.at/https://github.com/snek-at/tonic/raw/1f92dae18012ef5472868c5ff0fd863afff8e495/slides/PP_21022020_SNEK.pdf',
      previewSrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png',
      mimeType: 'application/pdf',
      size: 'string'
    },
    '621ea705-be84-49e1-8abd-919c46bb5750': {
      name: 'Image 1',
      createdAt: '',
      modifiedAt: '',
      src:
        'https://cors.snek.at/https://github.com/snek-at/tonic/raw/1f92dae18012ef5472868c5ff0fd863afff8e495/slides/PP_21022020_SNEK.pdf',
      mimeType: 'image/png',
      size: 'string'
    },
    'f0d3a81b-2c93-44b7-ada8-86fad9489e80': {
      name: 'Image 2',
      createdAt: '',
      modifiedAt: '',
      src:
        'https://topsexymodels.net/wp-content/uploads/2020/04/_92444178_518742988810667_5403639706982625195_n-820x1024.jpg',
      mimeType: 'image/png',
      size: 'string'
    }
  },
  onDataChanged: (data, action) => console.log(data, action),
  onItemOpen: () => null
}

export const Selector: Story<SnekFinderProps> = Primary.bind({})

Selector.args = {
  ...Primary.args,
  mode: 'selector',
  onSelectorSelect: item => console.log(item),
  onSelectorClose: () => null
}
