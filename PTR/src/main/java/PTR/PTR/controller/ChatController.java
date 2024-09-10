package PTR.PTR.controller;

import PTR.PTR.dto.ChatMessageDTO;
import PTR.PTR.model.ChatMessage;
import PTR.PTR.model.User;
import PTR.PTR.repository.ChatMessageRepository;
import PTR.PTR.repository.UserRepository;
import PTR.PTR.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
    @Autowired
    private final ChatService chatService;
    @Autowired
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate,UserRepository userRepository, ChatMessageRepository chatMessageRepository) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    @MessageMapping("/chat.sendMessage/{lectureId}")
    public void sendMessage(@DestinationVariable String lectureId, @Payload ChatMessage chatMessage) {
        // 사용자 정보 설정 로그 출력
        System.out.println("Received message from client: " + chatMessage.getUser().getUserId());

        // 메시지 처리 후 브로드캐스트
        ChatMessageDTO chatMessageDTO = new ChatMessageDTO(chatMessage.getContent(), chatMessage.getUser().getUserId());

        // 서버에서 클라이언트로 전송할 데이터 로그 출력
        System.out.println("Broadcasting message: " + chatMessageDTO);

        messagingTemplate.convertAndSend("/topic/lecture/" + lectureId, chatMessageDTO);
    }
}
