import React from 'react'

interface DrinkItem {
    strDrink: string | null,
    strInstructions: string | null,
    strDrinkThumb: string | undefined
    ingredients: IngredientItem[] | null
}

interface IngredientItem {
    name: string | null,
    measure: string | null,
}

interface PropsItem {
    item: DrinkItem,
    className: string,
    opened: boolean,
    togglePopup: () => void
}

function PopUp (props: PropsItem) {
    const filteredIngr = (drink: DrinkItem) => {
        const ingredient: IngredientItem[] = []
        let index = 0

        for (let [key, value] of Object.entries(drink)) {
            if (key.includes('strIngredient') && value) {
                ingredient.push({ name: value, measure: null })
            }

            if (key.includes('strMeasure') && value) {
                
                ingredient[index]['measure'] = value

                index = index + 1
            }
        }

        return ingredient
    }

    const onPopupClose = () => {
        props.togglePopup()
    }

    if (!props.item) {
        return undefined
    }

    const { strDrink, strInstructions, strDrinkThumb } = props.item
    const ingredients = filteredIngr(props.item)

    return (
        <div className={ `popup ${props.className}` }>
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
    )
}

export default PopUp
