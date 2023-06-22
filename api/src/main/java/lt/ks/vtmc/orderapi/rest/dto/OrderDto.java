package lt.ks.vtmc.orderapi.rest.dto;

import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;
import lt.ks.vtmc.orderapi.order.postitions.OrderPositionDto;

import java.time.ZonedDateTime;
import java.util.List;

public record OrderDto(String id,
                       String description,
                       String clientName,
                       OrderDto.UserDto user,
                       ZonedDateTime createdAt,
                       List<OrderPositionDto> positions,
                       Boolean confirmed
) {

    public record UserDto(String username) {
    }
}