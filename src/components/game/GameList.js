import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, Link } from 'react-router-dom'

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            
            <h1>Games</h1>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <h3 className="game__title">
                                <Link to={`/games/${game.id}`}>
                                    {game.name}
                                </Link>
                            </h3>
                          
                        </section>
                    })
                }
            </article>
        </>
    )
}