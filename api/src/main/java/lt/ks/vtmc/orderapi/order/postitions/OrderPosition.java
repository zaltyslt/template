package lt.ks.vtmc.orderapi.order.postitions;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.ks.vtmc.orderapi.dish.Dish;
import lt.ks.vtmc.orderapi.order.Order;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Orderposition"
//        , uniqueConstraints = {@UniqueConstraint(columnNames = "id")}
)
public class OrderPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    private Dish dish;

//    @JsonBackReference
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "order_id")
//    private Order order;

    private Integer quantity;

//    public OrderPosition(Long id, Dish dish, Integer quantity) {
//        this.id = id;
//        this.dish = dish;
//        this.quantity = quantity;
//    }
}
