package PTR.PTR.controller;

import PTR.PTR.model.MiniGame2;
import PTR.PTR.model.MiniGame3;
import PTR.PTR.model.User;
import PTR.PTR.service.MiniGame2Service;
import PTR.PTR.service.MiniGame3Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MiniGame3Controller {

    MiniGame3Service miniGame3Service;

    public MiniGame3Controller(MiniGame3Service miniGame3Service) {
        this.miniGame3Service = miniGame3Service;
    }

    // 점수 갱신
    @PutMapping("/api/miniGame3")
    public MiniGame3 updateMiniGame3Score(@RequestBody MiniGame3 miniGame3){
        return miniGame3Service.updateMiniGame3Score(miniGame3);
    }

    //전체 순위
    @GetMapping("/api/miniGame3/rank")
    public List<MiniGame3> getMiniGame3Rank(){
        return miniGame3Service.getMiniGame3Rank();
    }

    //아이디로 등수 찾기
    @GetMapping("/api/miniGame3/user")
    public MiniGame3 getMiniGame3RankByUser(User user){
        return miniGame3Service.getMiniGame3RankByUser(user);
    }
}
