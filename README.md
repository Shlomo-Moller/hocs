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
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  )
}
```
