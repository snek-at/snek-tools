import FilerobotImageEditor from 'filerobot-image-editor'
import 'tui-image-editor/dist/tui-image-editor.css'

export type SnekStudioProps = {
  src: string
  /**
   * Called when the editor should be closed with saving the editing state
   */
  onComplete(file: Blob | null, dataURL: string): void
  /**
   * Called when the editor should be closed without saving the editing state
   */
  onClose(): void
}

const SnekStudio: React.FC<SnekStudioProps> = props => {
  return (
    <FilerobotImageEditor
      config={{
        translations: {en: {'header.image_editor_title': 'Snek Studio'}},
        language: 'en',
        finishButtonLabel: 'Save',
        tools: [
          'adjust',
          'effects',
          'filters',
          'rotate',
          'crop',
          'resize',
          'watermark',
          'shapes',
          'image',
          'text',
          'focus_point'
        ],
        replaceCloseWithBackButton: true
      }}
      show={true}
      src={props.src}
      onClose={props.onClose}
      onComplete={({canvas}: {canvas: HTMLCanvasElement}) => {
        canvas.toBlob(blob => {
          props.onComplete(blob, canvas.toDataURL('image/png'))
        })
      }}
      onBeforeComplete={() => false}
    />
  )
}

export default SnekStudio
