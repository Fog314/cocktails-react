import React from 'react'

type Props = {
    drink: {
        strDrink: string | null,
        strInstructions: string | null,
        strDrinkThumb: string | undefined,
        ingredients: IngredientItem[]
    }
}

interface IngredientItem {
    name: string | null,
    measure: string | null,
}

function DrinkCard(props: Props) {
    const { drink } = props

    if (!drink.ingredients || drink.ingredients.length === 0) return (<div></div>)
    return (
        <div className="popular__item">
            <img
                className="popular__item-img"
                src={ drink.strDrinkThumb }
                alt={ `${drink.strDrink}-logo` }
            />
            <div className="popular__item-title">
                { drink.strDrink }
            </div>
            <div className="popular__item-description">
                {
                    drink.ingredients.map((el, index) => {
                        return (
                            <div key={ index } className="popular__ingredient">
                                { el.name }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DrinkCard
