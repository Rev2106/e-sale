import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Comment = ({comment}) => (
  <div className="col-md-10 offset-md-1 comment-block mt-4">
      <div className="comment-body mb-2 mt-3">
      { comment.body }
      </div>
      <small><em>Created&nbsp;<span>
      {/* { moment(comment.created_at).startOf('minute').fromNow() } */
      comment.created_at}
      </span> ago by:&nbsp;</em>
      { comment.user.fullname }
      </small>
  </div>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

export default Comment
