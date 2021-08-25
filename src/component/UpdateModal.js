import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
class UpdateModal extends React.Component {
    modalClose = () => {
        this.props.modalUpdateClose()
    }
    render() {
        return (
            <>
                {console.log("Open", this.props.stateOfUpdateModal)}
                <Modal show={this.props.stateOfUpdateModal} onHide={this.modalClose}>
                    <Modal.Header>
                        <Modal.Title>Title</Modal.Title>
                        {/* this.props.title */}
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.props.updateBook}>
                        <input type="text" name="title" defaultValue={this.props.selectedBook.title}  />
                        <input type="text" name="description" defaultValue={this.props.selectedBook.description} />
                        {/* <input type="text" name="email" placeholder="email" /> */}
                        <input type="submit" value="Update" />
                         </form> 
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

export default UpdateModal;
