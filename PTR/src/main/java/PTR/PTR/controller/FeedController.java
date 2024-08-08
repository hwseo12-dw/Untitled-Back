package PTR.PTR.controller;

import PTR.PTR.model.Feed;
import PTR.PTR.model.User;
import PTR.PTR.service.FeedService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FeedController {
    FeedService feedService;

    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @PostMapping("/feed")
    public String saveFeed(@RequestBody Feed feed){
        feedService.saveFeed(feed);
        return "정상작동";
    }

    //피드 전체 조회
    @GetMapping("/feed")
    public List<Feed> getFeed(){
        return feedService.getFeed();
    }
    //피드 아이디로 피드 한개 조회
    @PostMapping("/feed/feed")
    public Optional<Feed> getFeedByFeedId(@RequestBody Feed feed){
        return feedService.getFeedByFeedId(feed);
    }
    @GetMapping("/getRecentFeed")
    public List<Feed> getRecentFeed(){
        return feedService.getRecentFeed();
    }

    @PostMapping("/feed/id")
    public List<Feed> getFeedById(@RequestBody User user){
        return feedService.getFeedById(user);
    }

    @PostMapping("/feed/name")
    public List<Feed> getFeedByName(@RequestBody User user){
        return feedService.getFeedByName(user);
    }

    @PostMapping("/deleteFeed")
    public void deleteFeed(@RequestBody Feed feed){
        feedService.deleteFeed(feed);
    }

    @PutMapping("/feed")
    public Feed updateFeed(@RequestBody Feed feed){
        return feedService.updateFeed(feed);
    }

    @PostMapping("/numberOfFeed")
    public int getNumberOfFeed(@RequestBody User user){
        return feedService.getNumberOfFeed(user);
    }

}
