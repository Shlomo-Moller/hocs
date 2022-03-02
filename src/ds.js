const API = 'https://jsonplaceholder.typicode.com/'

const simulateChange = onChange => () => {
	alert('Data source was "changed" (not really)')
	onChange()
}

const DS = {
	getUsers: () => fetch(`${API}users`).then(res => res.json()),
	addChangeListener: onChange => document.getElementById('change-simulator').addEventListener('click', simulateChange(onChange)),
	removeChangeListener: onChange => document.getElementById('change-simulator').removeEventListener('click', simulateChange(onChange)),
}

export default DS
