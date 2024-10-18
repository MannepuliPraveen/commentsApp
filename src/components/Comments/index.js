import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }
  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }
  onSubmitBtn = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerClassName = `initalContainer 
    ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      time: new Date(),
      isLiked: false,
      initialClassname: initialContainerClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }
  onDeleteComment = id => {
    const {commentsList} = this.state
    const commentsListAfterDelete = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commentsList: commentsListAfterDelete})
  }
  isLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  render() {
    const {commentsList, nameInput, commentInput} = this.state

    return (
      <div className="appContainer">
        <div className="commentAppContainer">
          <div className="formContainer">
            <form onSubmit={this.onSubmitBtn} className="form">
              <h1 className="appHeading">Comments</h1>
              <p className="appDesc">Say something about 4.0 Technologies</p>
              <input
                type="text"
                onChange={this.onChangeName}
                value={nameInput}
                className="nameInput"
                placeholder="Your Name"
              />
              <textarea
                rows="7"
                className="commentInput"
                onChange={this.onChangeComment}
                value={commentInput}
                placeholder="Your Comment"
              />
              <br />
              <button type="submit" className="addBtn">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="commentPageImage"
            />
          </div>
          <hr />
          <p className="commentsSectionHeading">
            <span className="commentsCount">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                onDeleteComment={this.onDeleteComment}
                isLikedCheck={this.isLiked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
