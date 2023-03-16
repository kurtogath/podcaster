import React from 'react';
import { CardInterface } from '../../interfaces/card';
import CardPodcast from '../cards/CardPodcast';

interface ListProps {
    cards: CardInterface[] | null;
}

const List: React.FC<ListProps> = ({ cards }) => {
    return (
        <div className='mt-12 grid grid-cols-2 gap-14 md:grid-cols-4'>
            {cards ? (
                cards.map((card, index) => (
                    <CardPodcast
                        key={index}
                        src={card.src}
                        alt={card.alt}
                        width={card.width}
                        height={card.height}
                        name={card.name}
                        author={card.author}
                        id={card.id}
                        onClick={(ret: string) => card.onClick(ret)}
                    />
                ))
            ) : (
                <div />
            )}
        </div>
    );
};

export default List;
