import { useGetToken } from '../../../account/useGetToken';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { addComment } from './util/addComment';
import { fetchComments } from './util/fetchComments';

import CommentRenderer from './CommentRenderer';
import AutoResizeTextArea from '../../CreateBlog/edit components/AutoResizeTextArea';
import NoMessageFound from '../../../partials/noMessageFound';
import { Comment } from '../BlogDetail';
import { toast } from 'react-toastify';

function Comments() {
  const token = useGetToken();
  const { id } = useParams();

  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    function getBlogComments() {
      if (!id) return;

      fetchComments(id)
        .then((response) => setComments(response.blogComments))
        .catch(() =>
          toast.error(
            'There was an error while loading the comments, please try again',
          ),
        );
    }

    getBlogComments();
  }, [id]);

  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !id) {
      toast.warn('Please log in to write a comment');
      return;
    }
    if (newCommentText === '') {
      toast.warn('Do you really want to post an empty comment?');
      return;
    }

    addComment(token, id, newCommentText)
      .then(() => {
        setNewCommentText('');
        // Fetch new comments after user adds one
        fetchComments(id)
          .then((response) => setComments(response.blogComments))
          .catch(() =>
            toast.error(
              'There was an error while loading the comments, please try again',
            ),
          );
      })
      .catch(() =>
        toast.error('There was an error while posting the comment, please try again'),
      );
  };

  console.log(comments);

  return (
    <div>
      <h2 className="mb-3 mt-12 text-left h2">Comments:</h2>
      {token ? (
        <form onSubmit={handleNewComment}>
          <AutoResizeTextArea
            label="Add Comment"
            labelContent={false}
            value={newCommentText}
            setterFunction={setNewCommentText}
            maxHeight={500}
          />

          <div className="mt-2 flex items-center justify-end gap-3">
            <button className="py-1 prm-button-red">Cancel</button>
            <button className="py-1 prm-button">Add Comment</button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex">
            <Link
              to="/login"
              className="font-semibold text-blue-500 underline transition-all duration-100 hover:scale-[1.02]
                active:scale-[0.98]"
            >
              Please log in to write a comment
            </Link>
          </div>
          <hr className="mb-12 mt-2" />
        </>
      )}

      {comments && comments.length > 0 ? (
        <CommentRenderer
          comments={comments}
          blogId={id ? id : null}
          token={token ? token : null}
          fetchComments={fetchComments}
          setComments={setComments}
        />
      ) : (
        <NoMessageFound message="No comments here... " />
      )}
    </div>
  );
}

export default Comments;
