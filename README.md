# React [HOCs](https://reactjs.org/docs/higher-order-components.html "Higher-Order Components")

A React HOC is a... :

* Pattern.
* Function that takes a component and returns a new component.

Say you have a `UsersList` component that subscribes to an external data source to render a list of users:

```js
const UsersList = () => {

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
const BlogPost = ({ postId }) => {

  const [post, setPost] = useState(null)

  const onChange = useCallback(() => DS.getPost(postId).then(data => setPost(data)))

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
```

You can imagine that in a large app, this same pattern of subscribing to `DS` and calling `setState` will occur over and over again.

Let's use a HOC to abstract this logic and share it across many components.

It'll... :

* Accept as one of its arguments a child component, like `UsersList` and `BlogPost`.
* Create a new component that... :
    * Wrapps the given component.
    * Subscribes to `DS`
    * Passes subscribed data as a prop to the given component.

But first, let's prepare new simple versions of `UsersList` and `BlogPost`, that don't manage any subscriptions, and nly provide UI:

```js
const SimpleUsersList = ({ users }) => {
  return (
    <ul className='SimpleUsersList'>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

const SimpleBlogPost = ({ post }) => {
	return (
		<div className='SimpleBlogPost'>
			<h6>{post?.title}</h6>
			<pre>{post?.body}</pre>
		</div>
	)
}
```
