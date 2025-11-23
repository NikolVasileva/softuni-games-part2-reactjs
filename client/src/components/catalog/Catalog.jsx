import { useEffect, useState } from "react"
import GameCard from "../game-card/GameCard.jsx"

export default function Catalog() {

    const[games, setGames] = useState([])

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/games")
        .then(response => response.json())
        .then(data => {
            setGames(Object.values(data))
        }) 
        .catch(err => alert(err.message))
    }, [])

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
                {games.length === 0 && <h3 className="no-articles">No Added Games Yet</h3>}

                {games.map(game => <GameCard key={game._id} {...game} />)}
            </div>
        </section>
    )
}