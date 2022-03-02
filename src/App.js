import UsersList from './components/UsersList'
import BlogPost from './components/BlogPost'

const POST_ID = 1

const App = () => {
  return (
    <div className='App'>
      <h1>React HOCs</h1>
      <button id='change-simulator'>Simulate DS change</button>
      <h2>UsersList</h2>
      <UsersList />
      <h2>BlogPost #{POST_ID}</h2>
      <BlogPost postId={POST_ID} />
    </div>
  )
}

export default App
