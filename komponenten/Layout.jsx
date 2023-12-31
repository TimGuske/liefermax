import Head from 'next/head'
import Navigation from '../komponenten/Navigation'
import Fusszeile from '../komponenten/Fusszeile'


export default function Layout({children}) {
  return (
    <div>
      <Head>
        <title>Liefermax - Dein Lieferservice</title>
        <meta name="description" content="LieferApp by Tim Guske" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <br />
      <div className='container'>
        {children}
      </div>
      <Fusszeile />
    </div>
  )
}
