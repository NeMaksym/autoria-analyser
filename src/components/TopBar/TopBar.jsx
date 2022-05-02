import { Link } from "react-router-dom";
import { Typography, AppBar, Container, Toolbar, MenuItem } from '@mui/material'

const pages = {
    graphs: 'Графіки',
    carpicker: 'Автопідбір',
}

const TopBar = () => (
    <AppBar position="static">
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
            </Toolbar>
        </Container>
    </AppBar >
)

export default TopBar;
