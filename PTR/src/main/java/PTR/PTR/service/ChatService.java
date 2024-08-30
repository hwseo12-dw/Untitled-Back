package PTR.PTR.service;

import PTR.PTR.dto.ChatMessageDto;
import PTR.PTR.model.ChatMessage;
import PTR.PTR.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage saveMessage(ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = new ChatMessage(
                chatMessageDto.getContent(),
                chatMessageDto.getSender(),
                chatMessageDto.getType().name()
        );
        return chatMessageRepository.save(chatMessage);
    }
}
