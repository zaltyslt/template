package lt.ks.vtmc.orderapi.mapper;

import lt.ks.vtmc.orderapi.dish.Dish;
import lt.ks.vtmc.orderapi.dish.DishDto;
import org.springframework.stereotype.Service;

@Service
public class DishMapper {

    public static Dish toDish(DishDto dishDto) {
        if (dishDto == null) {
            return null;
        }
       Dish dish = new Dish(dishDto.title(), dishDto.description());
       dish.setId(dishDto.id());
       return dish;
    }


    public static DishDto toDishDto(Dish dish) {
        if (dish == null) {
            return null;
        }
       return new DishDto(dish.getId(), dish.getTitle(), dish.getDescription());
    }
}
