import { useState, useEffect, useCallback } from 'react'
import DS from '../ds'

/**
 * Independently subscribes to the data source
 */
const SubscribingUsersList = () => {

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
    <ul className='SubscribingUsersList'>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default SubscribingUsersList
