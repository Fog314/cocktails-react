import React from 'react'

type Props = {
    strDrink: string,
    strInstructions: string,
    strDrinkThumb: string
}

class DrinkCard extends React.Component<Props> {
    props: Props = {
        strDrink: '',
        strInstructions: '',
        strDrinkThumb: ''
    }

    render() {
        return (
            <div className="popular__item">
                <img
                    className="popular__item-img"
                    src={ this.props.strDrinkThumb }
                    alt={ `${this.props.strDrink}-logo` }
                />
                <div className="popular__item-title">
                    { this.props.strDrink }
                </div>
                <div className="popular__item-description">
                    { this.props.strInstructions }
                </div>
            </div>
        )
    }
}

export default DrinkCard
