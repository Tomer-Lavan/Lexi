import { Navigate, Outlet, useParams } from 'react-router-dom';
import useActiveUser from '../../hooks/useActiveUser';

const PrivateExperimentRoute = ({ TopBar, setIsOpen }) => {
    const { activeUser } = useActiveUser();
    const { experimentId } = useParams();

    if (!activeUser) {
        return <Navigate to={`/e/${experimentId}/login`} replace />;
    }

    return (
        <div style={{ overflow: 'hidden', maxHeight: '100vh' }}>
            <TopBar setIsOpen={setIsOpen} />
            <Outlet />;
        </div>
    );
};

export default PrivateExperimentRoute;
