package PTR.PTR.repository;

import PTR.PTR.model.Training;
import PTR.PTR.model.TrainingReview;
import PTR.PTR.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingReviewRepository extends JpaRepository<TrainingReview,Long> {
    List<TrainingReview> findAllByTrainingIn(List<Training> training);
}
