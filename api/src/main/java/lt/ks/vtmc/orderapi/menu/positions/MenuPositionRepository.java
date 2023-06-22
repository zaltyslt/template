package lt.ks.vtmc.orderapi.menu.positions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuPositionRepository extends JpaRepository<MenuPosition, Long> {


}

