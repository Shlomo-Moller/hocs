import withSubscription from './../withSubscription'

const BlogPost = ({ data }) => {
	return (
		<div className='BlogPost'>
			<h6>{data?.title}</h6>
			<pre>{data?.body}</pre>
		</div>
	)
}

const postFetcher = (DS, { postId }) => DS.getPost(postId)

export default withSubscription(BlogPost, postFetcher)
