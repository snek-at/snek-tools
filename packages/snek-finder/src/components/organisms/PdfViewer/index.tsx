/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {AbsoluteCenter, Box, Portal} from '@chakra-ui/react'
import {SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/print/lib/styles/index.css'
import {MouseEvent} from 'react'

export type PdfViewerProps = {
  src: string
  overlay?: boolean
  toolbar?: boolean
  style?: React.CSSProperties
  onClose: () => void
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  src,
  style,
  onClose,
  overlay = false,
  toolbar = false
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      printPlugin: {
        enableShortcuts: false
      },
      zoomPlugin: {
        enableShortcuts: true
      }
    }
  })

  const viewer = (
    <Viewer
      fileUrl={src}
      initialPage={0}
      theme="dark"
      defaultScale={SpecialZoomLevel.PageWidth}
      // set plugins if toolbar is enabled
      plugins={toolbar ? [defaultLayoutPluginInstance] : []}
    />
  )

  const handleBackdrop = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return
    onClose()
  }

  return (
    <Portal appendToParentPortal={false}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
        {overlay ? (
          <Box
            h="100vh"
            w="100%"
            top="0"
            pos="absolute"
            onClick={handleBackdrop}
            bg="rgba(0,0,0,0.6)">
            <AbsoluteCenter h="100vh" w="50%">
              {viewer}
            </AbsoluteCenter>
          </Box>
        ) : (
          <Box h="100%" w="50%" margin="0 auto" style={style}>
            {viewer}
          </Box>
        )}
      </Worker>
    </Portal>
  )
}

export default PdfViewer
