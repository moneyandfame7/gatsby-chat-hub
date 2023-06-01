import { useCallback } from 'react'

import { useDropzone as useReactDropzone } from 'react-dropzone'

export const useDropzone = () => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log(acceptedFiles)
	}, [])
	const { isFocused } = useReactDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
	})
}
