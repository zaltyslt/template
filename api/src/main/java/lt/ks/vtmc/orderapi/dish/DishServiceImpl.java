package lt.ks.vtmc.orderapi.dish;

import lt.ks.vtmc.orderapi.exception.DuplicatedDishException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class DishServiceImpl implements DishService{
    private final DishRepository dishRepository;
    @Override
    public List<Dish> getAllDishes() {
        var result = dishRepository.findAll();
        return result.stream().sorted(Comparator.comparing(Dish::getTitle)).toList();
    }

    @Override
    public List<Dish> getAllAvailableDishes() {
//        return dishRepository.findAllWithQuantityGreaterThanZero().stream().sorted().toList();
        return null;
    }

    @Override
    public boolean doesDishExists(Dish dish) {
        return dishRepository.existsDishByTitleIgnoreCase(dish.getTitle().toLowerCase());
    }

    @Override
    public Optional<Dish> getDishById(Long id) {
        return dishRepository.findById(id);
    }

    @Override
    public Dish createDish(Dish dish) {
        if(!dishRepository.existsDishByTitleIgnoreCase(dish.getTitle())) {
            return dishRepository.save(dish);
        } else{
            throw new DuplicatedDishException(String.format("Dish with name %s already exists!",dish.getTitle()));
        }
    }

    @Override
    public Dish modifyDish(Dish dish) {
        return dishRepository.save(dish);
    }

    @Override
    public void deleteDish(Dish dish) {
         dishRepository.delete(dish);
    }
}
