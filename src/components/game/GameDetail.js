import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { CategoryContext } from "../category/CategoryProvider.js"

export const GameDetail = () => {
    const { getGameById } = useContext(GameContext)
    const { getCategories, getGameCategories } = useContext(CategoryContext)

    const [game, setGames] = useState({})

    const {gameId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getCategories()
        .then(getGameCategories())
        .then(getGameById(gameId))
        .then(game => {
            setGames({
                id: game.id,
                title: game.title,
                description: game.description,
                designer: game.designer,
                yearReleased: game.year_released,
                numberOfPlayers: game.number_of_players,
                estPlayTime: game.est_play_time,
                ageRec: game.age_rec

            })
        })
    }, [])


    return (
        <section key={`game--${game.id}`} className="game">
            <h3 className="game__title">{game.title}</h3>
            {/* <div className="game__category">{game?.category}</div> */}
            <div className="game__designer">Created by {game.designer} in {game.yearReleased}</div>
            <div className="game__esttime">Estimated time: {game.estPlayTime} minutes</div>
            <div className="game__players">{game.numberOfPlayers} players needed</div>
            <div className="game__agerec">Recommended for ages {game.ageRec}+</div>
        </section>
    )
}