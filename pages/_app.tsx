import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import configureStore from '../redux/store';
import { useRouter } from 'next/router';
import Protect from '../components/Protect';

const store = configureStore();


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
  <Provider store={store}>
    {
      router.pathname === '/login' || router.pathname === '/register' ?
        <Component {...pageProps} /> 
        :
         <Protect>
           <Component {...pageProps} />
         </Protect>
    }
  </Provider> 
  );
}

export default MyApp
