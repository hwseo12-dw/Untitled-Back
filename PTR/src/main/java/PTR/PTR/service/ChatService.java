package PTR.PTR.service;

import PTR.PTR.model.ChatMessage;
import PTR.PTR.model.Lecture;
import PTR.PTR.model.User;
import PTR.PTR.repository.ChatMessageRepository;
import PTR.PTR.repository.LectureRepository;
import PTR.PTR.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private final ChatMessageRepository chatMessageRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final LectureRepository lectureRepository;

    public ChatService(ChatMessageRepository chatMessageRepository, UserRepository userRepository, LectureRepository lectureRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
        this.lectureRepository = lectureRepository;
    }

    public User findByUsername(String userName) {
        return userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userName));
    }

    public void saveMessage(ChatMessage chatMessage) {
        // lectureId와 user는 chatMessage 객체에서 가져옴
        Lecture lecture = lectureRepository.findById(chatMessage.getLecture().getId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid lecture ID: " + chatMessage.getLecture().getId()));

        chatMessage.setLecture(lecture); // 강의 정보 설정
        chatMessage.setUser(chatMessage.getUser()); // 사용자 정보 설정

        chatMessageRepository.save(chatMessage); // 메시지 저장
    }

    public List<ChatMessage> getChatHistory(Long lectureId) {
        return chatMessageRepository.findByLectureId(lectureId);
    }
}
