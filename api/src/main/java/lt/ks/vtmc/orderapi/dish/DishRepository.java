package lt.ks.vtmc.orderapi.dish;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {

    Optional<Dish> findDishByTitle(String title);

//    @Query("SELECT d FROM Dish d WHERE d.quantities > 0")
//    List<Dish> findAllWithQuantityGreaterThanZero();

    boolean existsDishByTitleIgnoreCase(String title);
}
