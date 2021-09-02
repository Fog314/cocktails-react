import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import DrinkCard from './_ui/DrinkCard'
import axios from "axios"
import React from 'react'

type MyProps = {
    // using `interface` is also ok
    message: string
}

type MyState = {
    drinks: DrinkItem[] // like this
}

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

class PopularDrinks extends React.Component<WithRouterProps, MyState, MyProps> {
    state: MyState = {
        // optional second annotation for better type inference
        drinks: [],
    }

    async fetchData() {
        const options = {
            Method: 'GET',
            url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
            headers: {
                'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
                'x-rapidapi-key': '00b52db9b6msha80f9b5af190c45p123de7jsnc56f628c8dc7'
            }
        }

        const { data } = await axios.request(options)

        this.setState({
            drinks: data.drinks
        })
    }

    async componentDidMount() {
        this.fetchData()
    }

    onCardClick(id: number) {
        // this.props.router.push(`/${id}`, undefined, { shallow: true })
    }

    render() {
        const { router } = this.props

        return (
            <div className="popular">
                <div className="popular__title">
                    Popular cocktails
                </div>
                <div className="popular__items">
                    {
                        this.state.drinks.map((el: DrinkItem, index: number) => {
                            return (
                                <div key={index} onClick={ () => router.push(`/cocktail/${el.idDrink}`, undefined, { shallow: true }) }>
                                    <DrinkCard
                                            strDrink={el.strDrink}
                                            strInstructions={el.strInstructions}
                                            strDrinkThumb={el.strDrinkThumb}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(PopularDrinks)
