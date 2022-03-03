import withSubscription from './../withSubscription'

const BlogPost = ({ post }) => {
	return (
		<div className='BlogPost'>
			<h6>{post?.title}</h6>
			<pre>{post?.body}</pre>
		</div>
	)
}

const postFetcher = (DS, { postId }) => DS.getPost(postId)

export default withSubscription(BlogPost, postFetcher, 'post')
