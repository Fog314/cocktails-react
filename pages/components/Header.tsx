import React, { BaseSyntheticEvent, ReactEventHandler, useEffect, useState } from 'react'
import Logo from '../../public/assets/logo.svg'
import Link from 'next/link'

interface Props {
    value: string | string[],
    onSearch: Function
}

function Header(props: Props) {
    const [ searchString, setSearch ] = useState('')

    const submitHandler = (e: BaseSyntheticEvent) => {
        e.preventDefault()

        if (searchString === '') return undefined

        props.onSearch(searchString)
    }

    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__logo-wrapper">
                    <Link
                        passHref={ true }
                        href="/"
                    >
                        <Logo className="header__logo" />
                    </Link>
                </div>
                <form
                    className="header__input-wrapper"
                    onSubmit={ (e) => submitHandler(e) } 
                >
                    <input
                        className="header__input"
                        type="text"
                        placeholder="Search cocktails"
                        onChange={ (e) => setSearch(e.target.value) }
                    // value={ props.value }
                    />
                    <svg
                        className="header__input-search"
                        aria-labelledby="title desc"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19.9 19.7"
                    >
                        <g
                            fill="none"
                            stroke="#f9f7f7"
                            strokeWidth="1px"
                        >
                            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                            <circle cx="8" cy="8" r="7" />
                        </g>
                    </svg>
                </form>
            </div>
        </div>
    )
}

export default Header
