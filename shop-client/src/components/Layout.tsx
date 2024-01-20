import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import React, { useState } from 'react';
import SwitchLanguage from './SwitchLanguage';
import LoginSignupModal from "./LoginSignupModal";

type Props = {
    children: JSX.Element;
};

const navItems = [
    { label: 'Boutiques', path: '/' },
    { label: 'Produits', path: '/product' },
    { label: 'Catégories', path: '/category' },
];

const Layout = ({ children }: Props) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <AppBar component="nav">
                <Toolbar className="header">
                    <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                        Gestion de boutiques
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        {navItems.map((item) => (
                            <Button key={item.label} sx={{ color: '#fff' }} onClick={() => navigate(item.path)}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <SwitchLanguage />
                    </Box>
                    <Box>
                        <Button
                            sx={{ color: '#fff', marginLeft: 2 }}
                            onClick={() => setIsModalOpen(true)}
                        > LOGIN/SIGNUP
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {isModalOpen && (
                <LoginSignupModal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
            <Loader />
            <div>{children}</div>
        </div>
    );
};

export default Layout;
