import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    if (context.params?.episodeId) {
        const episodeId = decodeURIComponent(
            Array.isArray(context.params.episodeId)
                ? context.params.episodeId[0]
                : context.params.episodeId
        );

        return {
            props: {
                episodeId,
            },
        };
    }

    return {
        props: {
            episodeId: '',
        },
    };
};

const Episode = ({
    episodeId,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    return (
        <>
            <div className='container mx-auto mt-4'>
                <h1 className='mb-4 text-4xl font-bold'>{`Episode ${episodeId}`}</h1>
            </div>
        </>
    );
};

export default Episode;
