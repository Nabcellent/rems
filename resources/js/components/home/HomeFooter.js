import { Box, IconButton, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import Logo from "../Logo";

import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const HomeFooter = () => {
    return (
        <Box component={'footer'} mt={5} p={5} color='white' bgcolor={(theme) => theme.palette.primary.main}>
            <Box display={'flex'} justifyContent={'center'}>
                <IconButton>
                    <FacebookRoundedIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
                <IconButton>
                    <TwitterIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
                <IconButton>
                    <InstagramIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
                <IconButton>
                    <LinkedInIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
                <IconButton>
                    <GitHubIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
            </Box>

            <Divider variant="middle" sx={{ my: 1, borderBottomWidth: 1.5, color: 'white' }} />

            <Grid container spacing={2} justifyItems={'space-around'} textAlign={'center'}>
                <Grid item xs={6} md={3}>
                    <Link href="/">
                        <Logo />
                    </Link>
                    <Typography variant="body1">Real Estate Management System</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography variant="h6" color={'white'} fontWeight={600} textAlign={'left'}>USEFUL LINKS</Typography>
                    <List disablePadding dense>
                        <ListItem>
                            <ListItemText primary={<Link href="#">Become an Owner</Link>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Link href="#">Become a Property Manager</Link>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Link href="#">Become a Tenant</Link>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Link href="#">Become a Service Provider</Link>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Link href="#">Browse our Listings</Link>} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography variant="h6" color={'white'} fontWeight={600} textAlign={'left'}>CONTACT US</Typography>
                    <List disablePadding dense>
                        <ListItem>
                            <ListItemText primary={'Phone: +254712345678'} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={'Office: +254787654321'} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={'Email: 254.rems@gmail.com'} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography variant="body1">{new Date().getFullYear()} © REMS</Typography>
                    <Typography variant="body1">Designed & Developed by Nabcellent & Ifatos</Typography>
                </Grid>
            </Grid>
        </Box >
    );
}

export default HomeFooter;