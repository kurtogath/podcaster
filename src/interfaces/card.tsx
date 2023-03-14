import { SafeNumber } from '../types';

export interface CardInterface {
    src: string;
    width: SafeNumber;
    height: SafeNumber;
    alt: string;
    name: string;
    author: string;
    id: string;
}
