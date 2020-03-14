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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.function.Function;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;
//    @Autowired
//    UserRepository userRepository;
    @Autowired
    StoryRepository storyRepository;
    @Autowired
    ReactionRepository reactionRepository;
    private static String errStoryNotFound = "Truyện không tồn tại.";
    private static String errCommentNotFound = "Bình luận không tồn tại.";
    private static String errUserNotFound = "Tài khoản không tồn tại.";
    private static String errCommentEmpty = "Xin vui lòng nhập bình luận.";

    @Override
    public ResponseListCommentDTO create(CreateCommentDTO cmt) {
//        Optional<User> user = userRepository.findById(cmt.getUserId());
//        if (!user.isPresent()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errUserNotFound);
//        }
        Optional<Story> story = storyRepository.findById(cmt.getStoryId());
        if (!story.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errStoryNotFound);
        }

        if (cmt.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, errCommentEmpty);
        }
        //TODO: Remove comment if you want to validate

        Comment comment = new Comment();
        comment.setContent(cmt.getContent());
        comment.setStory(story.get());//storyId chu nhi :v ok sao anh ko de private field
//        comment.setUser(user.get());
        comment.setActive(true);
        commentRepository.save(comment);


        ModelMapper mm = new ModelMapper();
        ResponseListCommentDTO response = mm.map(comment, ResponseListCommentDTO.class);
        response.setUserId(comment.getUser().getId());
        response.setUsername(comment.getUser().getUsername());
        response.setLikes(new ArrayList<>());
        response.setDislikes(new ArrayList<>());
        
        return response;
    }

    @Override
    public Comment update(UpdateCommentDTO updateComment) {
        //comments  co s la vi pham coding convention ak ok de a sua luon
        //app minh la app tieng viet nha =)))
        // may cai response status a' ha?
        //nay bao' bug front end doc. thoi :v chu k le show len :v
        //em lay thong tin nay hien thi len chu, chu ko de fixed cung ben phia frontend dc, ok v de a edit lai.
        //de e review tiep
        Optional<Comment> comment = commentRepository.findById(updateComment.commentId);
        if (!comment.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errCommentNotFound);
        }
        //TODO: Remove comment if you want to validate
//        Optional<User> user = userRepository.findById(updateComment.userId);
//        if (!user.isPresent()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errUserNotFound);
//        }

        if (updateComment.content.length() < 1) {
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, errCommentEmpty);
        }

        if (comment.get().getUser().getId() != updateComment.userId) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bình luận này không phải là bình luận của bạn.");
        }

        Comment cmt = comment.get();
        cmt.setContent(updateComment.content);
        commentRepository.save(cmt);
        return cmt;
    }

    @Override
    public Comment delete(DeleteCommentDTO deleteComment) {
        //xiu sua
        // nho sua r ma ta, vcl
        //bua truoc cung noi cau do, ma ko sưa =))) :)) tiep di xiu a sua sau
        Optional<Comment> cmt = commentRepository.findById(deleteComment.commentId);
        if (!cmt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errCommentNotFound);
        }
        //TODO: Remove comment if you want to validate
