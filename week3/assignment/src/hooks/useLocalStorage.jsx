import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch(e) {
            console.error('localStorage Error', e);
            return initialValue;
        }
    });

    useEffect(() => {
        try{
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('localStorage 저장 실패:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}