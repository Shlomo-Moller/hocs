/**
 * **Only** provides UI (doesn't subscribe to any data source)
 */
const SimpleUsersList = ({ users }) => {
  return (
    <ul className='SimpleUsersList'>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default SimpleUsersList
