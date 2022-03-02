# React [HOCs](https://reactjs.org/docs/higher-order-components.html "Higher-Order Components")

A React HOC is a... :

* Pattern.
* Function that takes a component and returns a new component.

Say you have a `UsersList` component that subscribes to an external data source to render a list of users:

```js
const UsersList = () => {

	const [users, setUsers] = useState([])

  const onChange = useCallback(() => {
    console.log('Fetching users...')
    DS.getUsers().then(data => {
      console.log('Got users! Updating state...')
      setUsers(data)
    })
  })

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
```
