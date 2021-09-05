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

function MainPage() {
    const router = useRouter()
    const [ popular, setPopular ] = useState<DrinkItem[]>([])
    const [ latest, setLatest ] = useState<DrinkItem[]>([])
    const [ searchedString, setSearchString ] = useState<string | string[]>('')
    const [ selectedItem, selectDrink ] = useState<DrinkItem>({
        strDrink: null,
        strInstructions: null,
        strDrinkThumb: undefined,
        ingredients: []
    })
    const [showMessage, setShowMessage] = useState(false)
    const [isWatching, setListener] = useState(false)

    const fetchPopular = async () => {
        const { data } = await axios.get('/api/popular')

        setPopular(data)
    }

    const fetchLatest = async () => {
        const { data } = await axios.get('/api/latest')

        setLatest(data)
    }

    const isBottom = (el: Element | null) => {
        if (!el) return undefined

        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const trackScrolling = () => {
        const wrappedElement = document.querySelector('.header')

        if (isBottom(wrappedElement)) {
            document.removeEventListener('scroll', trackScrolling);
        }
    }

    const onCocktailSearch = (val: string) => {
        setSearchString(val)

        router.push({
            pathname: '/search',
            query: { text: val },
        })
    }

    useEffect(() => {
        if (!isWatching) {
            document.addEventListener('scroll', trackScrolling)
        }

        try {
            if (popular.length === 0) {
                fetchPopular()
            }

            if (latest.length === 0) {
                fetchLatest()
            }
        } catch (err) {
            alert(err)
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
            <Header value={ searchedString } onSearch={ (val: string) => onCocktailSearch(val) } />
            <div className="main__inner">
                <div className="main__title">
                    Popular for all time
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

                <div className="main__title">
                    Your inspiration
                </div>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    breakpoints={breakpoints}
                >
                    {
                        latest.map((el, index) => {
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

export default MainPage
