package PTR.PTR.controller;

import PTR.PTR.model.ChatMessage;
import PTR.PTR.model.User;
import PTR.PTR.service.ChatService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage/{lectureId}")
    public void sendMessage(@DestinationVariable String lectureId, ChatMessage chatMessage) {
        // 로그인한 사용자 정보 가져오기
        String userName = chatMessage.getUser().getUserName();
        User user = chatService.findByUsername(userName); // Service에서 사용자 정보 가져오기

        // 채팅 메시지를 처리하고 브로드캐스트
        chatMessage.setUser(user);  // 메시지의 사용자 설정
        chatService.saveMessage(chatMessage);
        messagingTemplate.convertAndSend("/topic/lecture/" + lectureId, chatMessage);
    }
}
