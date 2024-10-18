import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, onDeleteComment, isLikedCheck} = props
  const {name, comment, isLiked, time, id, initialClassname} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeIconImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(time)
  const likeBtnActive = isLiked ? 'active likeBtn' : 'likeBtn'
  const deleteComment = () => {
    onDeleteComment(id)
  }
  const onClickLikeBtn = () => {
    isLikedCheck(id)
  }
  return (
    <li className="commentContainer">
      <div className="initial-name-time-Container">
        <div className={`${initialClassname} initialclassnameContainer`}>
          <p className="initial">{initial}</p>
        </div>
        <p className="name">{name}</p>
        <p className="time">{postedTime} ago</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="like-image-btn-container">
        <div className="likeImage-likeBtn-container">
          <img src={likeIconImage} className="likeIcon" alt="like" />
          <button className={likeBtnActive} onClick={onClickLikeBtn}>
            Like
          </button>
        </div>
        <button onClick={deleteComment} className="deleteBtn" data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="deleteIcon"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
