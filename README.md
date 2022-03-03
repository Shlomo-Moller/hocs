# React [HOC](https://reactjs.org/docs/higher-order-components.html "Higher-Order Component")s - Hooks Version

React HOCs explained in the functional components way.

## Let's Go

A React HOC is a... :

* Pattern.
* Function that takes a component and returns a new component.

### Scenario-Based Explanation

Say you have many different components that use the same pattern to subscribe to an external data source to render the fetched data, e.g.:

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

...

So, let's use a HOC to abstract this fetch and subscription logic and share it across many components, like simpler versions of the above.

Our HOC will... :

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

Now let's make new simple versions of our components, that **don't** manage any subscriptions, and only provide UI.
We'll expose the new subscribing version of them using `withSubscription`:

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
