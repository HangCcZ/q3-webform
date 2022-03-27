import Head from 'next/head'
import WebForm from '../components/WebForm'

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Webform Submission And Handling</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center bg-gray-100 text-center">
        <WebForm />
      </main>
    </div>
  )
}

export default Home
