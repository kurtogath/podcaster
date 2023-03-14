import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CardInterface } from '../interfaces';

const CardPodcast: React.FC<CardInterface> = ({
    src,
    width,
    height,
    alt,
    name,
    author,
    id,
}): JSX.Element => {
    return (
        <div className='rounded-lg bg-white shadow-lg'>
            <Link href={`/podcast/${id}`}>
                <div className='relative'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                        <Image
                            className='h-24 w-24 rounded-full border-4 border-white object-cover object-center'
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            priority
                        />
                    </div>
                </div>
                <div className='pt-14'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        {name}
                    </h2>
                    <p className='mt-2 text-gray-600'>{`Author: ${author}`}</p>
                </div>
            </Link>
        </div>
    );
};

export default CardPodcast;
