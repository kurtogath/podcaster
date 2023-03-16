/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Entry, PodcastLists, SelectedPodcast } from '../../interfaces';

interface PodcastSidebarInterface {
    id: string;
}

const PodcastSidebar: React.FC<PodcastSidebarInterface> = ({ id }) => {
    const [podcast, setPodcast] = useState<Entry | null>(null);

    useEffect(() => {
        const name = `podcast_${id}`;
        const storedObject = localStorage.getItem(name);
        if (storedObject === null) {
            fetchData();
            return;
        }

        const podcast: SelectedPodcast = JSON.parse(storedObject);
        const podcastData = podcast.data;
        setPodcast(podcastData);
    }, [id]);

    const renderLeftSide = (): JSX.Element => {
        if (podcast == null) return <div />;
        const href = `/podcast/${id}`;
        return (
            <>
                <div className='flex items-center justify-center pb-4'>
                    <Link href={`${href}`}>
                        <Image
                            src={podcast?.['im:image'][2].label || ''}
                            alt={podcast?.title.label || ''}
                            width={170}
                            height={170}
                            priority
                        />
                    </Link>
                </div>
                <div className='h-0.5 bg-gray-300' />
                <div className='flex flex-col justify-center pb-4'>
                    <Link href={`${href}`}>
                        <span className='py-2 font-semibold'>
                            {podcast?.['im:name'].label}
                        </span>
                    </Link>
                    <Link href={`${href}`}>
                        <span className=''>{`by ${podcast?.['im:artist'].label}`}</span>
                    </Link>
                </div>
                <div className='h-0.5 bg-gray-300' />
                <div className='flex flex-col justify-center pb-4'>
                    <span className='py-2 font-semibold'>Description:</span>
                    <span>{podcast?.summary.label}</span>
                </div>
            </>
        );
    };

    const fetchData = async () => {
        const urlItunes =
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

        try {
            const res = await axios.get(urlItunes);
            const dataObj: PodcastLists = res.data;
            const entrys: Array<Entry> = dataObj.feed.entry;
            const selectedPodcast =
                entrys?.find((el) => el.id.attributes['im:id'] === id) || null;

            setPodcast(selectedPodcast);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='bg-white p-6 shadow-lg'>{renderLeftSide()}</div>
        </>
    );
};

export default PodcastSidebar;
