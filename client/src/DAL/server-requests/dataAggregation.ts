import { ApiPaths } from '../constants';
import axiosInstance from './AxiosInstance';

export const downloadExperimentJSON = async (experimentId: string, title: string): Promise<void> => {
    try {
        const response = await axiosInstance.get(
            `/${ApiPaths.DATA_AGGREGATION_PATH}?experimentId=${experimentId}`,
        );

        const file = new Blob([JSON.stringify(response.data, null, 2)], {
            type: 'application/json',
        });

        downloadFile(file, title, 'json');
    } catch (error) {
        throw error;
    }
};

export const downloadExperimentXLSX = async (experimentId: string, title: string): Promise<void> => {
    try {
        const response = await axiosInstance.get(
            `/${ApiPaths.DATA_AGGREGATION_PATH}/excel?experimentId=${experimentId}`,
            {
                responseType: 'blob',
            },
        );

        const file = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        downloadFile(file, title, 'xlsx');
    } catch (error) {
        throw error;
    }
};

const downloadFile = (file: Blob, title: string, fileType: string) => {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = `${title} Experiment.${fileType}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
