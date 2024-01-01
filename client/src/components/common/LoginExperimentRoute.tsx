import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Pages } from '../../app/App';
import useActiveUser from '../../hooks/useActiveUser';

const LoginExperimentRoute = () => {
    const { activeUser } = useActiveUser();
    const { experimentId } = useParams();

    if (!activeUser) {
        return <Outlet />;
    }

    return <Navigate to={Pages.EXPERIMENT.replace(':experimentId', experimentId)} replace />;
};

export default LoginExperimentRoute;