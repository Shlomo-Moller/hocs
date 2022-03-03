import { useState, useEffect, useCallback } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import DS from './ds'

const getDisplayName = component => component.displayName || component.name || 'Component'

/**
 * @param {(props: { data }) => JSX.Element} Component 
 * @param {(dataSource, props) => Promise<json>} fetcher 
 * @param {string} passedPropName
 */
const withSubscription = (Component, fetcher, passedPropName = 'data') => {
	const WithSubscription = props => {

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

	hoistNonReactStatic(WithSubscription, Component)

	WithSubscription.displayName = `WithSubscription(${getDisplayName(Component)})`

	return WithSubscription
}

export default withSubscription
