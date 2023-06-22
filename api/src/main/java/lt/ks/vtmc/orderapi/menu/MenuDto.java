package lt.ks.vtmc.orderapi.menu;
import lt.ks.vtmc.orderapi.dish.Dish;

import java.util.Map;

public record MenuDto(
            Long id,
            String title,
//            ZonedDateTime createdAt,
//            UserDto user
             Map<Dish,Integer> dishes

    ){


    }



//    public record UserDto(Long id, String username, String name, String email, String role, List<com.ivanfranchin.orderapi.rest.dto.UserDto.OrderDto> orders) {
//
//        public record OrderDto(String id, String description, ZonedDateTime createdAt) {
//        }
//    }