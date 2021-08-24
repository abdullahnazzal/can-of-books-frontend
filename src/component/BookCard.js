import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class BookCard extends React.Component {
    deleteBookFunc=()=>{
        this.props.deleteBook(this.props.bookInfo._id);
    }

    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.props.bookInfo.title}</Card.Title>
                        <Card.Text>
                            {this.props.bookInfo.description}
                        </Card.Text>
                        <Button variant="secondary" onClick={this.deleteBookFunc}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>




            </>
        )
    }
}

export default BookCard;
