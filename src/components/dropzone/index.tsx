import React, { useCallback } from 'react'

import { Box } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

export const Dropzone: React.FC = () => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log({ acceptedFiles })
	}, [])
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ onDrop, noClick: true })

	return (
		<Box
			{...getRootProps()}
			bg={isDragAccept ? 'blackAlpha.400' : 'blackAlpha.600'}
			// w='100vw'
			// h='100vh'
			// pos='absolute'
			// zIndex={-1}
			zIndex={0}
			onPaste={(e) => {
				e.preventDefault()
				console.log(e.clipboardData.files[0])
			}}>
			<input {...getInputProps()} />
			<p>Drag 'n' drop some files here, or click to select files</p>
		</Box>
	)
}
