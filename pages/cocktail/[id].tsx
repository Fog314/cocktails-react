import Link from 'next/link'
import { useRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import axios from "axios"
import React, { useEffect, useState }  from 'react'

type MyProps = {
    // using `interface` is also ok
    message: string
}

type MyState = {
    drink: DrinkItem // like this
}

export interface DrinkItem {
    strDrink: string | null,
    strInstructions: string | null,
    strDrinkThumb: string | null
}

function Cocktail() {
    const [ drink, setDrink ] = useState(null)
    const [ ingr, setIngr ] = useState(null)

    const router = useRouter()
    const { id } = router.query


    useEffect(() => {
        if (!drink) {
            fetchData()
        }
    })

    const fetchData = async () => {
        var options = {
            method: 'GET',
            url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
            params: { i: id },
            headers: {
              'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
              'x-rapidapi-key': '00b52db9b6msha80f9b5af190c45p123de7jsnc56f628c8dc7'
            }
        }
    
        const { data } = await axios.request(options)

        setDrink(data.drinks)
    }

    const filteredIngr = (drink) => {
        const ingredient = []
        let index = 0

        for (let [key, value] of Object.entries(drink)) {
            if (key.includes('strIngredient') && value) {
                ingredient.push({ name: value })
            }

            if (key.includes('strMeasure') && value) {
                
                ingredient[index]['measure'] = value

                index = index + 1
            }
        }

        return ingredient
    }

    if (drink && drink[0]) {
        const el = drink[0]

        el.ingredients = filteredIngr(el)

        return (
            <div className="cocktail">
                <div className="cocktail__logo-wrapper">
                    <img className="cocktail__logo" src={el.strDrinkThumb} />
                </div>
                <div className="cocktail__content">
                    <div className="cocktail__title">
                        { el.strDrink }
                    </div>
                    {
                        el.ingredients.map((item: object) => {
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
                    <div className="cocktail__description">
                        { el.strInstructions }
                    </div>
                </div>
            </div>
        )
    } else {
        return <svg version="1.1" id="L6" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100">
        <rect fill="none" stroke="#fff" strokeWidth="4" x="25" y="25" width="50" height="50">
       <animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"></animateTransform>
       </rect>
        <rect x="27" y="27" fill="#fff" width="46" height="50">
       <animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"></animate>
       </rect>
     </svg>
    }
}

export default Cocktail
