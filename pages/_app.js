
import '../styles/index.css'
import '../styles/bootstrap.min.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { Container } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
  return(
  <Provider store={store}>
    <Header/>
    <Container>
      <Component {...pageProps} />
    </Container>
    
    <Footer/>
  </Provider>
  )
  
}

export default MyApp
