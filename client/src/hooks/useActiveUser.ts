import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { useAppDispatch, useAppSelector } from '@DAL/redux/store';
import { getActiveUser, logout } from '@DAL/server-requests/users';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useActiveUser = () => {
    const reduxUser = useAppSelector((state) => state.activeUser);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { experimentId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const fetchedUser = await getActiveUser();
                dispatch(setActiveUser(fetchedUser));
            } catch (error) {
                dispatch(setActiveUser(null));
            }
            setIsLoading(false);
        };

        const handleLogout = async () => {
            if (reduxUser && !reduxUser.isAdmin && reduxUser.experimentId !== experimentId) {
                await logout();
                dispatch(setActiveUser(null));
            }
        };

        if (!reduxUser) {
            fetchUser();
        } else if (experimentId) {
            handleLogout();
        } else {
            setIsLoading(false);
        }
    }, [reduxUser, experimentId, dispatch]);

    return { activeUser: reduxUser, isLoading };
};

export default useActiveUser;
