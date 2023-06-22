package lt.ks.vtmc.orderapi.order.postitions;

import lombok.Value;
import lt.ks.vtmc.orderapi.dish.DishDto;

import java.io.Serializable;


public record OrderPositionDto ( Long id, DishDto dish, Integer quantity) {

}
