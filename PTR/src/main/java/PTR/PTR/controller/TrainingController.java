package PTR.PTR.controller;

import PTR.PTR.model.Status;
import PTR.PTR.model.Teacher;
import PTR.PTR.model.Training;
import PTR.PTR.model.User;
import PTR.PTR.service.TrainingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TrainingController {
    TrainingService trainingService;

    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }
    // 1:1 훈련 요청
    @PostMapping("callTraining")
    public ResponseEntity<String> callTraining(@RequestBody Training training){
        return new ResponseEntity<>(trainingService.callTraining(training), HttpStatus.OK);
    }
    // 1:1 훈련 상태 확인
    @PostMapping("lookCallTraining")
    public ResponseEntity<String> lookCallTraining(@RequestBody Training training){
        return new ResponseEntity<>(trainingService.lookCallTraining(training),HttpStatus.OK);
    }
    // 1:1 훈련 승인
    @PostMapping("yesTraining")
    public ResponseEntity<String> yesTraining(@RequestBody Training training){
        return new ResponseEntity<>(trainingService.yesTraining(training),HttpStatus.OK);
    }
    // 1:1 훈련 거부
    @PostMapping("noTraining")
    public ResponseEntity<String> noTraining(@RequestBody Training training){
        return new ResponseEntity<>(trainingService.noTraining(training),HttpStatus.OK);
    }
    // 강사가 1:1 훈련을 요청한 모든 유저들을 조회
    @PostMapping("callAllStudents")
    public ResponseEntity<List<Training>> callAllStudents(@RequestBody Teacher teacher){
        return new ResponseEntity<>(trainingService.callAllStudents(teacher),HttpStatus.OK);
    }
    // 강사가 미확인한 1:1 훈련을 요청한 유저들을 조회
    @PostMapping("callStudents")
    public ResponseEntity<List<Training>> callStudents(@RequestBody Teacher teacher){
        return new ResponseEntity<>(trainingService.callStudents(teacher),HttpStatus.OK);
    }
    // 강사가 확인한 1:1 훈련을 요청한 유저들을 조회
    @PostMapping("lookCallStudents")
    public ResponseEntity<List<Training>> lookCallStudents(@RequestBody Teacher teacher){
        return new ResponseEntity<>(trainingService.lookCallStudents(teacher),HttpStatus.OK);
    }
    // 강사가 승인한 1:1 훈련을 요청한 유저들을 조회
    @PostMapping("myStudents")
    public ResponseEntity<List<Training>> myStudents(@RequestBody Teacher teacher){
        return new ResponseEntity<>(trainingService.myStudents(teacher),HttpStatus.OK);
    }
    // 강사가 거절한 1:1 훈련을 요청한 유저들을 조회
    @PostMapping("noStudents")
    public ResponseEntity<List<Training>> noStudents(@RequestBody Teacher teacher){
        return new ResponseEntity<>(trainingService.noStudents(teacher),HttpStatus.OK);
    }

    // 유저가 자신의 1:1 훈련 조회
    @PostMapping("myCallTraining")
    public ResponseEntity<List<Training>> myCallTraining(@RequestBody User user){
        return new ResponseEntity<>(trainingService.myCallTraining(user), HttpStatus.OK);
    }
    @PostMapping("deleteCallTraining")
    public ResponseEntity<Training> deleteCallTraining(@RequestBody Training training){
        return new ResponseEntity<>(trainingService.deleteCallTraining(training), HttpStatus.OK);
    }
}
