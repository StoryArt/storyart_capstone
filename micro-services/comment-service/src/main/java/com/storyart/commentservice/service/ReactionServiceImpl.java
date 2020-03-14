package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.comment.CommentHistoryResponseDTO;
import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.dto.reaction.ReactionHistoryResponseDTO;
import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Reaction;
import com.storyart.commentservice.repository.CommentRepository;
import com.storyart.commentservice.repository.ReactionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ReactionServiceImpl implements ReactionService {
    @Autowired
    ReactionRepository reactionRepository;
    @Autowired
    CommentRepository commentRepository;


    @Override
    public void react(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> react = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        Optional<Comment> comment = commentRepository.findById(reactionDTO.getCommentId());

        if(!reactionDTO.getType().equals("like") && !reactionDTO.getType().equals("dislike")){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Loại reaction chỉ được là 'like' hoặc 'dislike'");
        }

        if(!comment.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Bình luận không tồn tại.");
        }

        if(react.isPresent()){
            Reaction reaction = react.get();
            if(reaction.getType().equals(reactionDTO.getType()) || reactionDTO.getType().length()<1){
               reaction.setActive(false);
               reactionRepository.save(reaction);
            }
            else {
                reaction.setType(reactionDTO.getType());
                reactionRepository.save(reaction);
            }
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setComment(comment.get());
            newReaction.setUserId(reactionDTO.getUserId());
            newReaction.setType(reactionDTO.getType());
            newReaction.setActive(true);
            reactionRepository.save(newReaction);
        }

    }

    @Override
    public void like(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> reaction = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        Optional<Comment> comment = commentRepository.findById(reactionDTO.getCommentId());
        if(!comment.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Bình luận không tồn tại.");
        }
        if(reaction.isPresent()){
            Reaction updateReaction = reaction.get();
            //tai sao cho nay ton tai minh add like v anh, k phai add, ma` la neu dang ton tai dislike thi update thanh like
            //no
            //neu da ton tai, like => bo like
            //dislike => bo dislike
            //a dang check xem co ton` tai reaction hay k thoi, da~ like r thi` front end call remove reaction, k phai ham nay
            //anh lam v thi cuc thoi, voi lai cho nay neu ton tai thi thanh like thay no ko logic lam
            //cho nay anh noi dung //vi du. comment do' a dang dislike, a bam like => check reaction exist, update reaction thanh` like thoi.
            //neu k dislike nua thi call remove => chu a hieu cho nay lam
//
            updateReaction.setType("like");
//
            reactionRepository.save(updateReaction);
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setComment(comment.get());
            newReaction.setUserId(reactionDTO.getUserId());
            newReaction.setType("like");
            reactionRepository.save(newReaction);
        }
    }
///ham like, dislike giong het nhau, anh gop vo dc ko //chac chan dc
//    em for sure la dc auke
    //
    @Override
    public void dislike(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> reaction = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        Optional<Comment> comment = commentRepository.findById(reactionDTO.getCommentId());

        if(!comment.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Bình luận không tồn tại.");
        }

        if(reaction.isPresent()){
            Reaction updateReaction = reaction.get();
            updateReaction.setType("dislike");
//
            reactionRepository.save(updateReaction);
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setComment(comment.get());
            newReaction.setUserId(reactionDTO.getUserId());
            newReaction.setType("dislike");
//
            reactionRepository.save(newReaction);
        }

    }

    @Override
    public void removeReaction(ReactionCommentDTO reactionDTO) {
        //vi du. a dang dislike cmt 1, thi` nut dislike se~ sang', a bam vo, thi call cai nay`, delete reaction luon.
        //em hieu anh dang muon client se phai xac dinh la cai reaction nay thuoc loai nao de goi ham update, delete cua anh dung ko
        //dung r, co ban la v
        //con` neu nut like hoac. dislike user bam' k sang', cu' call thang~ like/dislike, dang sang' thi` remove
        //lam v thi cung tam on thoi
        //cai nao` ok thi` tam. giu~ di, minh` lam` xin. qua' cung~ k ai care haha
        //cung hen xui thôi,  ua` k lam` tao`lao qua' la` dc
        //ok, tam thhoi nhu v di
        Optional<Reaction> react = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        Reaction reaction = react.get();
        if(react.isPresent()){
            reaction.setActive(false);
            reactionRepository.save(reaction);
        }


    }

    @Override
    public Page<ReactionHistoryResponseDTO> getReactionHistory(int userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Reaction> reactionPage = reactionRepository.getReactionsHistoryByUserId(userId, pageable);
        Page<ReactionHistoryResponseDTO> responsePage = reactionPage.map(new Function<Reaction, ReactionHistoryResponseDTO>() {
            @Override
            public ReactionHistoryResponseDTO apply(Reaction reaction) {
                ModelMapper mm = new ModelMapper();
                ReactionHistoryResponseDTO reactionHistoryResponseDTO = mm.map(reaction, ReactionHistoryResponseDTO.class);
                return reactionHistoryResponseDTO;
            }
        });

        List<ReactionHistoryResponseDTO> responseList = responsePage.getContent();
        int index = 0;
        for (ReactionHistoryResponseDTO response : responseList) {
            response.setStoryName(reactionPage.getContent().get(index).getComment().getStory().getTitle());
            response.setCommentId(reactionPage.getContent().get(index).getComment().getId());
            response.setCommentOwnerId(reactionPage.getContent().get(index).getComment().getId());
            response.setCommentOwnerName(reactionPage.getContent().get(index).getComment().getUser().getUsername());
            index++;
        }

        return responsePage;
    }
}
