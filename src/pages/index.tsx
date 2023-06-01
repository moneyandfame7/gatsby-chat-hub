import React, { type FC } from 'react'

import { PageProps } from 'gatsby'

import { Flex } from '@chakra-ui/react'
import { Variants } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { pageHead } from '@components/page-head'

const TEST: Variants = {
	hidden: {
		x: '-50%',
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
	open: {
		x: 0,
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
}

const images = [
	'https://plus.unsplash.com/premium_photo-1674713054504-4a6e71d26d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1685123466319-d7d8bae569d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://plus.unsplash.com/premium_photo-1672352719913-790c9f9276eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1685118141935-3f9f2db4de26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1684994091725-a84642db7c37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
]
// function InnerDropzone({ isDragged }: { isDragged: boolean }) {
// 	const { getRootProps, isDragAccept } = useDropzone()
// 	return (
// 		<Box
// 			opacity={isDragged || isDragAccept ? 1 : 0}
// 			{...getRootProps()}
// 			border='2px solid green'
// 			w='80%'
// 			h='80%'
// 			mx='auto'
// 			bg={isDragAccept ? 'blue' : 'transparent'}
// 		>
// 			<Text>Inner dropzone</Text>
// 		</Box>
// 	)
// }

// const OuterDropzone: React.FC = () => {
// 	const { getRootProps, isDragAccept } = useDropzone({
// 		// Note how this callback is never invoked if drop occurs on the inner dropzone
// 		onDrop: (files) => console.log(files),
// 	})

// 	return (
// 		<Box h='300px' w='300px' className='container' border={`3px solid ${isDragAccept ? 'blue' : 'red'}`}>
// 			{/* all chat here end... */}
// 			<Box {...getRootProps({ className: 'dropzone' })} h='100%' w='100%'>
// 				<InnerDropzone isDragged={isDragAccept} />
// 			</Box>
// 		</Box>
// 	)
// }

// const [drag, setDrag] = useState(false)

// const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
// 	e.preventDefault()
// 	setDrag(true)
// }

// const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
// 	e.preventDefault()
// 	setDrag(false)
// }
const Root: FC<PageProps> = ({ location }) => {
	return (
		<Flex flexWrap='wrap' alignItems='start' minH='100vh' gap={5}>
			{images.map((img) => (
				<img key={img} loading='lazy' src={img} width={300} alt={'Beatiful weather'} />
			))}
		</Flex>
	)
}

export default observer(Root)

export const Head = pageHead({ title: 'Home' })
