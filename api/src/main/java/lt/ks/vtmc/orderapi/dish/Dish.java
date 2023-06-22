package lt.ks.vtmc.orderapi.dish;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dishes")
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

//    @JsonBackReference
//    @JsonIgnore
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dish")
//    List<OrderPosition> orderPosition;


    public Dish(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
