import update from 'immutability-helper'
import {useEffect, useState} from 'react'

import {Backend} from '../../backends/backend'
import Finder from '../../components/organisms/Finder'
import type {
  FinderData,
  FinderFileItem,
  FinderFolderItem
} from '../../components/organisms/Finder/types'
import {SnekFinderAction} from '../../components/organisms/Finder/types'
import ImageViewer from '../../components/organisms/ImageViewer'
import PdfViewer from '../../components/organisms/PdfViewer'
import SnekStudio from '../../components/organisms/SnekStudio'

export type SnekFinderProps = {
  backend: Backend
}

const initData: FinderData = {
  'ae4b3bf8-6ed2-4ac6-bf18-722321af298c': {
    name: 'Snek Root Folder',
    createdAt: '',
    modifiedAt: '',
    isFolder: true,
    childUUIDs: []
  }
}

const SnekFinder: React.FC<SnekFinderProps> = ({backend, ...props}) => {
  const [imageViewer, setImageViewer] = useState<string | null>()
  const [pdfViewer, setPdfViewer] = useState<string | null>()
  const [snekStudio, setSnekStudio] = useState<string | null>()

  const [showModal, setShowModal] = useState<{
    type: 'IMAGE_VIEWER' | 'PDF_VIEWER' | 'SNEK_STUDIO'
    uuid: string
  } | null>(null)

  let [data, setData] = useState<FinderData>(initData)

  useEffect(() => {
    const fn = async () => {
      const {data} = await backend.readIndex()

      console.log('data', data)

      setData(data || initData)
    }

    fn()
  }, [])

  const handleDataChange = async (newData: any, action: SnekFinderAction) => {
    console.log('start uplaoding')
    setData(newData)

    if (action.type === 'ADD') {
      const {uuid, file} = action.payload

      if (file) {
        const url = await backend.upload(file)

        newData[uuid] = update(newData[uuid], {
          src: {$set: url}
        })
      }
    }
    console.log('handleDataChange updateData start', newData)
    backend.writeIndex(newData)
  }

  const handleItemOpen = (uuid: string) => {
    const file = data[uuid]

    if (!(file as FinderFolderItem).isFolder) {
      const {mimeType} = file as FinderFileItem
      if (mimeType?.startsWith('image/')) {
        setImageViewer(uuid)
      } else if (mimeType?.startsWith('application/pdf')) {
        setPdfViewer(uuid)
      }
    }
  }
  console.log('ada', data, imageViewer)

  const file = showModal && (data[showModal.uuid] as FinderFileItem)
  return (
    <div>
      <Finder
        {...{
          rootUUID: 'ae4b3bf8-6ed2-4ac6-bf18-722321af298c',
          data: data as any,
          onDataChanged: handleDataChange,
          onItemOpen: handleItemOpen
        }}
      />
      {showModal?.type === 'IMAGE_VIEWER' && file && (
        <ImageViewer
          src={file.src}
          onOpenStudio={() => setShowModal({...showModal, type: 'SNEK_STUDIO'})}
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal?.type === 'PDF_VIEWER' && file && (
        <PdfViewer
          src={file.src}
          overlay
          toolbar
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal?.type === 'SNEK_STUDIO' && file && (
        <SnekStudio
          src={file.src}
          onComplete={src => {
            const newData = update(data, {[showModal.uuid]: {src: {$set: src}}})

            setData(newData)
            backend.writeIndex(newData)
          }}
          onClose={() => setShowModal({...showModal, type: 'IMAGE_VIEWER'})}
        />
      )}
    </div>
  )
}

export default SnekFinder
