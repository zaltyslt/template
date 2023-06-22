package lt.ks.vtmc.orderapi.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
 boolean existsByTitleIgnoreCase(String title);

 List<Menu> findByTitleContainingIgnoreCaseOrderByTitleAsc(String title);


}

