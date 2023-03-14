import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Navbar from '../src/components/Navbar';

import '../styles/sass/main.scss';

const inter = Inter({
    subsets: ['latin'],
    weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme='light' themes={['light']}>
            <main className={inter.className}>
                <Navbar />
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    );
}
