package lt.ks.vtmc.orderapi.menu;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.ks.vtmc.orderapi.menu.positions.MenuPosition;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "menu"
     //   , uniqueConstraints = {@UniqueConstraint(columnNames = "id")}
)
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @OneToMany
//            (mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<MenuPosition> positions;

}
