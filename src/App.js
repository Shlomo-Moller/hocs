import SubscribingUsersList from './components/SubscribingUsersList'
import SubscribingBlogPost from './components/SubscribingBlogPost'
import SimpleUsersList from './components/SimpleUsersList'
import SimpleBlogPost from './components/SimpleBlogPost'

const POST_ID = 1

const App = () => {
  return (
    <div className='App'>
      <h1>React HOCs</h1>
      <button id='change-simulator'>Simulate DS change</button>
      <h2>SubscribingUsersList</h2>
      <SubscribingUsersList />
      <h2>SubscribingBlogPost #{POST_ID}</h2>
      <SubscribingBlogPost postId={POST_ID} />
      <h2>SimpleUsersList</h2>
      <SimpleUsersList />
      <h2>SimpleBlogPost</h2>
      <SimpleBlogPost />
    </div>
  )
}

export default App
