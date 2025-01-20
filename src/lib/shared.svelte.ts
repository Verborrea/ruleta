export const user = $state({
	datos: {
		name: '',
		mail: '',
		phone: '',
		instagram: '',
		premio: '',
	},
	initialize() {
		if (window.localStorage) {
			const ls_user = window.localStorage.getItem('user') || ''
			if (ls_user !== '') {
				this.datos = JSON.parse(ls_user).datos
			}
		}
	}
})
