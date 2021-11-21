import ipfsClient from 'ipfs-http-client'

import {Backend} from './backend'

export const ipfs = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

export class IPFSBackend extends Backend {
  constructor(public indexKey: string = 'snek-finder-ipfs-backend') {
    super()
    this.indexKey = indexKey
  }

  async upload(file: File) {
    const {cid} = await ipfs.add({path: file.name, content: file.stream()})

    return `https://cloudflare-ipfs.com/ipfs/${cid.toString()}`
  }
}

export default new IPFSBackend('snek-finder-ipfs-backend-root')
