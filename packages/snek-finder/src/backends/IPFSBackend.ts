import ipfsClient from 'ipfs-http-client'

import {Backend} from './backend'

export const ipfs = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

export class IPFSBackend extends Backend {
  public initBackendLink!: string
  public onBackendLinkChange!: (link: string) => void

  constructor(public indexKey: string = 'snek-finder-ipfs-backend') {
    super()
    this.indexKey = indexKey
  }

  async init() {
    const response = await (await fetch(this.initBackendLink)).json()

    await this.writeIndex(response)
    console.log(response)
  }

  async readIndex() {
    console.log('ri')
    if (window) {
      const getIndexData = () => {
        const indexData = window.localStorage.getItem(this.indexKey)

        return indexData && JSON.parse(indexData)
      }

      let indexData = getIndexData()

      if (!indexData) {
        await this.init()
        indexData = getIndexData()
      }

      return {data: indexData}
    } else {
      throw new Error(
        'window not defined, make sure to load this script in the browser'
      )
    }
  }

  async writeIndex(index: object) {
    console.log('wi')
    if (window) {
      // make a file from index including date in name
      const indexData = JSON.stringify(index)
      const indexFile = new File([indexData], `${Date.now()}.json`)
      const indexUrl = await this.upload(indexFile)

      console.log('writeIndex uplaod finished')
      this.onBackendLinkChange(indexUrl)

      window.localStorage.setItem(this.indexKey, indexData)
    } else {
      throw new Error(
        'window not defined, make sure to load this script in the browser'
      )
    }
  }

  async upload(file: File) {
    const {cid} = await ipfs.add({path: file.name, content: file.stream()})

    return `https://ipfs.io/ipfs/${cid.toString()}`
  }
}

const backend = new IPFSBackend('snek-finder-ipfs-backend-root')

export default backend
