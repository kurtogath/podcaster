/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import moment from 'moment';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PodcastSidebar from '../../src/components/sidebar/PodcastSidebar';
import { EpisodeList, PodcastEpisodeList } from '../../src/interfaces';

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    if (context.params?.id) {
        const id = decodeURIComponent(
            Array.isArray(context.params.id)
                ? context.params.id[0]
                : context.params.id
        );

        return {
            props: {
                id,
            },
        };
    }

    return {
        props: {
            id: '',
        },
    };
};

const Podcast = ({
    id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    const [podcastList, setPodcastList] =
        useState<Array<PodcastEpisodeList> | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);

    const dayInMiliseconds = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const name = `episodeList_${id}`;
        const storedObject = localStorage.getItem(name);
        if (storedObject === null) {
            fetchData();
            return;
        }

        const now = new Date().getTime();
        const dataStored: EpisodeList = JSON.parse(storedObject);
        const time = dataStored.fetched;
        if (now - time < dayInMiliseconds) {
            setPodcastList(dataStored.data);
            return;
        }

        fetchData();
    }, [id, dayInMiliseconds]);

    const fetchData = async () => {
        //Remove "&limit=20" for entire episode list
        const urlItunes = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
            urlItunes
        )}`;
        try {
            setFetching(true);
            const res = await axios.get(url);
            setFetching(false);
            if (res.status !== 200) {
                console.log(res.statusText);
                return;
            }
            const apiData = JSON.parse(res.data.contents);
            const result = apiData.results;
            const podcastList: Array<PodcastEpisodeList> = result.slice(1);
            const now = new Date().getTime();
            setPodcastList(podcastList);
            //Store data
            const storeData: EpisodeList = { data: podcastList, fetched: now };
            localStorage.setItem(
                `episodeList_${id}`,
                JSON.stringify(storeData)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const convertMsToTime = (ms: number): string => {
        // Convert ms to seconds
        const seconds = Math.floor(ms / 1000);

        // Calc hours, minutes & seconds
        const hours = Math.floor(seconds / 3600);
        const secondsRemaining = seconds % 3600;
        const minutes = Math.floor(secondsRemaining / 60);
        const finalSeconds = secondsRemaining % 60;
        //Convert it all to string
        const hourString: string = hours === 0 ? '' : `${hours}:`;
        const minutesString: string = minutes.toString().padStart(2, '0');
        const secondsString: string = finalSeconds.toString().padStart(2, '0');
        // Crear un string con hours, minutes y seconds
        const tiempo = `${hourString}${minutes}:${secondsString}`;
        return tiempo;
    };

    const renderTable = (): JSX.Element => {
        if (fetching) return <div> Getting data... </div>;
        return (
            <table className='w-full table-auto'>
                <thead>
                    <tr>
                        <th className='class="px-6 tracking-wider" py-3 text-left text-xs font-medium uppercase text-gray-500'>
                            Title
                        </th>
                        <th className='class="px-6 tracking-wider" py-3 text-left text-xs font-medium uppercase text-gray-500'>
                            Date
                        </th>
                        <th className='class="px-6 tracking-wider" py-3 text-left text-xs font-medium uppercase text-gray-500'>
                            Duration
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                    {podcastList?.map((el, index) => {
                        return (
                            <tr key={index} className='cursor-pointer'>
                                <td className='whitespace-nowrap text-blue-500'>
                                    <Link
                                        href={`/podcast/${id}/episode/${el.trackId}`}
                                    >
                                        {el.trackName}
                                    </Link>
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    {moment(el.releaseDate).format(
                                        'DD/MM/YYYY'
                                    )}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    {convertMsToTime(el.trackTimeMillis)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const renderRightSide = (): JSX.Element => {
        return (
            <>
                <div className=' mb-5 bg-white p-6 font-semibold shadow-lg'>{`Episodes: ${
                    podcastList?.length || ''
                } `}</div>
                <div className=' bg-white p-6 shadow-lg'>{renderTable()}</div>
            </>
        );
    };

    return (
        <>
            <div className='content-container container mx-auto px-4'>
                <div className='grid grid-cols-3 gap-8'>
                    <div className=''>
                        <PodcastSidebar id={id} />
                    </div>
                    <div className='col-span-2 '>{renderRightSide()}</div>
                </div>
            </div>
        </>
    );
};

export default Podcast;
