package lt.ks.vtmc.orderapi.dish;

import java.util.List;
import java.util.Optional;

public interface DishService {
  List<Dish> getAllDishes();
  List<Dish> getAllAvailableDishes();
  boolean doesDishExists(Dish dish);
    Optional<Dish> getDishById(Long id);
  Dish createDish(Dish dish);
  Dish modifyDish(Dish dish);
  void deleteDish(Dish dish);

}
