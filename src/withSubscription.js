import { useState, useEffect, useCallback } from 'react'
import DS from './ds'

/**
 * @param {(props: { data }) => JSX.Element} Component 
 * @param {(dataSource, props) => Promise<json>} fetcher 
 */
const withSubscription = (Component, fetcher) => props => {

	const [data, setData] = useState(null)

	const onChange = useCallback(() => {
		console.log('Fetching data...')
		fetcher(DS, props).then(json => {
			console.log('Got data! Updating state...')
			setData(json)
		})
	})

	useEffect(() => {
    onChange()
		DS.addChangeListener(onChange)
		return () => DS.removeChangeListener(onChange)
	}, [])

	return <Component data={data} {...props} />
}

export default withSubscription
