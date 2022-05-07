import * as React from 'react';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Typography, AppBar, Container, Toolbar, MenuItem, IconButton, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';


const pages = {
    graphs: 'Графіки',
    carpicker: 'Автопідбір',
}

const burgerSx = { display: { xs: 'block', sm: 'none' } }
const itemsSx = { display: { xs: 'none', sm: 'block' } }

const TopBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant='h4'
                        component='h1'
                        sx={{ fontFamily: 'Orelega One', marginRight: 'auto' }}
                        children="autoRIA Analyser"
                    />

                    <IconButton
                        size="large"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        aria-controls="menu-appbar"
                        sx={burgerSx}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        keepMounted
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={burgerSx}
                    >
                        {
                            Object.keys(pages).map(page => (
                                <Link key={page} to={page} style={{ color: "inherit", textDecoration: 'none' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            {pages[page as 'graphs' | 'carpicker']}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))
                        }

                        <HashLink to={'#qa'} style={{ color: "inherit", textDecoration: 'none' }}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Питання та Відповіді
                                </Typography>
                            </MenuItem>
                        </HashLink>
                    </Menu>

                    {
                        Object.keys(pages).map(page => (
                            <Link key={page} to={page} style={{ color: "inherit", textDecoration: 'none' }}>
                                <MenuItem sx={itemsSx}>
                                    <Typography textAlign="center">
                                        {pages[page as 'graphs' | 'carpicker']}
                                    </Typography>
                                </MenuItem>
                            </Link>
                        ))
                    }

                    <HashLink to={'#qa'} style={{ color: "inherit", textDecoration: 'none' }}>
                        <MenuItem sx={itemsSx}>
                            <Typography textAlign="center">
                                Питання та Відповіді
                            </Typography>
                        </MenuItem>
                    </HashLink>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default TopBar;
