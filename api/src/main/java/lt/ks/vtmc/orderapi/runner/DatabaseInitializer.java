package lt.ks.vtmc.orderapi.runner;

import lt.ks.vtmc.orderapi.dish.Dish;
import lt.ks.vtmc.orderapi.dish.DishService;
import lt.ks.vtmc.orderapi.menu.positions.MenuPosition;
import lt.ks.vtmc.orderapi.menu.MenuServiceImpl;
import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;
import lt.ks.vtmc.orderapi.user.User;
import lt.ks.vtmc.orderapi.order.Order;
import lt.ks.vtmc.orderapi.order.OrderRepository;
import lt.ks.vtmc.orderapi.security.WebSecurityConfig;
import lt.ks.vtmc.orderapi.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.ks.vtmc.orderapi.menu.Menu;
import lt.ks.vtmc.orderapi.menu.positions.MenuPositionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final DishService dishService;
    private final MenuServiceImpl menuService;
    private final PasswordEncoder passwordEncoder;
    private final MenuPositionRepository positionRepository;
    private final OrderRepository orderRepository;
    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "Admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "User", "user@mycompany.com", WebSecurityConfig.USER)

    );

    private static final List<Dish> DISHES = Arrays.asList(
            new Dish("Valgis1", "Košė"),
            new Dish("Valgis2", "Kugelis"),
            new Dish("Valgis3", "Kompotas")
    );

//    private static final List<Dish> POSITIONS = Arrays.asList(
//           new MenuPosition(1L, new Dish(1L,"Valgis1","Košė"),
//            new Dish(2L,"Valgis2","Kugelis"),
//            new Dish(3L,"Valgis3","Kompotas")
//    );

    @Override
    public void run(String... args) {
        if (userService.getUsers().isEmpty()) {

            USERS.forEach(user -> {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(user);
            });
        }
        if (dishService.getAllDishes().isEmpty()) {

            DISHES.forEach(dish -> {
                dishService.createDish(dish);
            });
        }
        if (!menuService.menusExist()) {

            MenuPosition position1 = new MenuPosition(DISHES.get(0), 3);
            MenuPosition position2 = new MenuPosition(DISHES.get(1), 1);
            MenuPosition position3 = new MenuPosition(DISHES.get(2), 4);

            positionRepository.saveAll(Arrays.asList(position1, position2, position3));

            Menu menu1 = new Menu(null, "Pirmas", Arrays.asList(position1, position2));
            Menu menu2 = new Menu(null, "Antras", List.of(position3));
            menuService.saveMenu(menu1);
            menuService.saveMenu(menu2);

//            User guest = new User("guest", "", "GuestUser", "", WebSecurityConfig.GUEST);
//           userService.saveUser(guest);
//
//            Order order1 = new Order();
//            order1.setId(UUID.randomUUID().toString());
//            order1.setUser(guest);
//            order1.setClientName("Quest");
//            order1.setDescription("by quest");
//            order1.setPositions(Arrays.asList((OrderPosition) position1, position2));
//            orderRepository.save(order1);
        }

        log.info("Database initialized");
    }

}
