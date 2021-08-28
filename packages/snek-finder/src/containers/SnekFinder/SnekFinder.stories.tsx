import {Meta, Story} from '@storybook/react'
import React from 'react'

import SnekFinder, {SnekFinderProps} from '.'
import IPFSBackend from '../../backends/IPFSBackend'

export default {
  title: 'Applications/SnekFinder',
  component: SnekFinder
} as Meta

const Template: Story<SnekFinderProps> = args => <SnekFinder {...args} />

export const Primary: Story<SnekFinderProps> = Template.bind({})

IPFSBackend.onBackendLinkChange = (link: string) => {
  console.log(link)
}

IPFSBackend.initBackendLink =
  'https://ipfs.io/ipfs/QmSw2QEGRx9PzBXsxt5HoKiong1hkWYN8pNwLKqwNPgaiR'

Primary.args = {backend: IPFSBackend}

export const Selector: Story<SnekFinderProps> = Template.bind({})

Selector.args = {
  backend: IPFSBackend,
  mode: 'selector',
  onSelectorSelect: item => console.log(item),
  onSelectorClose: () => null
}
