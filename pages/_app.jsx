import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const toastConfig = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function MyApp({ Component, pageProps }) {
  const notify = (data, type) => {
    if (type === 'success') {
      toast.success(data, toastConfig)
    } else if (type === 'error') {
      toast.error(data, toastConfig)
    }
  }

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} notify={notify} />
    </>
  )
}

export default MyApp
