import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookCard from './component/BookCard'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      showBooks: false
    }
  }
  componentDidMount = async () => {
    const { user, } = this.props.auth0;
    let bookDataUrl = await axios.get(`${process.env.REACT_APP_SERVER}/getBooks?userEmail=${user.email}`);
    // console.log("bookData.data bookData.data bookData.data: ", bookDataUrl.data);
    this.setState({
      booksData: bookDataUrl.data,
      showBooks: true
    })


  }
  render() {
    return (
      // <Jumbotron>
      <>
        <h1>My Favorite Books</h1>

        {this.state.booksData.length !== 0 &&
          this.state.booksData.map((item, idx) => {
            //  console.log(item);
            return (
              <BookCard
                key={idx}
                bookInfo={item}
              />
            )
          })}
        {/* <h1>My Favorite Books</h1>
        {this.state.showBooks && this.state.bookData.map((item, idx) => {

          return (

            <BookCard
              key={idx}
              bookInfo={item}
            />
          )
        })} */}

      </>
      // </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
