import axios from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import PodcastSidebar from '../../../src/components/sidebar/PodcastSidebar';
import {
    PodcastEpisodeList,
    PodcastInformation,
} from '../../../src/interfaces';

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    if (context.params?.episodeId) {
        const id = decodeURIComponent(
            Array.isArray(context.params.id) ? context.params.id[0] : ''
        );

        const episodeId = parseInt(
            decodeURIComponent(
                Array.isArray(context.params.episodeId)
                    ? context.params.episodeId[2]
                    : '0'
            ),
            10
        );

        return {
            props: {
                id,
                episodeId,
            },
        };
    }

    return {
        props: {
            id: '',
            episodeId: 0,
        },
    };
};

const Episode = ({
    episodeId,
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

    const renderRightSide = (): JSX.Element => {
        return (
            <>
                <div className=' bg-white p-6 shadow-lg'>{renderVideo()}</div>
            </>
        );
    };

    const renderVideo = () => {
        const episode = podcastList?.find((el) => el.trackId === episodeId);
        if (episode == null) return <div>No se ha encontrado el episodio</div>;
        return (
            <div className='flex flex-col'>
                <h3 className='font-semibold'> {episode.trackName}</h3>
                <p className='font-semibold'> {episode.description}</p>
                <audio controls>
                    <source src={episode.episodeUrl} type='audio/mpeg' />
                    Tu navegador no soporta la reproducción de audio.
                </audio>
            </div>
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

export default Episode;
