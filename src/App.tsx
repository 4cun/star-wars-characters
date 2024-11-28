import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchAndFilter from './components/SearchAndFilter';
import Login from './components/Login';
import {AuthProvider, ProtectedRoute} from "./components/AuthContext.tsx";
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
            <Routes>
                <Route index element={<Login />}/>
                <Route
                    path="SearchAndFilter"
                    element={
                        <ProtectedRoute>
                            <SearchAndFilter />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;