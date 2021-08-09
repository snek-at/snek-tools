import {Meta, Story} from '@storybook/react'
import React from 'react'

import PdfViewer, {PdfViewerProps} from '.'

export default {
  title: 'Organisms/PdfViewer',
  component: PdfViewer
} as Meta

const Template: Story<PdfViewerProps> = args => (
  <PdfViewer style={{height: '95vh'}} {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  src:
    'https://cors.snek.at/https://github.com/snek-at/tonic/raw/1f92dae18012ef5472868c5ff0fd863afff8e495/slides/PP_21022020_SNEK.pdf'
}

export const WithToolbar = Template.bind({})

WithToolbar.args = {
  src:
    'https://cors.snek.at/https://github.com/snek-at/tonic/raw/1f92dae18012ef5472868c5ff0fd863afff8e495/slides/PP_21022020_SNEK.pdf',
  toolbar: true
}
