package PTR.PTR.service;

import PTR.PTR.model.Status;
import PTR.PTR.model.Teacher;
import PTR.PTR.model.Training;
import PTR.PTR.model.User;
import PTR.PTR.repository.TrainingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrainingService {
    TrainingRepository trainingRepository;

    public TrainingService(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    public String callTraining(Training training){
        Training existingTraining = trainingRepository.findByUserAndTeacher(training.getUser(), training.getTeacher());
        if (null==existingTraining){
            training.setCreatedAt(LocalDateTime.now());
            training.setStatus(Status.UNCONFIRMED);
            trainingRepository.save(training);
            return "정상 처리되었습니다.";
        }
        return "이미 신청하였습니다.";
    }

    public String lookCallTraining(Training training){
        training.setStatus(Status.CONFIRM);
        trainingRepository.save(training);
        return "확인 상태";
    }

    public String yesTraining(Training training){
        training.setStatus(Status.ACCEPT);
        trainingRepository.save(training);
        return "승인 상태";
    }

    public String noTraining(Training training){
        training.setStatus(Status.REJECT);
        trainingRepository.save(training);
        return "거절 상태";
    }
    public List<Training> callAllStudents(Teacher teacher){
        return trainingRepository.findByTeacher(teacher);
    }
    public List<Training> callStudents(Teacher teacher){
        return trainingRepository.findByTeacherAndStatus(teacher,Status.UNCONFIRMED);
    }
    public List<Training> lookCallStudents(Teacher teacher){
        return trainingRepository.findByTeacherAndStatus(teacher,Status.CONFIRM);
    }
    public List<Training> myStudents(Teacher teacher){
        return trainingRepository.findByTeacherAndStatus(teacher,Status.ACCEPT);
    }
    public List<Training> noStudents(Teacher teacher){
        return trainingRepository.findByTeacherAndStatus(teacher,Status.REJECT);
    }

    public List<Training> myCallTraining(User user){
        return trainingRepository.findByUser(user);
    }

    public Training deleteCallTraining(Training training){
        trainingRepository.delete(training);
        return training;
    }
}
