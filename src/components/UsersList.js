import withSubscription from './../withSubscription'

const UsersList = ({ users }) => {
  return (
    <ul className='UsersList'>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

const usersFetcher = DS => DS.getUsers()

export default withSubscription(UsersList, usersFetcher, 'users')
