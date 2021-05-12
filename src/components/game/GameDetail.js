import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'

export const GameDetail = () => {
    const { getGameById } = useContext(GameContext)

    const [game, setGames] = useState({})

    const {gameId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getGameById(gameId)
        .then((response) => {
            setGames(response)
        })
    }, [])


    return (
        <section key={`game--${game.id}`} className="game">
            <h3 className="game__title">{game.name}</h3>
            <div className="game__category">{game.category}</div>
            <div className="game__designer">Created by {game.designer} in {game.year}</div>
            <div className="game__esttime">Estimated time: {game.est_time}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__agerec">Recommended for ages {game.age_rec}+</div>
        </section>
    )
}