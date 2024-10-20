'use client';
import NextTopLoader from 'nextjs-toploader';

const NextTopLoaderWrapper = () => {
    return <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />;
};

export default NextTopLoaderWrapper;
