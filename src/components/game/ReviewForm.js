import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings'


export const ReviewForm = () => {
    const { reviews, getReviews } = useContext(GameContext)

    const history = useHistory()
    const { gameId } = useParams()

    const [review, setReview] = useState({
        review: "",
        rating: 0,
        gameId: 0,
        playerId: 0
    })

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <form className="reviewForm">
            
            <h2 className="reviewForm__title">Revuew Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Review </label>
                    <input type="text" id="review" required autoFocus className="form-control"
                        value={review.review}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <StarRatings
                    rating={review.rating}
                    starRatedColor="blue"
                    changeRating={handleControlledInputChange}
                    numberOfStars={10}
                    name='rating'
                    />
            </fieldset>
        </form>
    )
}