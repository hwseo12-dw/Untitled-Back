package PTR.PTR.controller;

import PTR.PTR.model.ChatMessage;
import PTR.PTR.model.User;
import PTR.PTR.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    public void sendMessage(@DestinationVariable String lectureId, @Payload ChatMessage chatMessage) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // JSON으로 변환하여 메시지를 전송
            String jsonMessage = objectMapper.writeValueAsString(chatMessage);
            System.out.println("Broadcasting message: " + jsonMessage);
            messagingTemplate.convertAndSend("/topic/lecture/" + lectureId, jsonMessage);
        } catch (Exception e) {
            System.err.println("Error broadcasting message: " + e.getMessage());
        }
    }
}
