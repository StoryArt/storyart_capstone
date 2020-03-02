package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.comment.*;
import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Reaction;
import com.storyart.commentservice.model.Story;
import com.storyart.commentservice.model.User;
import com.storyart.commentservice.repository.CommentRepository;
import com.storyart.commentservice.repository.ReactionRepository;
import com.storyart.commentservice.repository.StoryRepository;
import com.storyart.commentservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StoryRepository storyRepository;
    @Autowired
    ReactionRepository reactionRepository;
    @Override
    public Comment create(CreateCommentDTO cmt) {
        if(cmt.content.length()<1){
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED,"Comment cannot be empty");
        }
        //TODO: Remove comment if you want to validate
        Optional<User> user = userRepository.findById(cmt.userId);
        if (!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User does not exist");
        }
        Optional<Story> story = storyRepository.findById(cmt.storyId);
        if(!story.isPresent()){
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
    public Comment update(UpdateCommentDTO updateComment) {
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
    public Comment delete(DeleteCommentDTO deleteComment) {
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
    public List<ResponseCommentFromEntityDTO> findAllByStoryId(RequestLoadListCommentDTO request, int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Comment> commentPage;
        if(sortBy.equals("createAt")){
            commentPage = commentRepository.findAllByStoryIdAndOrderByCreateAt(request.getStoryId(),pageable);
        }
        else {
            commentPage = commentRepository.findAllByStoryIdAndOrderByReactions(request.getStoryId(),pageable);
        }
        List<Comment> comments = commentPage.getContent();
        List<Integer> commentIds = new ArrayList<>();
        for (Comment comment: comments) {
            commentIds.add(comment.getId());
        }

        List<Reaction> reactions = reactionRepository.findListUserId(commentIds);
        List<ResponseCommentFromEntityDTO> responseList = new ArrayList<>();
        int count = 0;
        for (Comment comment: comments) {
            List<Integer> likeIds = new ArrayList<>();
            List<Integer> dislikeIds = new ArrayList<>();
            for (Reaction reaction: reactions) {
                if(comment.getId() == reaction.getComment().getId()){
                    if (reaction.getType().equals("like")){
                        likeIds.add(reaction.getUserId());
                    }
                    if (reaction.getType().equals("dislike")){
                        dislikeIds.add(reaction.getUserId());
                    }
                }
            }
            ResponseCommentFromEntityDTO response = new ResponseCommentFromEntityDTO(comment, likeIds,dislikeIds);
            responseList.add(response);
        }
        return responseList;
    }


    @Override
    public Comment findById(Integer id) {
        Optional<Comment> comments = commentRepository.findById(id);
        if(!comments.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment does not exist");
        }
        return comments.get();
    }

    @Override
    public void disableAndEnableComment(int commentId) {
        Comment comment = findById(commentId);

        if (comment.isDisableByAdmin()) {
            comment.setDisableByAdmin(false);
        }
        else {
            comment.setDisableByAdmin(true);
        }

        commentRepository.save(comment);
    }
}
