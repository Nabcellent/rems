import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Form = ({ showForm = false }) => {
    const [show, setShow] = useState(showForm);

    return (
        <Modal show={show}>
            <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                <button className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                        data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}/>
            </div>
        </Modal>
    );
};

Form.propTypes = {
    showForm: PropTypes.bool
}

export default Form;
