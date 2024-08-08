package PTR.PTR.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/ptr/community.html")
    public String community(){
        return "community";
    }
    @GetMapping("/ptr/customerService.html")
    public String customerService(){
        return "customerService";
    }
    @GetMapping("/ptr/feed.html")
    public String feed(){
        return "feed";
    }
    @GetMapping("/ptr/lecture.html")
    public String lecture(){
        return "lecture";
    }
    @GetMapping("/ptr/login.html")
    public String login(){
        return "login";
    }
    @GetMapping("/ptr/main.html")
    public String mainPage(){
        return "main";
    }
    @GetMapping("/ptr/management.html")
    public String management(){
        return "management";
    }
    @GetMapping("/ptr/manager.html")
    public String manager(){
        return "manager";
    }
    @GetMapping("/ptr/mypage.html")
    public String mypage(){
        return "mypage";
    }
    @GetMapping("/ptr/record.html")
    public String record(){
        return "record";
    }
    @GetMapping("/ptr/recordExercise.html")
    public String recordExercise(){
        return "recordExercise";
    }
    @GetMapping("/ptr/recordFood.html")
    public String recordFood(){
        return "recordFood";
    }
    @GetMapping("/ptr/signUp.html")
    public String signUp(){
        return "signUp";
    }
    @GetMapping("/ptr/teacher.html")
    public String teacher(){
        return "teacher";
    }
    @GetMapping("/ptr/lectureView.html")
    public String lectureView(){
        return "lectureView";
    }
    @GetMapping("/ptr/teacherView.html")
    public String teacherView(){
        return "teacherView";
    }
    @GetMapping("/index.html")
    public String index(){
        return "index";
    }
}
