package lt.ks.vtmc.orderapi.order.postitions;

import lt.ks.vtmc.orderapi.menu.positions.MenuPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderPositionRepository extends JpaRepository<OrderPosition, Long> {


}

