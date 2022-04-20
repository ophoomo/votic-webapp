import Head from 'next/head'

const MainLayout: React.FC = ({children}) => {
  return (
    <div>
      <Head>
        <title>Votic</title>
        <meta name="description" content="This is a Vote App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

    </div>
  )
}

export default MainLayout
