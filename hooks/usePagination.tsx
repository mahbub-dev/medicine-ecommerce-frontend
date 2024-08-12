import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePagination = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);

    // Update page state when the router query changes
    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page as string) || 1);
        } else {
            setPage(1); // Default to page 1 if no query is present
        }
    }, [router.query.page]);

    // Function to change the page and update the query parameter
    const handlePageChange = (newPage: number) => {
        if (newPage !== page) {
            router.push({
                query: { ...router.query, page: newPage.toString() },
            }, undefined, { scroll: false });
        }
    };

    return { page, handlePageChange ,router};
};

export default usePagination;
