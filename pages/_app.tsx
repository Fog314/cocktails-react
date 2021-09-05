import '../styles/drink-cards.scss'
import '../styles/globals.scss'
import '../styles/index.scss'
import '../styles/cocktail.scss'
import '../styles/header.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="app">
            <Component {...pageProps } />
        </div>
    )
}
export default MyApp
