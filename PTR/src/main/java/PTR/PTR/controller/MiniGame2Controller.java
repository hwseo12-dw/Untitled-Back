package PTR.PTR.controller;

import PTR.PTR.model.MiniGame2;
import PTR.PTR.model.User;
import PTR.PTR.service.MiniGame2Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MiniGame2Controller {

    MiniGame2Service miniGame2Service;

    public MiniGame2Controller(MiniGame2Service miniGame2Service) {
        this.miniGame2Service = miniGame2Service;
    }

    // 점수 갱신
    @PutMapping("/api/miniGame2")
    public MiniGame2 updateMiniGame2Score(@RequestBody MiniGame2 miniGame2){
        return miniGame2Service.updateMiniGame2Score(miniGame2);
    }

    //전체 순위
    @GetMapping("/api/miniGame2/rank")
    public List<MiniGame2> getMiniGame2Rank(){
        return miniGame2Service.getMiniGame2Rank();
    }

    //아이디로 등수 찾기
    @GetMapping("/api/miniGame2/user")
    public MiniGame2 getMiniGame2RankByUser(User user){
        return miniGame2Service.getMiniGame2RankByUser(user);
    }
}
