/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import List from '../src/components/list/List';
import { Entry, PodcastLists, SelectedPodcast } from '../src/interfaces';
import { CardInterface } from '../src/interfaces/card';

const Home = (): JSX.Element => {
    const [data, setData] = useState<PodcastLists | null>(null);
    const [cardData, setCardData] = useState<Array<CardInterface> | null>(null);
    const [cardDataShown, setCardDataShown] =
        useState<Array<CardInterface> | null>(null);
    const [number, setNumber] = useState<number>(100);
    const [searchTerm, setSearchTerm] = useState('');
    const [fetching, setFetching] = useState<boolean>(false);

    const LOCAL_STORAGE_KEY = 'podcastList';
    const dayInMiliseconds = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const storedObject = localStorage.getItem(LOCAL_STORAGE_KEY);
        const storedTime = localStorage.getItem(`${LOCAL_STORAGE_KEY}_time`);
        const now = new Date().getTime();
        if (storedObject && storedTime) {
            const object = JSON.parse(storedObject);
            const time = parseInt(storedTime, 10);
            if (now - time < dayInMiliseconds) {
                setData(object);
                return;
            }
        }
        fetchData();
    }, [dayInMiliseconds]);

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
                    onClick: (id: string) => savePodcastLocalStorage(id),
                })) || null;
            setCardData(carDataAux);
            setCardDataShown(carDataAux);
        };

        parseData();
    }, [data, dayInMiliseconds]);

    useEffect(() => {
        //Filter data by podcast name and author
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
            setFetching(true);
            const res = await axios.get(urlItunes);
            setFetching(false);
            const dataObj: PodcastLists = res.data;
            setData(dataObj);
            const now = new Date().getTime();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataObj));
            localStorage.setItem(`${LOCAL_STORAGE_KEY}_time`, now.toString());
        } catch (error) {
            console.log(error);
        }
    };

    const savePodcast = (name: string, obj: SelectedPodcast): void => {
        const podcastData = JSON.stringify(obj);
        localStorage.setItem(name, podcastData);
    };

    const savePodcastLocalStorage = (id: string): void => {
        const selectedPodcast = data?.feed.entry.find(
            (el: Entry) => el.id.attributes['im:id'] === id
        );
        if (!selectedPodcast) return;

        const NOW = new Date().getTime();
        const podcastData: SelectedPodcast = {
            data: selectedPodcast,
            fetched: NOW,
        };
        const name = `podcast_${id}`;
        const podcastObject = localStorage.getItem(name);

        //If we dont have the podcast stored on out localStorage
        if (!podcastObject) {
            savePodcast(name, podcastData);
            return;
        }

        const object: SelectedPodcast = JSON.parse(podcastObject);
        const time = object.fetched;

        // If more than 24 hours have passed since the last API call  for this
        if (NOW - time < dayInMiliseconds) {
            savePodcast(name, podcastData);
        }
    };

    const renderListado = (): JSX.Element => {
        if (fetching) return <div>Getting data...</div>;
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
