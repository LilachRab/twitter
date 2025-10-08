import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './components/protectedRoutes';
import { UnProtectedRoutes } from './components/unprotectedRoutes';
import { Feed, PageNotFound, WelcomePage } from './pages';
import { theme } from './theme.ts';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <Routes>
                        <Route element={<UnProtectedRoutes />}>
                            <Route path="/" element={<WelcomePage />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/feed" element={<Feed />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>
    );
};
