import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SectionBox = ({ tint, imgRight, image, title, desc }) => {
    return (
        <Grid container my={'2rem'} p={5} spacing={2} justifyContent="center" alignItems="center" borderRadius={'4px'} bgcolor={tint ? '#f1f1f1' : 'white'}>
            {!imgRight && <Grid item xs={12} md={6} textAlign='center'>
                <Box component={'img'} maxHeight={'30vh'} src={image} />
            </Grid>}
            <Grid item xs={12} md={6}>
                <Typography variant='h3' fontSize={'2rem'} fontWeight={600} color={'#192734'} mb={'1rem'} letterSpacing={'-0.025em'}>{title}</Typography>
                <Typography variant='body1' fontWeight={400} color={'#74808B'}>{desc}</Typography>
            </Grid>
            {imgRight && <Grid item xs={12} md={6} textAlign='center'>
                <Box component={'img'} maxHeight={'30vh'} src={image} />
            </Grid>}
        </Grid>
    );
}

export default SectionBox;