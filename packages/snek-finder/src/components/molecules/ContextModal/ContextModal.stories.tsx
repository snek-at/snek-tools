import {Meta, Story} from '@storybook/react'
import React from 'react'

import ContextModal, {ContextModalProps} from '.'

export default {
  title: 'Molecules/ContextModal',
  component: ContextModal
} as Meta

const Template: Story<ContextModalProps> = args => <ContextModal {...args} />

export const CreateFolder: Story<ContextModalProps> = Template.bind({})

CreateFolder.args = {
  isOpen: true,
  title: 'Create folder',
  inputPlaceholder: 'Your folder name'
}
