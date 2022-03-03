# React [HOC](https://reactjs.org/docs/higher-order-components.html "Higher-Order Component")s - Hooks Version

## Intro

React HOCs explained in the functional components way.

## Let's Go

A React HOC is a... :

* Pattern.
* Function that takes a component and returns a new component.

Say you have a `SubscribingUsersList` component that subscribes to an external data source to render a list of users:

```js
const SubscribingUsersList = () => {

  const [users, setUsers] = useState([])

  const onChange = useCallback(() => DS.getUsers().then(data => setUsers(data)))

  useEffect(() => {
    onChange()
    DS.addChangeListener(onChange)
    return () => DS.removeChangeListener(onChange)
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

Later, you write a component for subscribing to a single blog post, which follows a similar pattern:

```js
const SubscribingBlogPost = ({ postId }) => {

  const [post, setPost] = useState(null)

  const onChange = useCallback(() => DS.getPost(postId).then(data => setPost(data)))

  useEffect(/* Same effect... */)

  return (
    <div>
      <h6>{post?.title}</h6>
      <pre>{post?.body}</pre>
    </div>
  )
}
```

You can imagine that in a large app, this same pattern of subscribing to `DS` and calling `setState` will occur over and over again.

Let's use a HOC to abstract this logic and share it across many components, like simpler versions of the above components.

It'll... :

* Accept as one of its arguments a child component.
* Create a new component that... :
    * Wrapps the given component.
    * Subscribes to `DS`.
    * Passes subscribed data as a prop to the given component.

```js
const withSubscription = (Component, fetcher) => props => {

	const [data, setData] = useState(null)

	const onChange = useCallback(() => fetcher(DS, props).then(json => setData(json))

	useEffect(/* Same effect... */)

	return <Component data={data} {...props} />
}
```

Now let's make new simple versions of our components, that **don't** manage any subscriptions, and only provide UI:

**Inside `UsersList.js`:**
```js
const UsersList = ({ data }) => {
  return (
    <ul className='UsersList'>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

const usersFetcher = DS => DS.getUsers()

export default withSubscription(UsersList, usersFetcher)
```

**Inside `BlogPost.js`:**
```js
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
```
