import UsersList from './components/UsersList'

const App = () => {
  return (
    <div className='App'>
      <h1>React HOCs</h1>
      <button id='change-simulator'>Simulate DS change</button>
      <UsersList />
    </div>
  )
}

export default App
