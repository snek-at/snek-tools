export abstract class Backend {
  public initBackendLink?: string
  public onBackendLinkChange!: (link: string) => void

  public abstract indexKey: string

  abstract upload(file: File): Promise<any>

  async init() {
    if (this.initBackendLink) {
      const response = await (await fetch(this.initBackendLink)).json()

      await this.writeIndex(response)
    }
  }

  async readIndex() {
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
    if (window) {
      // make a file from index including date in name
      const indexData = JSON.stringify(index)
      const indexFile = new File([indexData], `${Date.now()}.json`)
      const indexUrl = await this.upload(indexFile)

      this.onBackendLinkChange(indexUrl)

      window.localStorage.setItem(this.indexKey, indexData)
    } else {
      throw new Error(
        'window not defined, make sure to load this script in the browser'
      )
    }
  }
}
