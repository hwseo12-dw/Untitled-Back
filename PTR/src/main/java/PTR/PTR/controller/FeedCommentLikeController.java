package PTR.PTR.controller;

import PTR.PTR.model.Feed;
import PTR.PTR.model.FeedComment;
import PTR.PTR.model.FeedCommentLike;
import PTR.PTR.model.FeedLike;
import PTR.PTR.service.FeedCommentLikeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedCommentLikeController {
    FeedCommentLikeService feedCommentLikeService;

    public FeedCommentLikeController(FeedCommentLikeService feedCommentLikeService) {
        this.feedCommentLikeService = feedCommentLikeService;
    }
    @PostMapping("/feedCommentLike")
    public String feedCommentLike(@RequestBody FeedCommentLike feedCommentLike){
        feedCommentLikeService.feedCommentLike(feedCommentLike);
        return "정상작동";
    }

    @DeleteMapping("/feedCommentLike")
    public void deleteFeedCommentLike(@RequestBody FeedCommentLike feedCommentLike){
        feedCommentLikeService.deleteFeedCommentLike(feedCommentLike);
    }
    @PostMapping("/feedCommentLikeByFeedComment")
    public void deleteFeedCommentLikeByFeedComment(@RequestBody FeedComment feedComment){
        feedCommentLikeService.deleteFeedCommentLikeByFeedComment(feedComment);
    }
    @PostMapping("/deleteFeedCommentLikeByFeed")
    public void deleteFeedCommentLikeByFeed(@RequestBody Feed feed){
        feedCommentLikeService.deleteFeedCommentLikeByFeed(feed);
    }

    @PostMapping("/getFeedCommentLike")
    public List<FeedCommentLike> getFeedCommentLike(@RequestBody FeedComment feedComment){
        return feedCommentLikeService.getFeedCommentLike(feedComment);
    }

    @PostMapping("/checkFeedCommentLikeClick")
    public boolean checkFeedCommentLikeClick(@RequestBody FeedCommentLike feedCommentLike){
        return feedCommentLikeService.checkFeedCommentLikeClick(feedCommentLike);
    }

    @PostMapping("/numberOfFeedCommentLike")
    public int getNumberOfFeedCommentLike(@RequestBody FeedComment feedComment){
        return feedCommentLikeService.getNumberOfFeedCommentLike(feedComment);
    }
}
