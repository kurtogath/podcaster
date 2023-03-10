import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import { PodcastLists } from '../src/interfaces';

const Home = (): JSX.Element => {
    const [data, setData] = useState<PodcastLists | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const urlItunes =
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

        try {
            const res = await axios.get(urlItunes);
            const dataObj: PodcastLists = res.data;
            setData(dataObj);
        } catch (error) {
            console.log(error);
        }
    };

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
