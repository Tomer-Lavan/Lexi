import { Navigate, Outlet, useParams } from 'react-router-dom';
import useActiveUser from '../../hooks/useActiveUser';

const LoginExperimentRoute = () => {
    const { activeUser } = useActiveUser();
    const { experimentId } = useParams();

    if (!activeUser) {
        return <Outlet />;
    }

    return <Navigate to={`/e/${experimentId}`} replace />;
};

export default LoginExperimentRoute;
