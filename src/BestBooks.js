import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookCard from './component/BookCard'
import BookFormModal from './component/BookFormModal';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      showBooks: false,
      stateOfModal: false,
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
  addBooks = async (e) => {
    e.preventDefault();
    console.log('alive');
    this.setState({
      stateOfModal: true
    })

    const { user, } = this.props.auth0;
    let bookInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: user.email,
      // ownerCatName: this.state.ownerCatName
    }

    // let catInfoData = await axios.get(`${process.env.REACT_APP_SERVER}/addCat`,{params:catInfo})
    let bookInfoData = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo)
    this.setState({
      booksData: bookInfoData.data
    })
    // this.componentDidMount();

  }
  modalOpen = () => {
    this.setState({
      stateOfModal: true
    })
    console.log('this.state.stateOfModalthis.state.stateOfModal ', this.state.stateOfModal);


  }
  modalClose = () => {
    this.setState({
      stateOfModal: false
    })
  }
  deleteBook = async (bookID) => {
    const { user } = this.props.auth0;
    // let catsInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteCat?catID=${catID}`)
    let booksInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookID}?email=${user.email}`);
    // let booksInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteCat/${bookID}`)

    this.setState({
      booksData: booksInfo.data
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
                deleteBook={this.deleteBook}
              />
            )
          })
        }
        <form onSubmit={this.addBooks}>
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="description" placeholder="description" />
          <input type="text" name="email" placeholder="email" />
          <input type="submit" value="Add" />
        </form>
        {/* <button onClick={this.modalOpen}> Add Books</button> */}
        {/* { this.state.stateOfModal && 
        <BookFormModal
          addBooks={this.addBooks}
          stateOfModal={this.state.stateOfModal}
          modalClose={this.modalClose}
        />} */}


        {/* <h1>My Favorite Books</h1>
        {this.state.showBooks && this.state.bookData.map((item, idx) => {

          return (

            <BookCard
              key={idx}
              bookInfo={item}
            />
          )
          })} */
        }


      </>
      // </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
