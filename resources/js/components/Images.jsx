import PropTypes from 'prop-types';
import { Alert, Button, ImageList, ImageListItem } from '@mui/material';
import LightBoxGallery from '@/components/LightBoxGallery';
import sample from 'lodash/sample';
import { Card } from 'react-bootstrap';
import { AddAPhoto, DeleteSweep, Edit } from '@mui/icons-material';
import { useState } from 'react';
import AddImageModal from '@/components/AddImageModal';
import pluralize from 'pluralize';
import { handleDelete } from '@/utils/helpers';

const Images = ({ images, style, imageable, imageableId }) => {
    const [image, setImage] = useState(undefined);
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

    const handleUpdate = image => {
        setImage(image);
        setShowModal(true);
    };

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
                                        {images.map((image, i) => (
                                            <ImageListItem key={`${style}-${i}`} {...{
                                                ...imgListItemProps, ...{ rows: sample([1, 2]), cols: sample([1, 2]) }
                                            }} className={'hover-actions-trigger'}>
                                                <img onClick={() => setImgIndex(i)} src={`/images/${directory}/${image.image}`} alt={image.title}
                                                     loading="lazy"/>
                                                <div className="hover-actions end-0 top-0 mt-2 me-2">
                                                    <button onClick={() => handleUpdate(image)}
                                                            className="border-300 me-1 text-600 btn btn-light btn-sm">
                                                        <Edit fontSize={'small'}/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(route('dashboard.images.destroy', { image: image.id }), 'Image')}
                                                        className="border-300 text-600 btn btn-danger btn-sm">
                                                        <DeleteSweep fontSize={'small'}/>
                                                    </button>
                                                </div>
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
