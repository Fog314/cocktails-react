import React, { useEffect, useState } from 'react'

interface DrinkItem {
    strDrink: string | null,
    strInstructions: string | null,
    strDrinkThumb: string | undefined
    ingredients: IngredientItem[]
}

interface IngredientItem {
    name: string | null,
    measure: string | null,
}

interface PropsItem {
    item: DrinkItem,
    className: string,
    togglePopup: () => void
}

function PopUp (props: PropsItem) {
    const onPopupClose = () => {
        props.togglePopup()
    }

    if (!props.item) {
        return null
    }

    const { strDrink, strInstructions, strDrinkThumb, ingredients } = props.item

    return (
        <div className={ `popup ${props.className}` }>
            <div className="popup__main">
                <div
                    className="popup__close"
                    onClick={ () => onPopupClose() }
                >
                    X
                </div>
                <div className="popup__title">
                    { strDrink }
                </div>
                <div className="popup__img-wrapper">
                    <img
                        className="popup__img"
                        src={ strDrinkThumb }
                    />
                </div>
                <div className="popup__ingredient-wrapper">
                    {
                        ingredients.map((item: IngredientItem) => {
                            return (
                                <div className="cocktail__ingredient" key={item.name} >
                                    <div className="cocktail__ingredient-name">
                                        { item.name }
                                    </div>
                                    <div className="cocktail__ingredient-value">
                                        { item.measure }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="popup__text">
                    { strInstructions }
                </div>
            </div>
        </div>
    )
}

export default PopUp
