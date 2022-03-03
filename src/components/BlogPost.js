import { useState, useEffect, useCallback } from 'react'
import DS from '../ds'

const BlogPost = ({ postId }) => {

	const [post, setPost] = useState(null)

	const onChange = useCallback(() => {
    console.log('Fetching post...')
    DS.getPost(postId).then(data => {
      console.log('Got post! Updating state...')
      setPost(data)
    })
  })

	useEffect(() => {
    onChange()
		DS.addChangeListener(onChange)
		return () => DS.removeChangeListener(onChange)
	}, [])

	return (
		<div className='BlogPost'>
			<h6>{post?.title}</h6>
			<pre>{post?.body}</pre>
		</div>
	)
}

export default BlogPost