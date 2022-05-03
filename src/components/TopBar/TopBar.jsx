import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Typography, AppBar, Container, Toolbar, MenuItem } from '@mui/material'

const pages = {
    graphs: 'Графіки',
    carpicker: 'Автопідбір',
}

const TopBar = () => (
    <AppBar position="sticky">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant='h4'
                    component='h1'
                    sx={{ fontFamily: 'Orelega One', marginRight: 'auto' }}
                    children="autoRIA Analyser"
                />

                {
                    Object.keys(pages).map(page => (
                        <Link key={page} to={page} style={{ color: "inherit", textDecoration: 'none' }}>
                            <MenuItem>
                                <Typography textAlign="center">
                                    {pages[page]}
                                </Typography>
                            </MenuItem>
                        </Link>
                    ))
                }

                <HashLink to={'#qa'} style={{ color: "inherit", textDecoration: 'none' }}>
                    <MenuItem>
                        <Typography textAlign="center">
                            Питання та Відповіді
                        </Typography>
                    </MenuItem>
                </HashLink>
            </Toolbar>
        </Container>
    </AppBar >
)

export default TopBar;
