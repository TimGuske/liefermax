import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './komponenten/Layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
