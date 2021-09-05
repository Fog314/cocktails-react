import React, { BaseSyntheticEvent, ReactEventHandler, useEffect, useState } from 'react'
import axios from 'axios'
import Logo from '../../public/assets/logo.svg'

interface Props {
    value: string | string[],
    onSearch: Function
}

function Header (props: Props) {
    const changeHandler = (e: BaseSyntheticEvent) => {
        const { value } = e.target

        if (value === '') return undefined

        props.onSearch(value)
    }

    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__logo-wrapper">
                    <Logo className="header__logo" />
                </div>
                <input
                    className="header__input"
                    type="text"
                    placeholder="Search cocktails"
                    // value={ props.value }
                    onChange={ e => changeHandler(e) }
                />
            </div>
        </div>
    )
}

export default Header
