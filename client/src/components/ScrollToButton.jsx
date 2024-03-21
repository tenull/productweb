import { useEffect, useRef } from 'react';

const ScrollToTopButton = ({ children }) => {
    const boxRef = useRef(null);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        const handleClick = () => {
            scrollToTop();
        };

        if (boxRef.current) { 
            boxRef.current.addEventListener('click', handleClick);
        }

        return () => {
            if (boxRef.current) { 
                boxRef.current.removeEventListener('click', handleClick);
            }
        };
    }, []); 

    return <div ref={boxRef}>{children}</div>;
};

export default ScrollToTopButton;
