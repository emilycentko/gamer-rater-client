import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ categories, setCategories ] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGameById = (id) => {
        return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        }})
            .then(res => res.json())
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", { 
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    return (
        <GameContext.Provider value={{ games, getGames, getGameById, createGame, categories, getCategories }} >
            { props.children }
        </GameContext.Provider>
    )
}