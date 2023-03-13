import Image from 'next/image';
import React from 'react';
import { CardInterface } from '../interfaces';

const CardPodcast: React.FC<CardInterface> = ({
    src,
    width,
    height,
    alt,
    name,
    author,
}): JSX.Element => {
    return (
        <div className='flex w-full flex-col items-center bg-white px-4 shadow-sm shadow-black'>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority
                className='rounded-full'
            />
            <div className='text-lg font-bold'>{name}</div>
            <div>{`Author: ${author}`}</div>
        </div>
    );
};

export default CardPodcast;
