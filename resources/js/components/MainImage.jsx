import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Import React FilePond with plugins & styles
import { FilePond, registerPlugin } from 'react-filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import pluralize from 'pluralize';
import { Box } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';

// Register filepond plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginFileRename
);


const MainImage = ({ image, imageable, imageableId }) => {
    const { csrf_token } = usePage().props;
    const [file, setFile] = useState(undefined);

    useEffect(() => {
        setFile(image);
    }, [image]);

    return (
        <Box sx={{
            position: 'absolute',
            bottom: 0,
            fontSize: '20pt',
            transform: 'translateY(50%)',
            width: '10rem',
            height: '10rem',
        }}>
            <FilePond maxFiles={1} name="image" maxFileSize={'1MB'} required allowDrop dropOnPage
                      files={file && `/images/${pluralize(imageable)}/${file}`}
                      server={{
                          url: route("dashboard.images.main", { imageableId, imageable }),
                          headers: { 'X-CSRF-TOKEN': csrf_token },
                          process: {
                              onload: response => sweet(JSON.parse(response))
                          },
                          revert: {
                              onload: response => {
                                  setFile(undefined);
                                  sweet(JSON.parse(response));
                              }
                          }
                      }}
                      labelMaxFileSizeExceeded={'Image is too large.'} instantUpload={false}
                      labelFileTypeNotAllowed={'Invalid image type. allowed(jpg, png, jpeg)'}
                      labelIdle='Drag & Drop an image or <span class="filepond--label-action">Browse</span>'
                      acceptedFileTypes={['image/jpg', 'image/png', 'image/jpeg']}
                      imageResizeTargetWidth={300} imageResizeTargetHeight={300}
                      stylePanelLayout={'circle'} styleLoadIndicatorPosition={'center bottom'}
                      styleProgressIndicatorPosition={'right bottom'} styleButtonRemoveItemPosition={'left bottom'}
                      styleButtonProcessItemPosition={'right bottom'}
            />
        </Box>
    );
};

MainImage.propTypes = {
    image: PropTypes.string,
    imageable: PropTypes.string.isRequired,
    imageableId: PropTypes.number.isRequired,
};

export default MainImage;
