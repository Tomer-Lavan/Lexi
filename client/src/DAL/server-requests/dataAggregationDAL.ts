import axiosInstance from './AxiosInstance';

const DATA_AGGREGATION_PATH = 'dataAggregation';

export const downloadExperimentJSON = async (experimentId, title): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/${DATA_AGGREGATION_PATH}?experimentId=${experimentId}`);

        const file = new Blob([JSON.stringify(response.data, null, 2)], {
            type: 'application/json',
        });

        downloadFile(file, title, 'json');
    } catch (error) {
        throw error;
    }
};

export const downloadExperimentXLSX = async (experimentId, title): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/${DATA_AGGREGATION_PATH}/excel?experimentId=${experimentId}`, {
            responseType: 'blob',
        });

        const file = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        downloadFile(file, title, 'xlsx');
    } catch (error) {
        console.error('Error downloading the file');
    }
};

const downloadFile = (file, title, fileType) => {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = `${title} Experiment.${fileType}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
