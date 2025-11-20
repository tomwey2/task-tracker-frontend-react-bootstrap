import api from './api';

const getCommentsByTaskId = (taskId) => {
    return api.get(`/tasks/${taskId}/comments`);
};

const getComment = (taskId, commentId) => {
    return api.get(`/tasks/${taskId}/comments/${commentId}`);
};

const createComment = (taskId, commentData) => {
    return api.post(`/tasks/${taskId}/comments`, commentData);
};

const updateComment = (taskId, commentId, commentData) => {
    return api.put(`/tasks/${taskId}/comments/${commentId}`, commentData);
};

const deleteComment = (taskId, commentId) => {
    return api.delete(`/tasks/${taskId}/comments/${commentId}`);
};

const commentService = {
    getCommentsByTaskId,
    getComment,
    createComment,
    updateComment,
    deleteComment,
};

export default commentService;
