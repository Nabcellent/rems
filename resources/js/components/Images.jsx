import PropTypes from 'prop-types';
import { Alert, Button, ImageList, ImageListItem } from '@mui/material';
import LightBoxGallery from '@/components/LightBoxGallery';
import sample from 'lodash/sample';
import { Card } from 'react-bootstrap';
import { AddAPhoto } from '@mui/icons-material';
import { useState } from 'react';
import AddImageModal from '@/components/AddImageModal';
import pluralize from 'pluralize';

const Images = ({ images, style, imageable, imageableId }) => {
    const [showModal, setShowModal] = useState(false);

    style = style ?? 'woven';

    const directory = pluralize(imageable);

    if (!['woven', 'masonry', 'quilted'].includes(style)) return;

    let imgListProps = {}, imgListItemProps = {};
    if (style === 'quilted') {
        imgListProps = { rowHeight: 121 };
        imgListItemProps = { rows: sample([1, 2]), cols: sample([1, 2]) };
    } else {
        imgListProps = { gap: 8, cols: 4 };
    }

    return (
        <>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Photos</h5>
                <Button startIcon={<AddAPhoto/>} onClick={() => setShowModal(true)}>Add</Button>
            </Card.Header>
            <Card.Body>
                {
                    !images.length
                        ? (
                            <Alert severity="info">
                                <a className={'text-primary'} onClick={() => setShowModal(true)}>
                                    Add
                                </a> some nice images🙂
                            </Alert>
                        ) : (
                            <LightBoxGallery images={images.map(i => `/images/${directory}/${i.image}`)}>
                                {setImgIndex => (
                                    <ImageList sx={{ height: 450 }} variant={style}
                                               cols={images.length < 4 ? images.length : 4} {...imgListProps}>
                                        {images.map((item, i) => (
                                            <ImageListItem key={`${style}-${i}`} onClick={() => setImgIndex(i)} {...{
                                                ...imgListItemProps, ...{ rows: sample([1, 2]), cols: sample([1, 2]) }
                                            }}>
                                                <img src={`/images/${directory}/${item.image}`} alt={item.title}
                                                     loading="lazy"/>
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                )}
                            </LightBoxGallery>
                        )
                }
            </Card.Body>

            <AddImageModal imageable={imageable} imageableId={imageableId} showModal={showModal}
                           setShowModal={setShowModal}/>
        </>
    );
};

Images.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string,
    })),
    imageable: PropTypes.string.isRequired,
    imageableId: PropTypes.number.isRequired,
    style: PropTypes.string
};

export default Images;
