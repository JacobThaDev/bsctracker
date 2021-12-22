import 'bootstrap/dist/css/bootstrap.css';

import '../public/css/globals.css';
import '../public/css/fontawesome.min.css';
import '../public/css/styles.css';

import { SSRProvider } from 'react-bootstrap';

import '../public/css/themes/dark.css';
import '../public/css/themes/light.css';

function MyApp({ Component, pageProps }) {

  return (
      <SSRProvider>
          <Component {...pageProps} />
      </SSRProvider>);
  
}

export default MyApp