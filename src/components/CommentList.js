import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import commentService from "../services/commentService";
import userService from "../services/userService";
import api from "../services/api";

function Comment({ comment, taskId, onCommentDeleted, onCommentUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (comment._links?.author?.href) {
        try {
          const userResponse = await api.get(comment._links.author.href);
          setAuthor(userResponse.data);
        } catch (error) {
          console.error("Failed to fetch author via link:", error);
        }
      }
    };

    fetchAuthor();
  }, [comment._links?.author?.href]);

  const handleUpdate = async () => {
    try {
      await commentService.updateComment(taskId, comment.id, { content });
      onCommentUpdated();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await commentService.deleteComment(taskId, comment.id);
      onCommentDeleted(comment.id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p>{comment.content}</p>
        )}
        <small>
          Comment by: {author?.username || "Unknown user"} on{" "}
          {new Date(comment.updatedAt + "Z").toLocaleString("de-DE")}
        </small>
      </td>
      <td>
        {isEditing ? (
          <Button variant="success" size="sm" onClick={handleUpdate}>
            Save
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          className="ms-2"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

function AddComment({ taskId, onCommentAdded }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await commentService.createComment(taskId, {
        content,
      });
      onCommentAdded();
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>New Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />
      </Form.Group>
      <Button type="submit" className="mt-2">
        Add Comment
      </Button>
    </Form>
  );
}

function CommentList({ taskId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    if (taskId) {
      try {
        const response = await commentService.getCommentsByTaskId(taskId);
        if (
          response.data._embedded &&
          Array.isArray(response.data._embedded.comments)
        ) {
          const fetchedComments = response.data._embedded.comments;
          fetchedComments.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
          );
          setComments(fetchedComments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setComments([]);
      }
    }
  }, [taskId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h5>Comments</h5>
        </Card.Header>
        <Card.Body>
          <AddComment taskId={taskId} onCommentAdded={fetchComments} />
          <hr />
          <Table>
            <tbody>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  taskId={taskId}
                  onCommentDeleted={handleCommentDeleted}
                  onCommentUpdated={fetchComments}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CommentList;
