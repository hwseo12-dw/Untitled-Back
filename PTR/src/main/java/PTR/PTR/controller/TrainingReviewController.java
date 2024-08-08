package PTR.PTR.controller;

import PTR.PTR.model.Teacher;
import PTR.PTR.model.TrainingReview;
import PTR.PTR.model.User;
import PTR.PTR.service.TrainingReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class TrainingReviewController {
    TrainingReviewService trainingReviewService;

    public TrainingReviewController(TrainingReviewService trainingReviewService) {
        this.trainingReviewService = trainingReviewService;
    }
    // 1:1훈련 리뷰
    @PostMapping("createTrainingReview")
    public ResponseEntity<TrainingReview> createTrainingReview(@RequestBody TrainingReview trainingReview){
        return new ResponseEntity<>(trainingReviewService.createTrainingReview(trainingReview), HttpStatus.OK);
    }
    // 내가 작성한 1:1 훈련 리뷰
    @PostMapping("myTrainingReview")
    public ResponseEntity<List<TrainingReview>> myTrainingReview(@RequestBody User user){
        return new ResponseEntity<>(trainingReviewService.myTrainingReview(user), HttpStatus.OK);
    }
    // 강사의 1:1 훈련 리뷰
    @PostMapping("teacherTrainingReview")
    public ResponseEntity<List<TrainingReview>> teacherTrainingReview(@RequestBody Teacher teacher){
        return new ResponseEntity<>(trainingReviewService.teacherTrainingReview(teacher), HttpStatus.OK);
    }

}
