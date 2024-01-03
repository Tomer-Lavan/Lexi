import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { useAppDispatch, useAppSelector } from '@DAL/redux/store';
import { getActiveUser } from '@DAL/server-requests/users';
import { useEffect, useState } from 'react';

const useActiveUser = () => {
    const reduxUser = useAppSelector((state) => state.activeUser);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState(reduxUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!reduxUser) {
            const fetchUser = async () => {
                setIsLoading(true);
                try {
                    const fetchedUser = await getActiveUser();
                    dispatch(setActiveUser(fetchedUser));
                    setUser(fetchedUser);
                } catch (error) {
                    dispatch(setActiveUser(null));
                    setUser(null);
                }
                setIsLoading(false);
            };
            fetchUser();
        }
    }, [reduxUser, dispatch]);

    return { activeUser: reduxUser || user, isLoading };
};

export default useActiveUser;
