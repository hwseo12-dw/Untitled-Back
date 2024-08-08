package PTR.PTR.controller;

import PTR.PTR.model.*;
import PTR.PTR.service.FeedScrapService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedScrapController {
    FeedScrapService feedScrapService;

    public FeedScrapController(FeedScrapService feedScrapService) {
        this.feedScrapService = feedScrapService;
    }


    @PostMapping("/feedScrap")
    public String saveFeedScrap(@RequestBody FeedScrap feedScrap){
        feedScrapService.saveFeedScrap(feedScrap);
        return "정상작동";
    }

    @PostMapping("/feedScrap/feed")
    public List<FeedScrap> getFeedScrapByFeed(@RequestBody Feed feed){
        return feedScrapService.getFeedScrapByFeed(feed);
    }

    @PostMapping("/feedScrap/user")
    public List<FeedScrap> getFeedScrapByUser(@RequestBody User user){
        return feedScrapService.getFeedScrapByUser(user);
    }

    @DeleteMapping("/feedScrap")
    public void deleteFeedScrap(@RequestBody FeedScrap feedScrap){
        feedScrapService.deleteFeedScrap(feedScrap);
    }

    @PostMapping("/checkFeedScrapClick")
    public boolean checkFeedScrapClick(@RequestBody FeedScrap feedScrap){
        return feedScrapService.checkFeedScrapClick(feedScrap);
    }

    @PostMapping("/deleteFeedScrapByFeed")
    public void deleteFeedScrapByFeed(@RequestBody Feed feed){
        feedScrapService.deleteFeedScrapByFeed(feed);
    }

}
