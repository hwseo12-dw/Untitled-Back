package PTR.PTR.controller;

import PTR.PTR.model.Feed;
import PTR.PTR.model.FeedComment;
import PTR.PTR.service.FeedCommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedCommentController {
    FeedCommentService feedCommentService;

    public FeedCommentController(FeedCommentService feedCommentService) {
        this.feedCommentService = feedCommentService;
    }

    @PostMapping("/feedComment")
    public String saveFeedComment(@RequestBody FeedComment feedComment){
        feedCommentService.saveFeedComment(feedComment);
        return "정상";
    }
    @PostMapping("/getFeedComment")
    public List<FeedComment> getFeedComment(@RequestBody Feed feed){
        return feedCommentService.getFeedComment(feed);
    }


    @PostMapping("/deleteFeedComment")
    public void deleteFeedComment(@RequestBody FeedComment feedComment){
        feedCommentService.deleteFeedComment(feedComment);
    }
    @PutMapping("/feedComment")
    public FeedComment updateFeedComment(@RequestBody FeedComment feedComment){
        return feedCommentService.updateFeedComment(feedComment);
    }

    @PostMapping("/numberOfFeedComment")
    public int getNumberOfFeedComment(@RequestBody Feed feed){
        return feedCommentService.getNumberOfFeedComment(feed);
    }

    @PostMapping("/deleteFeedCommentByFeed")
    public void deleteFeedCommentByFeed(@RequestBody Feed feed){
        feedCommentService.deleteFeedCommentByFeed(feed);
    }
}
