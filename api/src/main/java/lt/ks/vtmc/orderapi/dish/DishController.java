package lt.ks.vtmc.orderapi.dish;

import lt.ks.vtmc.orderapi.mapper.DishMapper;
import lt.ks.vtmc.orderapi.security.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.config.SwaggerConfig;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dishes")
public class DishController {

    private final DishServiceImpl dishService;

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<DishDto> getAllDishes() {
    return dishService.getAllDishes().stream()
            .map(dish -> DishMapper.toDishDto(dish)).toList();
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void createDish(@AuthenticationPrincipal CustomUserDetails currentUser,
                              @Valid
                              @RequestBody DishDto dishDto) {
        dishService.createDish(DishMapper.toDish(dishDto));
    }

//    public List<Dish> getAllAvailableDishes(@RequestParam(value = "text", required = false) String text) {
//        List<Order> orders = (text == null) ? orderService.getOrders() : orderService.getOrdersContainingText(text);
//
//        var result = orders.stream()
//                .map(orderMapper::toOrderDto)
//                .collect(Collectors.toList());
//        return result;
//    }

//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping
//    public OrderDto createOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
//                                @Valid @RequestBody String createOrderRequest) {
//       var aa = createOrderRequest;
//        return new OrderDto("1L", "test", new OrderDto.UserDto(null), ZonedDateTime.now());
//    }

//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping
//    public OrderDto createOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
//                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {
//        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        Order order = orderMapper.toOrder(createOrderRequest);
//        order.setId(UUID.randomUUID().toString());
//        order.setUser(user);
//        return orderMapper.toOrderDto(orderService.saveOrder(order));
//    }
//
//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @DeleteMapping("/{id}")
//    public OrderDto deleteOrders(@PathVariable UUID id) {
//        Order order = orderService.validateAndGetOrder(id.toString());
//        orderService.deleteOrder(order);
//        return orderMapper.toOrderDto(order);
//    }
}
