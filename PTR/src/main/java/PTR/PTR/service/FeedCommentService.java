package PTR.PTR.service;

import PTR.PTR.exception.ResourceNotFoundException;
import PTR.PTR.model.Feed;
import PTR.PTR.model.FeedComment;
import PTR.PTR.repository.FeedCommentRepository;
import PTR.PTR.repository.FeedRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FeedCommentService {
    FeedCommentRepository feedCommentRepository;
    FeedRepository feedRepository;

    public FeedCommentService(FeedCommentRepository feedCommentRepository, FeedRepository feedRepository) {
        this.feedCommentRepository = feedCommentRepository;
        this.feedRepository = feedRepository;
    }

    //댓글달기
    public FeedComment saveFeedComment(FeedComment feedComment){
        feedComment.setCreatedAt(LocalDateTime.now());
        return feedCommentRepository.save(feedComment);
    }

    //댓글조회(피드id로)
    public List<FeedComment> getFeedComment(Feed feed){
        return feedCommentRepository.findByFeed(feed);
    }

    //댓글삭제
    public void deleteFeedComment(FeedComment feedComment){
        feedCommentRepository.deleteById(feedComment.getId());
    }

    //댓글수정
    public FeedComment updateFeedComment(FeedComment feedComment){
        Optional<FeedComment> feedCommentOptional = feedCommentRepository.findById(feedComment.getId());
        if (feedCommentOptional.isEmpty()){
            throw new ResourceNotFoundException("FeedComment", "id", feedComment.getId());
        }else {
            FeedComment temp = feedCommentOptional.get();
            feedCommentOptional.get().setText(feedComment.getText());
            feedCommentOptional.get().setCreatedAt(LocalDateTime.now());
            feedCommentRepository.save(temp);
            return temp;
        }
    }

    //댓글 개수
    public int getNumberOfFeedComment(Feed feed){
        return feedCommentRepository.findByFeed(feed).size();
    }

    @Transactional
    public void deleteFeedCommentByFeed(Feed feed) {
        feedCommentRepository.deleteByFeed(feed);
    }
}
