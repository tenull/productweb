import { useEffect, useRef } from 'react';

const ScrollToTopOnEnter = ({ children }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                scrollToTop();
            }
        };

        if (inputRef.current) {
            inputRef.current.addEventListener('keypress', handleKeyPress);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keypress', handleKeyPress);
            }
        };
    }, []);

    return <div ref={inputRef}>{children}</div>;
};

export default ScrollToTopOnEnter;
