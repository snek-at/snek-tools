/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {IconButton, useColorMode} from '@chakra-ui/react'
import {FaFileUpload} from '@react-icons/all-files/fa/FaFileUpload'
import React from 'react'
import {useDropzone} from 'react-dropzone'

export type UploadButtonProps = {
  onUpload(acceptedFiles: File[]): void
  accept?: string | string[]
}

const UploadButton: React.FC<UploadButtonProps> = ({onUpload, accept}) => {
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: onUpload,
    noDrag: true,
    accept
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <IconButton aria-label="" icon={<FaFileUpload />} />
    </div>
  )
}

export default UploadButton
