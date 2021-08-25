import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookCard from './component/BookCard'
import BookFormModal from './component/BookFormModal';
import UpdateModal from './component/UpdateModal';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      selectedBook: {},
      showBooks: false,
      stateOfModal: false,
      stateOfUpdateModal:false
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
    await this.setState({
      booksData: bookInfoData.data
    })
    this.componentDidMount();

  }
  modalOpen = async () => {
    await this.setState({
      stateOfModal: true
    })
    console.log('this.state.stateOfModalthis.state.stateOfModal ', this.state.stateOfModal);


  }
  modalClose = async() => {
    this.setState({
      stateOfModal: false
    })
  }
  modalUpdateOpen = async () => {
    await this.setState({
      stateOfUpdateModal: true
    })
    console.log('this.state.stateOfModalthis.state.stateOfModal ', this.state.stateOfUpdateModal);


  }
  modalUpdateClose = async() => {
    await this.setState({
      stateOfUpdateModal: false
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

  updateBook = async (bookID) => {

    await this.setState({
      stateOfUpdateModal: false
    })

    let chosenBook = this.state.booksData.find(book => {
      return book._id === bookID
    })
    await this.setState({
      selectedBook: chosenBook,
      stateOfUpdateModal: true,
      // selectedCatID: catID
    })
    console.log({chosenBook});
  }

  updateBookInfo= async (e)=>{
    e.preventDefault();
    console.log('alive');
    // this.setState({
    //   stateOfUpdateModal: true
    // })

    const { user, } = this.props.auth0;
    let bookInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: user.email,
      // ownerCatName: this.state.ownerCatName
    }
    let bookID = this.state.selectedBook._id;
    // let catInfoData = await axios.get(`${process.env.REACT_APP_SERVER}/addCat`,{params:catInfo})
    let bookInfoData = await axios.put(`${process.env.REACT_APP_SERVER}/updateBook/${bookID}`, bookInfo)
    this.setState({
      booksData: bookInfoData.data
    })
   
  }
  render() {
    return (
      // <Jumbotron>
      <>
        <h1>My Favorite Books</h1>
        <button onClick={this.modalOpen}> Add Books</button>
        {
          this.state.booksData.length !== 0 &&
          this.state.booksData.map((item, idx) => {
            //  console.log(item);
            return (
              <BookCard
                key={idx}
                bookInfo={item}
                deleteBook={this.deleteBook}
                updateBook={this.updateBook}
              />
            )
          })
        }        
        {
          this.state.stateOfModal &&
          <BookFormModal
            addBooks={this.addBooks}
            stateOfModal={this.state.stateOfModal}
            modalClose={this.modalClose}
          />
        }
        {
          this.state.stateOfUpdateModal &&
          <UpdateModal
          updateBook={this.updateBookInfo}
          stateOfUpdateModal={this.state.stateOfUpdateModal}
          modalUpdateClose={this.modalUpdateClose}
          selectedBook={this.state.selectedBook}
          />
        }



      </>
      // </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
