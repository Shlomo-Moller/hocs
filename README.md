# React [HOC](https://reactjs.org/docs/higher-order-components.html "Higher-Order Component")s - Hooks Version

React HOCs explained in the functional components way.

## Let's Go

* React HOCs are a pattern to abstract and share some logic accross many components.
* HOCs use containers as part of their implementation.
* You can think of HOCs as parameterized container component definitions.
* A React HOC is a pure function that... :
    * Takes a component.
    * Defines some functionality.
    * Returns one of the two:
        * A new component based on the given one, but with the additional functionality, **or**:
        * Another HOC.

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

Nice!

### Improve it

To control the name of the passed prop, we could do as follows:

**In `withSubscription`:**
```js
const withSubscription = (Component, fetcher, passedPropName = 'data') => props => {
	...
	return <Component {...{ [passedPropName]: data }} {...props} />
}
```

(Note the new `passedPropName` argument and the new way we pass `data` using `passedPropName`)

**In `UsersList.js`:**
```js
const UsersList = ({ users }) => {
  return (
    <ul>
      {users?.map(user => (
        ...
      ))}
    </ul>
  )
}

...

export default withSubscription(UsersList, usersFetcher, 'users')
```

(Note the `users` prop in place of `data` and the new `'users'` parameter)

**In `BlogPost.js`:**
```js
const BlogPost = ({ post }) => {
	...
}

export default withSubscription(BlogPost, postFetcher, 'post')
```

(Same story - `post` instead of `data` and an additional `'post'` parameter)

## Important Notes

* [**Don’t Mutate the Original Component. Use Composition**](https://reactjs.org/docs/higher-order-components.html#dont-mutate-the-original-component-use-composition).
* [**Convention: Pass Unrelated Props Through to the Wrapped Component**](https://reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component).
* [**Convention: Maximizing Composability**](https://reactjs.org/docs/higher-order-components.html#convention-maximizing-composability).
* [**Convention: Wrap the Display Name for Easy Debugging**](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging).
* [**Static Methods Must Be Copied Over**](https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over).
* [**Refs Aren’t Passed Through**](https://reactjs.org/docs/higher-order-components.html#refs-arent-passed-through).
That’s because `ref` is not really a prop — like `key`, it’s handled specially by React. If you add a `ref` to an element whose component is the result of a HOC, the `ref` refers to an instance of the **outermost** container component, not the wrapped component.
The solution for this problem is to use the
[`React.forwardRef` API](https://reactjs.org/docs/forwarding-refs.html).

### Updating `withSubscription` to Wrap the Display Name

```js
const getDisplayName = component => component.displayName || component.name || 'Component'

const withSubscription = (Component, fetcher, passedPropName = 'data') => {
	const WithSubscription = props => {
    ...
	}

	WithSubscription.displayName = `WithSubscription(${getDisplayName(Component)})`

	return WithSubscription
}
```

### Copying Static Methods

```js
...
import hoistNonReactStatic from 'hoist-non-react-statics'

const getDisplayName = ...

const withSubscription = (Component, fetcher, passedPropName = 'data') => {
	const WithSubscription = props => {
    ...
	}

	hoistNonReactStatic(WithSubscription, Component)

	...
}
```
