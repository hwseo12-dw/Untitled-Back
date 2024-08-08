package PTR.PTR.service;

import PTR.PTR.exception.ResourceNotFoundException;
import PTR.PTR.model.Feed;
import PTR.PTR.model.MiniGame1;
import PTR.PTR.model.User;
import PTR.PTR.repository.MiniGame1Repository;
import PTR.PTR.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MiniGame1Service {
    MiniGame1Repository miniGame1Repository;
    UserRepository userRepository;

    public MiniGame1Service(MiniGame1Repository miniGame1Repository) {
        this.miniGame1Repository = miniGame1Repository;
    }

    // 점수 등록  //점수는 0점으로 일요일 12시가 지나면 최고 점수를 다 0점으로 변경
    public MiniGame1 saveMiniGame1(MiniGame1 miniGame1){
        miniGame1.setCreatedAt(LocalDateTime.now());
        return miniGame1Repository.save(miniGame1);
    }

    // 점수 갱신
    public MiniGame1 updateMiniGameScore(MiniGame1 miniGame1){
        Optional<MiniGame1> miniGame1Optional = miniGame1Repository.findById(miniGame1.getId());
        if (miniGame1Optional.isEmpty()){
            throw new ResourceNotFoundException("MiniGame1", "Id", miniGame1.getId());
        }else {
            MiniGame1 temp = miniGame1Optional.get();
            miniGame1Optional.get().setScore(miniGame1.getScore());
//            if (miniGame1.getScore() > )
            miniGame1Repository.save(temp);
            return temp;
        }
    }

    //전체 순위
    public List<MiniGame1> getMiniGame1Rank(){
        //순위 정렬 필요
        return miniGame1Repository.findAll();
    }

    //아이디로 등수 찾기
    public MiniGame1 getMiniGame1RankByUser(User user){
        return miniGame1Repository.findByUser(user);
    }
}
