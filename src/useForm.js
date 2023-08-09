import { useState } from "react"

export default function useForm(initialValue) {
	const [state, setState] = useState(initialValue)

	function handleChange(event) {
		setState({ ...state, [event.target.id]: event.target.value })
	}

	return [state, handleChange]
}
