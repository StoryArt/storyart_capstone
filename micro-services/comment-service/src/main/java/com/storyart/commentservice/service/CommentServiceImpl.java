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
import org.springframework.data.domain.*;
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
        List<Comment> comments = commentRepository.findAllByStoryIdQuery(request.getStoryId());
        List<Reaction> reactions = reactionRepository.findAll();

        List<ResponseCommentFromEntityDTO> responseComments = new ArrayList<>();
        for (Comment cmt: comments) {
            int numberOfLike = 0;
            int numberOfDislike = 0;
            boolean amILiked = false;
            boolean amIDisliked = false;
            for (Reaction react: reactions) {
                if(react.getCommentId() == cmt.getId()){
                    if(react.getType().equals("like")){
                        numberOfLike++;
                    }
                    if(react.getType().equals("dislike")){
                        numberOfDislike++;
                    }
                    if (react.getUserId() == request.getUserId()){
                        if(react.getType().equals("like")){
                            amILiked = true;
                        }
                        if(react.getType().equals("dislike")){
                            amIDisliked = true;
                        }
                    }
                }

            }
            ResponseCommentFromEntityDTO responseComment = new ResponseCommentFromEntityDTO(cmt, numberOfLike,numberOfDislike,amIDisliked,amILiked);
            responseComments.add(responseComment);
        }
        if(sortBy.equals("createAt")){
            Collections.sort(responseComments, new Comparator<ResponseCommentFromEntityDTO>() {
                @Override
                public int compare(ResponseCommentFromEntityDTO o1, ResponseCommentFromEntityDTO o2) {
                    return o1.getCreateAt().compareTo(o2.getCreateAt());
                }
            });
        }
        else {
            Collections.sort(responseComments, new Comparator<ResponseCommentFromEntityDTO>() {
                @Override
                public int compare(ResponseCommentFromEntityDTO o1, ResponseCommentFromEntityDTO o2) {
                    return o2.getNumberOfLike()- o1.getNumberOfLike();
                }
            });
        }
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > responseComments.size() ? responseComments.size() : (start + pageable.getPageSize());
        Page<ResponseCommentFromEntityDTO> pageResult = new PageImpl<ResponseCommentFromEntityDTO>(responseComments.subList(start,end), pageable, responseComments.size());
        if(pageResult.hasContent()){
            return pageResult.getContent();
        }
        else {
            return new ArrayList<ResponseCommentFromEntityDTO>();
        }
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
