import axios from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import PodcastSidebar from '../../../../src/components/sidebar/PodcastSidebar';
import { PodcastEpisodeList } from '../../../../src/interfaces';

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    if (context.params?.episodeId) {
        let id = context.params.id ? context.params.id : '';
        id = Array.isArray(id) ? id[0] : id;

        let episodeId = context.params.episodeId
            ? context.params.episodeId
            : '0';

        episodeId = Array.isArray(episodeId) ? episodeId[0] : episodeId;

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
            episodeId: '',
        },
    };
};

const Episode = ({
    episodeId,
    id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    const [fetching, setFetching] = useState<boolean>(false);

    const [podcastList, setPodcastList] =
        useState<Array<PodcastEpisodeList> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
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
                const data = JSON.parse(res.data.contents);
                const result = data.results;
                const podcastList: Array<PodcastEpisodeList> = result.slice(1);
                setPodcastList(podcastList);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const renderVideo = () => {
        const episode = podcastList?.find(
            (el) => el.trackId === parseInt(episodeId, 10)
        );
        if (fetching) return <div>Getting data...</div>;
        if (episode == null) return <div>No se ha encontrado el episodio</div>;

        return (
            <div className='flex flex-col'>
                <h3 className=' font-semibold'> {episode.trackName}</h3>
                <p className='my-5'> {episode.description}</p>
                <audio controls className='audio-controller'>
                    <source src={episode.episodeUrl} type='audio/mpeg' />
                    Tu navegador no soporta la reproducción de audio.
                </audio>
            </div>
        );
    };

    const renderRightSide = (): JSX.Element => {
        return (
            <>
                <div className=' bg-white p-6 shadow-lg'>{renderVideo()}</div>
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

export default Episode;
