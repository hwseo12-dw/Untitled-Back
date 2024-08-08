package PTR.PTR.service;

import PTR.PTR.model.Lecture;
import PTR.PTR.model.Teacher;
import PTR.PTR.repository.LectureRepository;
import PTR.PTR.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    TeacherRepository teacherRepository;
    LectureRepository lectureRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher changeTeacher(Teacher teacher){
        return teacherRepository.save(teacher);
    }

    public Teacher getTeacherById(long id){
        return teacherRepository.findById(id).get();
    }


}
