package PTR.PTR.service;

import PTR.PTR.model.Teacher;
import PTR.PTR.model.TrainingReview;
import PTR.PTR.model.User;
import PTR.PTR.repository.TrainingRepository;
import PTR.PTR.repository.TrainingReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrainingReviewService {
    TrainingReviewRepository trainingReviewRepository;
    TrainingRepository trainingRepository;

    public TrainingReviewService(TrainingReviewRepository trainingReviewRepository, TrainingRepository trainingRepository) {
        this.trainingReviewRepository = trainingReviewRepository;
        this.trainingRepository = trainingRepository;
    }

    public TrainingReview createTrainingReview(TrainingReview trainingReview){
        trainingReview.setCreatedAt(LocalDateTime.now());
        return trainingReviewRepository.save(trainingReview);
    }

    public List<TrainingReview> myTrainingReview(User user){
        return trainingReviewRepository.findAllByTrainingIn(trainingRepository.findByUser(user));
    }

    public List<TrainingReview> teacherTrainingReview(Teacher teacher){
        return trainingReviewRepository.findAllByTrainingIn(trainingRepository.findByTeacher(teacher));
    }
}
