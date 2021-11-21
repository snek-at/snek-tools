import {Backend} from './backend'

export class OSGBackend extends Backend {
  constructor(public indexKey: string = 'snek-finder-osg-backend') {
    super()
    this.indexKey = indexKey
  }

  async upload(file: File) {
    const url = 'https://osg.snek.at/storage'

    const formData = new FormData()
    formData.append('file', file)

    const resp = await fetch(url, {
      body: formData,
      method: 'POST'
    })

    const json = await resp.json()

    return `${url}/${json.file_id}`
  }
}

export default new OSGBackend('snek-finder-osg-backend-root')
