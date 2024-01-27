import { Pages } from '@app/App';
import useActiveUser from '@hooks/useActiveUser';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const LoginExperimentRoute = ({ TopBar, setIsOpen }) => {
    const { activeUser } = useActiveUser();
    const { experimentId } = useParams();

    if (!activeUser) {
        return (
            <>
                <TopBar setIsOpen={setIsOpen} />
                <Outlet />
            </>
        );
    }

    return <Navigate to={Pages.EXPERIMENT.replace(':experimentId', experimentId)} replace />;
};

export default LoginExperimentRoute;
