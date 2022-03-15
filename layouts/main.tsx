import Head from 'next/head'
import Image from 'next/image'

const MainLayout: React.FC = ({children}) => {
  return (
    <div>
      <Head>
        <title>VoteApp</title>
        <meta name="description" content="This is a Vote App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

    </div>
  )
}

export default MainLayout
