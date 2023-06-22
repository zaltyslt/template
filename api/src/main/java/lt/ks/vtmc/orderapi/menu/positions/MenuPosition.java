package lt.ks.vtmc.orderapi.menu.positions;

import lt.ks.vtmc.orderapi.dish.Dish;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Menuposition"
//        , uniqueConstraints = {@UniqueConstraint(columnNames = "id")}
)
public class MenuPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Dish dish;
    private Integer quantity;

//    @ManyToOne
//    @JoinColumn(name = "menu_id")
//    private Menu menu;

    public MenuPosition(Dish dish, Integer quantity) {
        this.dish = dish;
        this.quantity = quantity;
    }


}
