package PTR.PTR.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="training_review")
public class TrainingReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "training_id")
    private Training training;
    @Column(name = "teacher_rating")
    private int teacherRating;
    @Column(name = "teacher_review")
    private String teacherReview;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
