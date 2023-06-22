package lt.ks.vtmc.orderapi.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;
import lt.ks.vtmc.orderapi.user.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    private String description;
    private String clientName;

    @JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY
//            , mappedBy = "order"
    )
//    @OnDelete(action = OnDeleteAction.CASCADE)
    List<OrderPosition> positions;

    private ZonedDateTime createdAt;
    private Boolean confirmed;

    public Order(String description, String clientName, List<OrderPosition> positions, Boolean confirmed) {
        this.description = description;
        this.clientName = clientName;
        this.positions = positions;
        this.confirmed = confirmed;

    }

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
}
