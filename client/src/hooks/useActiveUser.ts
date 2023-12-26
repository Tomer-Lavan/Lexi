import { useEffect, useState } from 'react';
import { setActiveUser } from '../DAL/redux/reducers/activeUserReducer';
import { useAppDispatch, useAppSelector } from '../DAL/redux/store';
import { getActiveUser } from '../DAL/server-requests/usersDAL';

const useActiveUser = () => {
    const reduxUser = useAppSelector((state) => state.activeUser);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState(reduxUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!reduxUser) {
            const fetchUser = async () => {
                setIsLoading(true);
                const fetchedUser = await getActiveUser();
                setIsLoading(false);
                dispatch(setActiveUser(fetchedUser));
                setUser(fetchedUser);
            };
            fetchUser();
        }
    }, [reduxUser, dispatch]);

    return { activeUser: reduxUser || user, isLoading };
};

export default useActiveUser;