//        Optional<User> user = userRepository.findById(deleteComment.userId);
//        if (!user.isPresent()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errUserNotFound);
//        }
        if (cmt.get().getUser().getId() != deleteComment.userId) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bình luận này không phải là bình luận của bạn.");
        }

        Comment comment = cmt.get();
        if (!comment.isActive()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bình luận này đã bị xóa.");
        }
        comment.setActive(false);
        commentRepository.save(comment);
        return comment;
    }

    @Override
    public Page<ResponseListCommentDTO> findAllByStoryId(RequestLoadListCommentDTO request, int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Comment> commentPage;
        if (sortBy.equals("createdAt")) {
            commentPage = commentRepository.findAllByStoryIdAndOrderBycreatedAt(request.getStoryId(), pageable);
        } else {
            commentPage = commentRepository.findAllByStoryIdAndOrderByReactions(request.getStoryId(), pageable);
        }
//        commentPage.getContent().stream().map(comment -> {
//
//        })
        //cho nay anh map list model sang list dto dung ko yup
        Page<ResponseListCommentDTO> responsePage = commentPage.map(new Function<Comment, ResponseListCommentDTO>() {
            @Override
            public ResponseListCommentDTO apply(Comment comment) {
                ModelMapper mm = new ModelMapper();
                ResponseListCommentDTO responseListCommentDTO = mm.map(comment, ResponseListCommentDTO.class);
                //ResponseListCommentDTO responseListCommentDTO = new ResponseListCommentDTO(comment, new ArrayList<>(), new ArrayList<>());
                return responseListCommentDTO;
            }
        });

        List<ResponseListCommentDTO> responseList = responsePage.getContent();

        List<Integer> commentIds = new ArrayList<>();
        for (ResponseListCommentDTO comment : responseList) {
            commentIds.add(comment.getId());
        }

        List<Reaction> reactions = reactionRepository.findListUserId(commentIds);

        int index = 0;
        for (ResponseListCommentDTO comment : responseList) {
            List<Integer> likeIds = new ArrayList<>();
            List<Integer> dislikeIds = new ArrayList<>();
            //a ra commentIds la list, ok
            for (Reaction reaction : reactions) { //cái reactions nay la lay tu comment id o tren// e phai biet comment id nao`, thi` add vo comment id do'
                if (comment.getId() == reaction.getComment().getId()) { //cho nay co can check ko, co' de add list vo comment id xac' dinh
                    if (reaction.getType().equals("like")) {
                        likeIds.add(reaction.getUserId());
                    }
                    if (reaction.getType().equals("dislike")) {
                        dislikeIds.add(reaction.getUserId());
                    }
                }
            }
            comment.setLikes(likeIds);
            comment.setDislikes(dislikeIds);
            comment.setUserId(commentPage.getContent().get(index).getUser().getId());
            comment.setUsername(commentPage.getContent().get(index).getUser().getUsername());
            index++;
        }
//        cho nay anh chua doi content cua responpage ha
        //set vo la dc a`
//        ok r do
        //okey, v hoi nay anh noi bi cai gi, a moi fix lai do :v, ok

        return responsePage;
    }


    @Override
    public Comment findById(Integer id) {
        Optional<Comment> comment = commentRepository.findById(id);
        return comment.orElse(null);
        //cho nay ko tim dc thi tra ve null thoi, chu minh ko quang exception ok
    }

    //em chi test 2 cai nay thoi, may cai kia em nghhi no qua easy, chac anh lam ok het, ua ok, nao` lam` front end lo~ co bug thi fix, a test ki~ r
    //ok anh
    @Override
    public void disableAndEnableComment(int commentId) {
        Comment comment = findById(commentId);
        if (comment == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, errCommentNotFound);
        }

        if (comment.isDisableByAdmin()) {
            comment.setDisableByAdmin(false);
        } else {
            comment.setDisableByAdmin(true);
        }

        commentRepository.save(comment);
    }

    @Override
    public Page<CommentHistoryResponseDTO> getCommentHistory(int userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Comment> commentPage = commentRepository.findAllByUserId(userId, pageable);

        Page<CommentHistoryResponseDTO> responsePage = commentPage.map(new Function<Comment, CommentHistoryResponseDTO>() {
            @Override
            public CommentHistoryResponseDTO apply(Comment comment) {
                ModelMapper mm = new ModelMapper();
                CommentHistoryResponseDTO commentHistoryResponseDTO = mm.map(comment, CommentHistoryResponseDTO.class);

                return commentHistoryResponseDTO;
            }
        });

        List<CommentHistoryResponseDTO> responseList = responsePage.getContent();
        int index = 0;
        for (CommentHistoryResponseDTO response : responseList) {
//            response.setAuthorName(commentPage.getContent().get(index).getStory().getAuthor().getUsername());
            response.setStoryName(commentPage.getContent().get(index).getStory().getTitle());
            index++;
        }


        return responsePage;
    }


}
