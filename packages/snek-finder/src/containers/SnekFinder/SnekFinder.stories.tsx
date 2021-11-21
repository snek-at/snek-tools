import {Meta, Story} from '@storybook/react'
import React from 'react'

import SnekFinder, {SnekFinderProps} from '.'
import IPFSBackend from '../../backends/IPFSBackend'
import OSGBackend from '../../backends/OSGBackend'

export default {
  title: 'Applications/SnekFinder',
  component: SnekFinder
} as Meta

const Template: Story<SnekFinderProps> = args => <SnekFinder {...args} />

export const IPFS: Story<SnekFinderProps> = Template.bind({})

IPFSBackend.onBackendLinkChange = (link: string) => {
  console.log(link)
}

IPFSBackend.initBackendLink =
  'https://cloudflare-ipfs.com/ipfs/QmSw2QEGRx9PzBXsxt5HoKiong1hkWYN8pNwLKqwNPgaiR'

IPFS.args = {backend: IPFSBackend}

export const IPFSSelector: Story<SnekFinderProps> = Template.bind({})

IPFSSelector.args = {
  backend: IPFSBackend,
  mode: 'selector',
  onSelectorSelect: item => console.log(item),
  onSelectorClose: () => console.log('close')
}

export const OpenStorage: Story<SnekFinderProps> = Template.bind({})

OSGBackend.onBackendLinkChange = (link: string) => {
  console.log(link)
}

OpenStorage.args = {backend: OSGBackend, mode: 'browser'}

export const OpenStorageSelector: Story<SnekFinderProps> = Template.bind({})

OpenStorageSelector.args = {
  backend: OSGBackend,
  mode: 'selector',
  onSelectorSelect: item => console.log(item),
  onSelectorClose: () => console.log('close')
}
