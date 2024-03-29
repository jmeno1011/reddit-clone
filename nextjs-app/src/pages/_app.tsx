import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { AuthProvider } from '../context/auth';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { SWRConfig } from 'swr';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASEURL + "/api";
  axios.defaults.withCredentials = true
  const { pathname } = useRouter()
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err: any) {
      throw err.response.data;
    }
  }

  return (
    <>
      <Head>
        <script defer src="https://use.fontawesome.com/releases/v6.1.1/js/all.js" integrity="sha384-xBXmu0dk1bEoiwd71wOonQLyH+VpgR1XcDH3rtxrLww5ajNTuMvBdL5SOiFZnNdp" crossOrigin="anonymous"></script>
      </Head>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          {
            !authRoute && <Navbar />
          }
          <div className={authRoute ? "" : "pt-12 bg-gray-200 min-h-screen"}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
