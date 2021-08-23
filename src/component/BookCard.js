import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
class BookCard extends React.Component {

    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.props.bookInfo.title}</Card.Title>
                        <Card.Text>
                            {this.props.bookInfo.description}
                        </Card.Text>
                    </Card.Body>
                </Card>

                    
                

            </>
        )
    }
}

export default BookCard;
