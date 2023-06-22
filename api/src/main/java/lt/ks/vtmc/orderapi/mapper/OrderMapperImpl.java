package lt.ks.vtmc.orderapi.mapper;

import lt.ks.vtmc.orderapi.order.Order;
import lt.ks.vtmc.orderapi.order.CreateOrderRequest;
import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;
import lt.ks.vtmc.orderapi.order.postitions.OrderPositionDto;
import lt.ks.vtmc.orderapi.rest.dto.OrderDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toOrder(CreateOrderRequest createOrderRequest) {
        if (createOrderRequest == null) {
            return null;
        }
        List<OrderPosition> orderPositionList = createOrderRequest.getPositions().stream()
                .map(OrderPositionMapper::toOrderPosition)
                .toList();

        return new Order(
                createOrderRequest.getDescription(),
                createOrderRequest.getClientName(),
                orderPositionList,
               null
        );
    }

    @Override
    public OrderDto toOrderDto(Order order) {
        if (order == null) {
            return null;
        }
        OrderDto.UserDto userDto = new OrderDto.UserDto(order.getUser().getUsername());
        List<OrderPositionDto> orderPositionDtoList= order.getPositions().stream()
                .map(OrderPositionMapper::toOrderPositionDto)
                .toList();
        return new OrderDto(
                order.getId(),
                order.getDescription(),
                order.getClientName(),
                userDto,
                order.getCreatedAt(),
                orderPositionDtoList,
                order.getConfirmed());
    }
}
