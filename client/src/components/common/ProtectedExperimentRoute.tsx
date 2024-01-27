import { Pages } from '@app/App';
import useActiveUser from '@hooks/useActiveUser';
import { Box } from '@mui/system';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const PrivateExperimentRoute = ({ TopBar, setIsOpen }) => {
    const { activeUser } = useActiveUser();
    const { experimentId } = useParams();

    if (!activeUser) {
        return <Navigate to={`${Pages.EXPERIMENT_LOGIN.replace(':experimentId', experimentId)}`} replace />;
    }

    return (
        <Box style={{ overflow: 'hidden', maxHeight: '100vh' }}>
            <TopBar setIsOpen={setIsOpen} />
            <Outlet />;
        </Box>
    );
};

export default PrivateExperimentRoute;
