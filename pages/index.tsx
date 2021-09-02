import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from "axios"
import React, { useEffect, useState }  from 'react'
import PopUp from '../pages/components/Popup'

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

function Main() {
    const [ popular, setPopular ] = useState<DrinkItem[]>([{
        strDrink: null,
        strInstructions: null,
        strDrinkThumb: undefined,
        ingredients: null
    }])

    const [ isPopupOpen, setPopup ] = useState(false)
    const [ selectedItem, selectDrink ] = useState(0)

    const fetchData = async () => {
        const options = {
            Method: 'GET',
            url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
            headers: {
                'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
                'x-rapidapi-key': '00b52db9b6msha80f9b5af190c45p123de7jsnc56f628c8dc7'
            }
        }

        const { data } = await axios.request(options)

        setPopular(data.drinks)
    }

    useEffect(() => {
        if (popular.length > 1) return undefined

        fetchData()
    })

    const breakpoints = {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1600: {
            slidesPerView: 5,
            spaceBetween: 30
        }
    }

    const togglePopup = () => {
        setPopup(!isPopupOpen)
    }

    const onDrinkSelect = (id: number) => {
        togglePopup()
        selectDrink(id)
    }

    return (
        <div className="main">
            <div className="main__inner">
                <div className="main__title">
                    Популярные за все время
                </div>
                
                {
                    isPopupOpen &&
                    <PopUp
                        className="main__popup"
                        item={ popular[selectedItem] }
                        opened={ isPopupOpen }
                        togglePopup={ togglePopup }
                    />
                }
                
                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    breakpoints={breakpoints}
                >
                    {
                        popular.map((el, index) => {
                            return (
                                <SwiperSlide
                                    className="main__carousel-item"
                                    key={ index }
                                    onClick={ () => onDrinkSelect(index) }
                                >
                                    <img
                                        className="main__carousel-img"
                                        src={ el.strDrinkThumb }
                                    />
                                    <div className="main__carousel-title">
                                        { el.strDrink }
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Main
