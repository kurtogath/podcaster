import Head from 'next/head';
import Navbar from '../src/components/Navbar';

const Home = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>Podcaster</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='text-center'>
                <Navbar />
                <div className='container mx-auto mt-4'>
                    <h1 className='mb-4 text-4xl font-bold'>Podcaster</h1>
                </div>
            </main>
        </>
    );
};

export default Home;
