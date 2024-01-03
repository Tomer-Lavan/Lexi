import { useParams } from 'react-router-dom';

export const useExperimentId = () => {
    const { experimentId } = useParams();
    return experimentId;
};
