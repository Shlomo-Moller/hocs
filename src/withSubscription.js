import { useState, useEffect, useCallback } from 'react'
import DS from './ds'

/**
 * @param {(props: { data }) => JSX.Element} Component 
 * @param {(dataSource, props) => Promise<json>} fetcher 
 * @param {string} passedPropName
 */
const withSubscription = (Component, fetcher, passedPropName = 'data') => props => {

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

	return <Component {...{ [passedPropName]: data }} {...props} />
}

export default withSubscription
