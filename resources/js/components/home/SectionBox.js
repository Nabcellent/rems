import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const SectionBox = ({ tint, image, title, desc, onBtnClick }) => {
    return (
        <Grid container my={'2rem'} p={5} spacing={2} justifyContent="center" alignItems="center" borderRadius={'4px'}
              bgcolor={tint ? '#f1f1f1' : 'white'}>
            {!tint && <Grid item xs={12} md={6} textAlign="center">
                <Box component={'img'} width={'100%'} src={image}/>
            </Grid>}
            <Grid item xs={12} md={6}>
                <Typography variant="h3" fontSize={'2rem'} fontWeight={600} color={'#192734'} mb={'1rem'}
                            letterSpacing={'-0.025em'}>{title}</Typography>
                <Typography variant="body1" fontWeight={400} color={'#74808B'}>{desc}</Typography>
                {
                    onBtnClick &&
                    <Button onClick={() => onBtnClick()}
                            variant={title === 'Property Listings' ? 'outlined' : 'contained'}
                            endIcon={<ArrowCircleRightIcon/>} sx={{ mt: '1rem' }}>Take me there</Button>
                }
            </Grid>
            {tint && <Grid item xs={12} md={6} textAlign="center">
                <Box component={'img'} width={'100%'} src={image}/>
            </Grid>}
        </Grid>
    );
};

export default SectionBox;
