package lt.ks.vtmc.orderapi.rest;

import jakarta.validation.Valid;
import lt.ks.vtmc.orderapi.menu.Menu;
import lt.ks.vtmc.orderapi.menu.MenuServiceImpl;
import lt.ks.vtmc.orderapi.order.CreateOrderRequest;
import lt.ks.vtmc.orderapi.order.OrderService;
import lt.ks.vtmc.orderapi.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor

@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;
    private final OrderService orderService;
    protected final MenuServiceImpl menuService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() throws InterruptedException {
        var users = userService.getUsers().size();
        return users;
    }

    @GetMapping("/numberOfOrders")
    public Integer getNumberOfOrders() {

        return orderService.getOrders().size();
    }

    @GetMapping("/menus")
    public List<Menu> getMenus() {

        return menuService.getMenus();
    }
//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/order")
    public void createOrder(
//            @AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {
        var aa = createOrderRequest;
//        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        Order order = orderMapper.toOrder(createOrderRequest);
//        order.setId(UUID.randomUUID().toString());
//        order.setUser(user);
//        return orderMapper.toOrderDto(orderService.saveOrder(order));

    }
}
