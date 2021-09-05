import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from "axios"
import React, { useEffect, useState }  from 'react'
import PopUp from '../pages/components/Popup'
import DrinkCard from '../pages/_ui/DrinkCard'
import Header from '../pages/components/Header'
import { CSSTransition } from 'react-transition-group'
import { useRouter } from 'next/router'
import { debounce } from 'throttle-debounce'

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

function Main() {
    const router = useRouter()
    const [ popular, setPopular ] = useState<DrinkItem[]>([])
    const [ searchedString, setSearchString ] = useState<string | string[]>('')

    const [ selectedItem, selectDrink ] = useState<DrinkItem>({
        strDrink: null,
        strInstructions: null,
        strDrinkThumb: undefined,
        ingredients: []
    })
    const [showMessage, setShowMessage] = useState(false)

    const onCocktailSearch = debounce(1000, false, (val: string) => {
        setSearchString(val)

        // router.push({
        //     pathname: '/search',
        //     query: { text: val },
        // })
        fetchCocktails(val)
    })

    const fetchCocktails = async (val: string | null = null) => {
        try {
            const text = val ? val : router.query.text

            if (!text) return undefined
    
            setSearchString(text)
    
            // const data = await axios.request(`/api/search/${text}`)
            const { data } = await axios.get(`/api/search/${text}`)
    
            if (data === 'Internal Server Error') return undefined
    
            setPopular(data)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        try {
            if (popular.length !== 0) return undefined

            fetchCocktails()
        } catch (err) {
            console.error(err)
        }
    })

    const breakpoints = {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20
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

    const onDrinkSelect = (drink: DrinkItem) => {
        setShowMessage(true)
        selectDrink(drink)
    }

    return (
        <div className="main">
            <Header value={ "" } onSearch={ (val: string) => onCocktailSearch(val) } />
            <div className="main__inner">
                <div className="main__title">
                    Searched cocktails
                </div>
                
                <CSSTransition
                    in={showMessage}
                    timeout={300}
                    classNames="popup"
                    unmountOnExit
                >
                    <PopUp
                        className="main__popup"
                        item={{
                            strDrink: selectedItem.strDrink,
                            strInstructions: selectedItem.strInstructions,
                            strDrinkThumb:selectedItem.strDrinkThumb,
                            ingredients: selectedItem.ingredients,
                        }}
                        togglePopup={ () => setShowMessage(false) }
                    />
                </CSSTransition>

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
                                    onClick={ () => onDrinkSelect({
                                        strDrink: el.strDrink,
                                        strInstructions: el.strInstructions,
                                        strDrinkThumb: el.strDrinkThumb,
                                        ingredients: el.ingredients
                                    })}
                                >
                                    <DrinkCard drink={ el } />
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
