/**
 * **Only** provides UI (doesn't subscribe to any data source)
 */
const SimpleBlogPost = ({ post }) => {
	
	return (
		<div className='SimpleBlogPost'>
			<h6>{post?.title}</h6>
			<pre>{post?.body}</pre>
		</div>
	)
}

export default SimpleBlogPost
