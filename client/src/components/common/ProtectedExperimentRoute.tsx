import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Pages } from '../../app/App';
import useActiveUser from '../../hooks/useActiveUser';

const PrivateExperimentRoute = ({ TopBar, setIsOpen }) => {
    const { activeUser } = useActiveUser();
    const { experimentId } = useParams();

    if (!activeUser) {
        return <Navigate to={`${Pages.EXPERIMENT_LOGIN.replace(':experimentId', experimentId)}`} replace />;
    }

    return (
        <div style={{ overflow: 'hidden', maxHeight: '100vh' }}>
            <TopBar setIsOpen={setIsOpen} />
            <Outlet />;
        </div>
    );
};

export default PrivateExperimentRoute;
