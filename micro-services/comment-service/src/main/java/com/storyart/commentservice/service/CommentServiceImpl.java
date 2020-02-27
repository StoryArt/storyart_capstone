package com.storyart.commentservice.service;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Story;
import com.storyart.commentservice.model.User;
import com.storyart.commentservice.model.models.commentModels.CreateCommentRequestModel;
import com.storyart.commentservice.model.models.commentModels.DeleteCommentRequestModel;
import com.storyart.commentservice.model.models.commentModels.UpdateCommentRequestModel;
import com.storyart.commentservice.repository.CommentRepository;
import com.storyart.commentservice.repository.StoryRepository;
import com.storyart.commentservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StoryRepository storyRepository;
    @Override
    public Comment create(CreateCommentRequestModel cmt) {
        if(cmt.content.length()<1){
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED,"Comment cannot be empty");
        }
        //TODO: Remove comment if you want to validate
        Optional<User> users = userRepository.findById(cmt.userId);
        if (!users.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User does not exist");
        }
        Optional<Story> stories = storyRepository.findById(cmt.storyId);
        if(!stories.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Story does not exist");
        }
        Comment comment = new Comment();
        comment.setContent(cmt.content);
        comment.setStoryId(cmt.userId);
        comment.setUserId(cmt.userId);
        comment.setActive(true);
        commentRepository.save(comment);

        return comment;
    }

    @Override
    public Comment update(UpdateCommentRequestModel updateComment) {
        if(updateComment.content.length()<1){
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED,"Comment cannot be empty");
        }

        Optional<Comment> comments = commentRepository.findById(updateComment.commentId);
        if(!comments.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment does not exist");
        }
        //TODO: Remove comment if you want to validate
        Optional<User> users = userRepository.findById(updateComment.userId);
        if (!users.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User does not exist");
        }

        if(comments.get().getUserId() != updateComment.userId){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment does not belong to this user");
        }

        Comment comment = comments.get();
        comment.setContent(updateComment.content);
        commentRepository.save(comment);
        return comment;
    }

    @Override
    public Comment delete(DeleteCommentRequestModel deleteComment) {
        Optional<Comment> comments = commentRepository.findById(deleteComment.commentId);
        if(!comments.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment does not exist");
        }
        //TODO: Remove comment if you want to validate
        Optional<User> users = userRepository.findById(deleteComment.userId);
        if (!users.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User does not exist");
        }
        if(comments.get().getUserId() != deleteComment.userId){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment does not belong to this user");
        }

        Comment comment = comments.get();
        if(!comment.isActive()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"This comment have been deleted already");
        }
        comment.setActive(false);
        commentRepository.save(comment);
        return comment;
    }


    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Comment findById(Integer id) {
        Optional<Comment> comments = commentRepository.findById(id);
        if(!comments.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment does not exist");
        }
        return comments.get();
    }
}
