import PropTypes from 'prop-types';
import { ImageList, ImageListItem } from '@mui/material';
import LightBoxGallery from '@/components/LightBoxGallery';

const Quilted = ({ images }) => {
    const srcset = (image, size, rows = 1, cols = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
                size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
        };
    };


    return (
        <ImageList sx={{ height: 450 }} variant="quilted" cols={4} rowHeight={121}>
            {images.map((item) => (
                <ImageListItem key={item.image} cols={item.cols || 1} rows={item.rows || 1}>
                    <img {...srcset(item.image, 121, item.rows, item.cols)}
                         alt={item.title} loading="lazy"/>
                </ImageListItem>
            ))}
        </ImageList>
    );
};

const WovenMasonry = ({ images, style }) => {
    if (!['woven', 'masonry'].includes(style)) return;

    return (
        <LightBoxGallery images={images.map(i => i.image)}>
            {setImgIndex => (
                <ImageList sx={{ height: 450 }} variant={style} cols={4} gap={8}>
                    {images.map((item, i) => (
                        <ImageListItem key={`${style}-${i}`} onClick={() => setImgIndex(i)}>
                            <img src={`${item.image}?w=248&fit=crop&auto=format`}
                                 srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                 alt={item.title} loading="lazy"/>
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </LightBoxGallery>
    );
};

const Photos = ({ images, style }) => {
    style = style ?? 'woven';

    switch (style) {
        case 'quilted':
            return <Quilted images={itemData}/>;
        default:
            return <WovenMasonry images={itemData} style={style}/>;
    }
};

const itemData = [
    {
        image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        image: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        image: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        image: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        image: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        image: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {
        image: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        image: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
    },
    {
        image: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
    {
        image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];

Photos.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        title: PropTypes.string,
    })),
    style: PropTypes.string
};

export default Photos;
