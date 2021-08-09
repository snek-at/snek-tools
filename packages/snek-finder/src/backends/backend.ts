export abstract class Backend {
  abstract readIndex(): Promise<any>
  abstract writeIndex(index: object): Promise<void>
  abstract upload(file: File): Promise<any>
}
