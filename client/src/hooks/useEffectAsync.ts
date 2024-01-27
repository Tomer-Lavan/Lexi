import { useEffect } from 'react';

export default function useEffectAsync(func, deps) {
    useEffect(() => {
        func();
    }, deps);
}
