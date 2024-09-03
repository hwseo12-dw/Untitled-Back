package PTR.PTR.controller;

import PTR.PTR.dto.ChatMessageDto; // 변경된 클래스 이름 임포트
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessageDto sendMessage(ChatMessageDto chatMessage) {
        return chatMessage;
    }
}
