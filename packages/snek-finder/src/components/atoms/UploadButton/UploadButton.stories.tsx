import {Meta, Story} from '@storybook/react'
import React from 'react'

import UploadButton, {UploadButtonProps} from '.'

export default {
  title: 'Atoms/UploadButton',
  component: UploadButton
} as Meta

const Template: Story<UploadButtonProps> = args => <UploadButton {...args} />

export const Primary: Story<UploadButtonProps> = Template.bind({})

Primary.args = {}
