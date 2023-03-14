import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import List from '../src/components/list/List';
import { PodcastLists } from '../src/interfaces';
import { CardInterface } from '../src/interfaces/card';

const Home = (): JSX.Element => {
    const [data, setData] = useState<PodcastLists | null>(null);
    const [cardData, setCardData] = useState<Array<CardInterface> | null>(null);
    const [cardDataShown, setCardDataShown] =
        useState<Array<CardInterface> | null>(null);
    const [number, setNumber] = useState<number>(100);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        fetchData(); // First Call

        intervalId = setInterval(() => {
            fetchData(); //Every 24 hours calls the function
        }, 24 * 60 * 60 * 1000);

        return () => {
            if (intervalId) clearInterval(intervalId); // clear interval when component is disassembled
        };
    }, []);

    useEffect(() => {
        const parseData = () => {
            const carDataAux =
                data?.feed.entry.map((el) => ({
                    src: el['im:image'][2].label || '',
                    width: el['im:image'][2].attributes.height || 0,
                    height: el['im:image'][2].attributes.height || 0,
                    alt: el['im:name'].label || '',
                    name: el['im:name'].label || '',
                    author: el['im:artist'].label || '',
                    id: el.id.attributes['im:id'] || '',
                })) || null;
            setCardData(carDataAux);
            setCardDataShown(carDataAux);
        };

        parseData();
    }, [data]);

    useEffect(() => {
        const filterData = () => {
            const filtered =
                cardData?.filter(
                    (el) =>
                        el.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        el.author
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                ) || null;

            const num = filtered?.length || 0;
            setNumber(num);
            setCardDataShown(filtered);
        };

        filterData();
    }, [searchTerm, cardData]);

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

    const renderListado = (): JSX.Element => {
        if (data == null) return <div />;
        return <List cards={cardDataShown} />;
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
                <div className='content-container container mx-auto px-4'>
                    <div className='flex flex-row justify-end py-5'>
                        <div className='flex w-1/2 items-center justify-end '>
                            <label
                                className='podcast-number w-10'
                                htmlFor='podcast-searcher'
                            >
                                {number}
                            </label>
                            <input
                                className='ml-2 w-3/5 rounded border border-gray-400 py-2 px-4'
                                id='podcast-searcher'
                                type='text'
                                value={searchTerm}
                                placeholder='Filter podcasts...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    {renderListado()}
                </div>
            </main>
        </>
    );
};

export default Home;
