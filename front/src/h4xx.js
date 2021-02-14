window.darn = (o) => console.log (o)

window.$_JSON = {

	to: o => typeof o == 'object' ? JSON.stringify (o) : o,
	
	from: s => {
	
		try {
			return JSON.parse (s)
		}
		catch (x) {
			return s
		}
	
	}

}

function wrap (storage) {

	let get = (k) => $_JSON.from (storage.getItem (k))

	return {

		get,
		
		set: (k, v) => v == null ? storage.removeItem (k) : storage.setItem (k, $_JSON.to (v)),
		
		del: (k) => {
		
			let v = get (k)
			
			storage.removeItem (k)
			
			return v
		
		}

	}

}

window.$_LOCAL   = wrap (localStorage)
window.$_SESSION = wrap (sessionStorage)

window.response = async function (tia = {}, data = {}) {

	let url = '/_back/?'; for (let k of ['type', 'id', 'action', 'part']) if (k in tia) url += '&' +  k + '=' + tia [k]
	
	const mime = 'application/json', headers = {Accept: mime, 'Content-Type': mime}, options = {method: 'POST', credentials: 'same-origin', headers}

	try {	
	
		let rp = await 
//		Promise.race ([
			fetch (url, {body: JSON.stringify (data), ...options})
//			,new Promise ((ok, fail) => setTimeout (fail (new Error ({type: 'timeout'})), 10000))
//		])
//darn (rp)		
		if (!rp.ok) throw new Error ({type: 'http error', rp})
		
		let json = await rp.json ()
//darn (json)		
		if (!json.success) throw new Error ({type: 'application error', json})
		
		return json.content
	
	}
	catch (x) {

		throw x

	} 
	
}