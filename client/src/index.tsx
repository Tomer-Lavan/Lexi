import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './DAL/redux/store';
import theme from './Theme';
import App from './app/App';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <SnackbarProvider>
                <CssBaseline />
                <App />
            </SnackbarProvider>
        </Provider>
    </ThemeProvider>,
);
