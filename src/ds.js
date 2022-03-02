const API = 'https://jsonplaceholder.typicode.com/'

const getChangeButton = () => document.getElementById('change-simulator')

const simulateChange = onChange => () => {
	alert('Data source was "changed" (not really)')
	onChange()
}

const DS = {
	getUsers: () => fetch(`${API}users`).then(res => res.json()),
	getPost: postId => fetch(`${API}posts/${postId}`).then(res => res.json()),
	addChangeListener: onChange => getChangeButton().addEventListener('click', simulateChange(onChange)),
	removeChangeListener: onChange => getChangeButton().removeEventListener('click', simulateChange(onChange)),
}

export default DS
