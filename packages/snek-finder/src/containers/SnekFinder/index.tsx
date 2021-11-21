import update from 'immutability-helper'
import {useEffect, useState} from 'react'

import {Backend} from '../../backends/backend'
import Finder from '../../components/organisms/Finder'
import type {
  FinderData,
  FinderFileItem,
  FinderFolderItem,
  FinderItem,
  FinderMode
} from '../../components/organisms/Finder/types'
import {SnekFinderAction} from '../../components/organisms/Finder/types'
import ImageViewer from '../../components/organisms/ImageViewer'
import PdfViewer from '../../components/organisms/PdfViewer'
import SnekStudio from '../../components/organisms/SnekStudio'

export type SnekFinderProps = {
  backend: Backend
  mode: FinderMode
  onSelectorClose?: () => void
  onSelectorSelect?: (item: FinderItem) => void
}

const initData: FinderData = {
  'ae4b3bf8-6ed2-4ac6-bf18-722321af298c': {
    name: 'SF',
    createdAt: '',
    modifiedAt: '',
    isFolder: true,
    childUUIDs: []
  }
}

const SnekFinder: React.FC<SnekFinderProps> = ({backend, ...props}) => {
  const [showModal, setShowModal] = useState<{
    type: 'IMAGE_VIEWER' | 'PDF_VIEWER' | 'SNEK_STUDIO'
    uuid: string
  } | null>(null)

  let [data, setData] = useState<FinderData>(initData)

  useEffect(() => {
    const fn = async () => {
      const {data} = await backend.readIndex()

      setData(data || initData)
    }

    fn()
  }, [])

  const handleDataChange = async (newData: any, action: SnekFinderAction) => {
    if (action.type === 'ADD') {
      const {uuid, file} = action.payload

      if (file) {
        const url = await backend.upload(file)

        newData[uuid] = update(newData[uuid], {
          src: {$set: url}
        })
      }
    }
    console.log('NEWDATA', newData)
    setData(newData)

    backend.writeIndex(newData)
  }

  const handleItemOpen = (uuid: string) => {
    const file = data[uuid]

    if (!(file as FinderFolderItem).isFolder) {
      const {mimeType} = file as FinderFileItem
      if (mimeType && mimeType.startsWith('image/')) {
        setShowModal({uuid, type: 'IMAGE_VIEWER'})
      } else if (mimeType && mimeType.startsWith('application/pdf')) {
        setShowModal({uuid, type: 'PDF_VIEWER'})
      }
    }
  }

  const file = showModal && (data[showModal.uuid] as FinderFileItem)

  return (
    <div>
      <Finder
        {...props}
        {...{
          rootUUID: 'ae4b3bf8-6ed2-4ac6-bf18-722321af298c',
          data: data as any,
          onDataChanged: handleDataChange,
          onItemOpen: handleItemOpen
        }}
      />
      {showModal && showModal.type === 'IMAGE_VIEWER' && file && (
        <ImageViewer
          src={file.src}
          onOpenStudio={() => setShowModal({...showModal, type: 'SNEK_STUDIO'})}
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal && showModal.type === 'PDF_VIEWER' && file && (
        <PdfViewer
          src={file.src}
          overlay
          toolbar
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal && showModal.type === 'SNEK_STUDIO' && file && (
        <SnekStudio
          src={file.src}
          onComplete={async (blob, dataURL) => {
            // convert dataUri to blob

            setData(update(data, {[showModal.uuid]: {src: {$set: dataURL}}}))

            // upload blob to backend
            if (blob) {
              const url = await backend.upload(new File([blob], file.name))

              const newData = update(data, {
                [showModal.uuid]: {src: {$set: url}}
              })

              setData(newData)

              backend.writeIndex(newData)
            }
          }}
          onClose={() => setShowModal({...showModal, type: 'IMAGE_VIEWER'})}
        />
      )}
    </div>
  )
}

export default SnekFinder
