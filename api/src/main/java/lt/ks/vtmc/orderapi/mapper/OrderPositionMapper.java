package lt.ks.vtmc.orderapi.mapper;

import lt.ks.vtmc.orderapi.dish.Dish;
import lt.ks.vtmc.orderapi.dish.DishDto;
import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;
import lt.ks.vtmc.orderapi.order.postitions.OrderPositionDto;
import org.springframework.stereotype.Service;

@Service
public class OrderPositionMapper {

    public static OrderPosition toOrderPosition(OrderPositionDto orderPositionDto) {
        return new OrderPosition(
                orderPositionDto.id(),
                DishMapper.toDish(orderPositionDto.dish()),
                orderPositionDto.quantity()
        );
    }
    public static OrderPositionDto toOrderPositionDto(OrderPosition orderPosition) {
        return new OrderPositionDto(
                orderPosition.getId(),
                DishMapper.toDishDto(orderPosition.getDish()),
                orderPosition.getQuantity()
        );
    }




}
