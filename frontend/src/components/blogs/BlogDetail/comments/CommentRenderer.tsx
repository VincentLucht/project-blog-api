import { useState } from 'react';

import { Comment } from '../BlogDetail';
import AutoResizeTextArea from '../../CreateBlog/edit components/AutoResizeTextArea';
import { ResponseDataFetchComments } from './util/fetchComments';

import { formatRelativeTime } from '../timeFormatter';
import { replyToComment } from './util/replyToComment';
import { toast } from 'react-toastify';

interface CommentRendererProps {
  comments: Comment[];
  blogId: string | null;
  token: string | null;
  fetchComments: (blogId: string) => Promise<any>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentRenderer({
  comments,
  blogId,
  token,
  fetchComments,
  setComments,
}: CommentRendererProps) {
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  if (!blogId || !token) return;

  const handleReply = async (
    e: React.FormEvent<HTMLFormElement>,
    parent_comment_id: string,
    repliedToName: string,
  ) => {
    e.preventDefault();
    try {
      if (replyText === '') {
        toast.error("Can't post an empty reply", { autoClose: 7500 });
        return;
      }

      // Refresh comments after replying to other comment
      await replyToComment(blogId, replyText, parent_comment_id, repliedToName, token);
      const response = (await fetchComments(blogId)) as ResponseDataFetchComments;
      setComments(response.blogComments);
      setReplyText('');
      setReplyingTo('');
      toast.success('Reply added successfully!');
    } catch (error) {
      toast.error('There was an error while replying to a comment');
    }
  };

  const renderComments = (comments: Comment[]) => {
    const renderedComments = comments.map((comment) => {
      if (comment.parent_comment_id) return null;

      return (
        // Root comment
        <div className="mb-8" key={comment.id}>
          <div>
            <div className="flex items-center gap-3">
              <div className="mb-[2px] text-left font-bold">@{comment.user.name}</div>

              <div className="text-left text-sm text-gray-400">
                {formatRelativeTime(comment.posted_on)}
              </div>
            </div>

            <div className="text-left">{comment.text}</div>

            {blogId && token && (
              <div className="mt-1 flex">
                <button
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                  className="text-left font-semibold transition-all duration-200 hover:text-blue-500"
                >
                  {replyingTo === comment.id ? (
                    <div className="text-red-500 decoration-red-500 hover:underline">
                      Cancel
                    </div>
                  ) : (
                    <div className="hover:underline">Reply</div>
                  )}
                </button>
              </div>
            )}

            {replyingTo === comment.id && (
              <form
                onSubmit={(e) => handleReply(e, comment.id, comment.user.name)}
                className="mt-2"
              >
                <AutoResizeTextArea
                  label="Type your reply..."
                  labelContent={false}
                  value={replyText}
                  setterFunction={setReplyText}
                />

                <button
                  type="submit"
                  className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Submit Reply
                </button>
              </form>
            )}
          </div>

          {/* Sub comments */}
          <div>
            {comment.replies &&
              comment.replies.length > 0 &&
              comment.replies.map((replyComment) => (
                <div className="ml-4 mt-2" key={replyComment.id}>
                  <div className="flex items-center gap-3">
                    <div className="mb-[2px]">
                      <span className="text-left font-bold">
                        @{replyComment.user.name}
                      </span>

                      <span className="ml-1 mr-1">replied to</span>

                      <span className="text-left font-bold">
                        {replyComment.repliedToName}
                      </span>
                    </div>

                    <div className="text-left text-sm text-gray-400">
                      {formatRelativeTime(replyComment.posted_on)}
                    </div>
                  </div>

                  <div className="text-left">{replyComment.text}</div>

                  {blogId && token && (
                    <div className="mt-1 flex">
                      <button
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === replyComment.id ? null : replyComment.id,
                          )
                        }
                        className="text-left font-semibold transition-all duration-200 hover:text-blue-500"
                      >
                        {replyingTo === replyComment.id ? (
                          <div className="text-red-500 decoration-red-500 hover:underline">
                            Cancel
                          </div>
                        ) : (
                          <div className="hover:underline">Reply</div>
                        )}
                      </button>
                    </div>
                  )}

                  {replyingTo === replyComment.id && (
                    <form
                      onSubmit={(e) =>
                        handleReply(e, comment.id, replyComment.user.name)
                      }
                      className="mt-2"
                    >
                      <AutoResizeTextArea
                        label="Type your reply..."
                        labelContent={false}
                        value={replyText}
                        setterFunction={setReplyText}
                      />

                      <button
                        type="submit"
                        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        Submit Reply
                      </button>
                    </form>
                  )}
                </div>
              ))}
          </div>
        </div>
      );
    });

    return renderedComments;
  };

  return <>{renderComments(comments)}</>;
}

export default CommentRenderer;
