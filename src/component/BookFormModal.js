import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal'
import { Modal, Button } from 'bootstrap';
class BookFormModal extends React.Component {
    modalClose = () => {
        this.props.modalClose()
    }
    render() {
        return (
            <>
                {console.log("Open", this.props.stateOfModal)}
                <Modal show={this.props.stateOfModal} onHide={this.modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Title</Modal.Title>
                        {/* this.props.title */}
                    </Modal.Header>
                    <Modal.Body>
                        {/* <form onSubmit={this.props.addBooks}>
                        <input type="text" name="title" placeholder="title" />
                        <input type="text" name="description" placeholder="description" />
                        <input type="text" name="email" placeholder="email" />
                        <input type="submit" value="Add" />
                         </form>  */}
                        {/* {this.props.description} */}

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.modalClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default BookFormModal;
