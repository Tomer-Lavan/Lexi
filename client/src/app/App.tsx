import React, { FC, Suspense, lazy, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoadingPage from '../components/common/LoadingPage';
import LoginExperimentRoute from '../components/common/LoginExperimentRoute';
import PrivateExperimentRoute from '../components/common/ProtectedExperimentRoute';
import useActiveUser from '../hooks/useActiveUser';
import InfoPage from '../screens/InfoPage';
import './styles.css';

export enum Pages {
    HOME = 'home',
    LOGIN = 'login',
    ADMIN = 'admin',
    CHAT = 'chat/:id',
}

const App: FC = () => {
    const { activeUser, isLoading } = useActiveUser();
    const [openEndConversationDialog, setOpenEndConversationDialog] = useState(false);
    const Home = lazy(() => import('../screens/Home/Home'));
    const Admin = lazy(() => import('../screens/Admin/Admin'));
    const ChatPage = lazy(() => import('../screens/Chat/ChatPage'));
    const Login = lazy(() => import('../screens/Login/Login'));
    const TopBar = lazy(() => import('../components/top-bar/TopBar'));

    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                {isLoading ? (
                    <LoadingPage />
                ) : (
                    <Routes>
                        <Route path="/info" element={<InfoPage />} />

                        {/* Admin Routes */}
                        <Route
                            path="/admin"
                            element={activeUser?.isAdmin ? <Admin /> : <Navigate to="/admin/login" />}
                        />
                        <Route
                            path="/admin/login"
                            element={!activeUser ? <Login /> : <Navigate to="/admin" replace />}
                        />

                        {/* Experiment Routes */}
                        <Route
                            path="/e/:experimentId"
                            element={
                                <PrivateExperimentRoute TopBar={TopBar} setIsOpen={setOpenEndConversationDialog} />
                            }
                        >
                            <Route path="" element={<Home />} />
                            <Route
                                path="c/:conversationId"
                                element={
                                    <ChatPage
                                        open={openEndConversationDialog}
                                        setIsOpen={setOpenEndConversationDialog}
                                    />
                                }
                            />
                        </Route>
                        <Route path="/e/:experimentId/login" element={<LoginExperimentRoute />}>
                            <Route path="" element={<Login />} />
                        </Route>

                        <Route
                            path="*"
                            element={<Navigate to={activeUser?.isAdmin ? '/admin' : '/info'} replace />}
                        />
                    </Routes>
                )}
            </Suspense>
        </BrowserRouter>
    );
};

export default React.memo(App);
