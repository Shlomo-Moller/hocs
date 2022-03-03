import withSubscription from './../withSubscription'

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
