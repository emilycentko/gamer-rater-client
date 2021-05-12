import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [ categories, setCategories ] = useState([])
    const [ gamecategories, setGameCategories ] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const getGameCategories = () => {
        return fetch("http://localhost:8000/gamecategories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGameCategories)
    }

    return (
        <CategoryContext.Provider value={{ categories, getCategories, getGameCategories }} >
            { props.children }
        </CategoryContext.Provider>
    )
}