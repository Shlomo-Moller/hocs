import SubscribingUsersList from './components/SubscribingUsersList'
import SubscribingBlogPost from './components/SubscribingBlogPost'
import UsersList from './components/UsersList'
import BlogPost from './components/BlogPost'

const POST_ID = 1

const App = () => {
  return (
    <div className='App'>
      <h1>React HOCs</h1>

      <h2>Data Source "Change" Simulation</h2>

      <button id='change-simulator'>Simulate DS change</button>
      <br />
      This button serves as a raiser of an event that represents a "change" on the data source.
      <br />
      To better understand what's going on, inspect the code of the different components and while clicking this button, the console window.

      <h2>The Different Versions of Our Components</h2>
      
      <h3>Subscribing components version</h3>
      <h4><code>SubscribingUsersList</code></h4>
      <SubscribingUsersList />
      <h4><code>SubscribingBlogPost</code> #{POST_ID}</h4>
      <SubscribingBlogPost postId={POST_ID} />

      <h3>Wrapped by HOC Version</h3>
      <h4><code>UsersList</code></h4>
      <UsersList />
      <h4><code>BlogPost</code> #{POST_ID}</h4>
      <BlogPost postId={POST_ID} />
    </div>
  )
}

export default App
