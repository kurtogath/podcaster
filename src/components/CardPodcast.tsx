import Image from 'next/image';
import React from 'react';
import { SafeNumber } from '../types';

interface CardInterface {
    src: string;
    width: SafeNumber;
    height: SafeNumber;
    alt: string;
    name: string;
    description: string;
}

const CardPodcast: React.FC<CardInterface> = ({
    src,
    width,
    height,
    alt,
    name,
    description,
}): JSX.Element => {
    return (
        <div className='flex w-full flex-col items-center'>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority
                className='rounded-full'
            />
            <div className='text-lg font-bold'>{name}</div>
            <div>{description}</div>
        </div>
    );
};

export default CardPodcast;
