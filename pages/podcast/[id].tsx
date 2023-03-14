import axios from 'axios';
import moment from 'moment';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PodcastEpisodeList, PodcastInformation } from '../../src/interfaces';

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
    const [podcastInfo, setPodcastInfo] = useState<PodcastInformation | null>(
        null
    );
    const [podcastList, setPodcastList] =
        useState<Array<PodcastEpisodeList> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const urlItunes = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;
            const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
                urlItunes
            )}`;

            try {
                const res = await axios.get(urlItunes);
                if (res.status !== 200) {
                    console.log(res.statusText);
                    return;
                }
                const result = res.data.results;
                const podcastInformation: PodcastInformation = result[0];
                const podcastList: Array<PodcastEpisodeList> = result.slice(1);

                setPodcastInfo(podcastInformation);
                setPodcastList(podcastList);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        console.log('podcastInfo => ', podcastInfo);
    }, [podcastInfo]);

    useEffect(() => {
        console.log('podcastList => ', podcastList);
    }, [podcastList]);

    const renderLeftSide = (): JSX.Element => {
        return (
            <>
                <div className='flex items-center justify-center pb-4'>
                    <Image
                        src={podcastInfo?.artworkUrl600 || ''}
                        alt={podcastInfo?.collectionName || ''}
                        width={120}
                        height={120}
                    />
                </div>
                <div className='h-0.5 bg-gray-300' />
                <div className='flex flex-col justify-center pb-4'>
                    <span className='font-semibold'>
                        {podcastInfo?.collectionName}
                    </span>
                    <span className=''>{`by ${podcastInfo?.collectionName}`}</span>
                </div>
                <div className='h-0.5 bg-gray-300' />
                <div className='flex flex-col justify-center pb-4'>
                    <span className='font-semibold'>Description:</span>
                    <span>{podcastInfo?.collectionName}</span>
                </div>
            </>
        );
    };

    const renderRightSide = (): JSX.Element => {
        return (
            <>
                <div className=' mb-5 bg-white p-6 font-semibold shadow-lg'>{`Episodes: ${podcastList?.length} `}</div>
                <div className=' bg-white p-6 shadow-lg'>{renderTable()}</div>
            </>
        );
    };

    const renderTable = (): JSX.Element => {
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
                        const minutos = Math.floor(el.trackTimeMillis / 60000);
                        const segundos = ((el.trackTimeMillis % 60000) / 1000)
                            .toFixed(1)
                            .padStart(2, '0');
                        return (
                            <tr key={index} className='cursor-pointer'>
                                <Link
                                    href={`/podcast/${id}/episode/${el.trackId}`}
                                >
                                    <td className='whitespace-nowrap text-blue-500'>
                                        {el.trackName}
                                    </td>
                                </Link>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    {moment(el.releaseDate).format(
                                        'DD/MM/YYYY'
                                    )}
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    {`${minutos}:${segundos}`}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div className='content-container container mx-auto px-4'>
                <div className='grid grid-cols-3 gap-8'>
                    <div className='bg-white p-6 shadow-lg'>
                        <h1 className='mb-4'>{renderLeftSide()}</h1>
                    </div>
                    <div className='col-span-2 '>{renderRightSide()}</div>
                </div>
            </div>
        </>
    );
};

export default Podcast;
