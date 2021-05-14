import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const { categories, createGame, getGameById, getCategories } = useContext(GameContext)

    const history = useHistory()
    const { gameId } = useParams()

    // const [categories, setCategories] = useState([])

    const [game, setGame] = useState({
        title: "",
        description: "",
        designer: "",
        yearReleased: 0,
        numberOfPlayers: 0,
        estPlayTime: 0,
        ageRec: 0,
        categories: []
    });

    const [isLoading, setIsLoading] = useState(true);

    const handleControlledInputChange = (event) => {
        const newGame = { ...game }
        newGame[event.target.id] = event.target.value
        setGame(newGame)
    }

    const handleCategoriesInput = (event) => {
        const newGame = { ...game }
        if (newGame.categories.includes(event.target.value)) {
            // remove the id
            newGame.categories = newGame.categories.filter(c => c !== event.target.value)
        } else {
            newGame.categories.push(event.target.value)
        }
        setGame(newGame)
        console.log(newGame.categories)
    }

    const handleSaveGame = () => {
        
        setIsLoading(true);
            
        createGame({
                title: game.title,
                description: game.description,
                designer: game.designer,
                yearReleased: game.yearReleased,
                numberOfPlayers: game.numberOfPlayers,
                estPlayTime: game.estPlayTime,
                ageRec: game.ageRec,
                categories: game.categories
            })
            .then(() => history.push("/games"))
    }

    useEffect(() => {
        getCategories()
        if (gameId) {
          getGameById(gameId)
          .then(game => {
              setGame({
                title: game.title,
                description: game.description,
                designer: game.designer,
                yearReleased: game.yearReleased,
                numberOfPlayers: game.numberOfPlayers,
                estPlayTime: game.estPlayTime,
                ageRec: game.ageRec,
                categories: game.categories})
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
      }
  }, [])

    return (
        <form className="gameForm">
            
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game title: </label>
                    <input type="text" id="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" id="designer" required autoFocus className="form-control"
                        value={game.designer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year released: </label>
                    <input type="text" id="yearReleased" required autoFocus className="form-control"
                        value={game.yearReleased}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input type="text" id="numberOfPlayers" required className="form-control"
                        value={game.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="estPlayTime">Estimated time to play in minutes: </label>
                    <input type="text" id="estPlayTime" required autoFocus className="form-control"
                        value={game.estPlayTime}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRec">Age recommendation: </label>
                    <input type="text" id="ageRec" required autoFocus className="form-control"
                        value={game.ageRec}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <h2>Categories</h2>
                        
                        {categories?.map(category => {
                            return (
                                
                                <fieldset>
                                <div className="form-group">
                                <div key={category.id}>
                                <input type="checkbox" id={category.label} 
                                    value={category.id}
                                    onChange={handleCategoriesInput}
                                />
                                <label htmlFor={category.label}>{category.label}</label>
                            </div>
                </div>
            </fieldset>
                        )})}    

            <button type="submit"
                disabled={isLoading}
                onClick={evt => {
                        // Prevent form from being submitted
                    evt.preventDefault()
                    handleSaveGame()
                    }}>
                    Add New Game</button>

        </form>
    )
}