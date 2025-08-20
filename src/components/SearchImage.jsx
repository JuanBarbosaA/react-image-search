import { useRef } from "react"

export default function SearchImage({userSearch}){

    const searchRef = useRef("")

    const handleSubmit = (e) => {
        e.preventDefault()
        userSearch(searchRef.current.value)
    }

    return(
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input className="py-1 px-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-offset-blue-400 focus:placeholder:text-transparent" placeholder="Realiza tu busqueda" type="text" ref={searchRef}/>
                <button className="ml-6 py-2 px-3 bg-blue-300 hover:bg-blue-400 rounded-lg text-white font-semibold focus:outline-blue-400" type="submit">Buscar</button>
            </form>
        </div>
    )
}