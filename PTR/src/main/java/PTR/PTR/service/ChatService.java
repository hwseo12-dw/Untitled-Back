package PTR.PTR.service;

import PTR.PTR.dto.ChatMessageDto;
import PTR.PTR.exception.ChatException;
import PTR.PTR.model.ChatMessage;
import PTR.PTR.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // 메시지 저장 메서드
    public ChatMessage saveMessage(ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = new ChatMessage(
                chatMessageDto.getContent(),
                chatMessageDto.getSender(),
                chatMessageDto.getType().name()
        );

        return chatMessageRepository.save(chatMessage);
    }

    // 예외 발생 시 처리 메서드
    public void validateMessage(ChatMessageDto chatMessageDto) {
        if (chatMessageDto.getContent() == null || chatMessageDto.getContent().isEmpty()) {
            throw new ChatException("Message content cannot be empty");
        }
    }
}
