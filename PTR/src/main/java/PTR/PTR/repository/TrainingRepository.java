package PTR.PTR.repository;

import PTR.PTR.model.Status;
import PTR.PTR.model.Teacher;
import PTR.PTR.model.Training;
import PTR.PTR.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training,Long> {
    Training findByUserAndTeacher(User user, Teacher teacher);
    List<Training> findByUser(User user);
    List<Training> findByTeacher(Teacher teacher);
    List<Training> findByTeacherAndStatus(Teacher teacher, Status status);
}
