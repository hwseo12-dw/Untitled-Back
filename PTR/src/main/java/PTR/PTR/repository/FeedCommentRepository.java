package PTR.PTR.repository;

import PTR.PTR.model.Feed;
import PTR.PTR.model.FeedComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedCommentRepository extends JpaRepository<FeedComment,Long> {
    List<FeedComment> findByFeed(Feed feed);


    void deleteByFeed(Feed feed);
}
