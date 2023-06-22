package lt.ks.vtmc.orderapi.menu;

import lt.ks.vtmc.orderapi.order.Order;
import lt.ks.vtmc.orderapi.security.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lt.ks.vtmc.orderapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final MenuServiceImpl menuService;

    //    private final UserMapper userMapper;
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<Menu> getMenus(@RequestParam(value = "text", required = false) String text) {
        List<Menu> menus = (text == null) ? menuService.getMenus() : menuService.getMenusByTitleContaining(text);
//        var menus = menuService.getMenus();
        return menus;
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping ("/create")
    public List<Menu> createMenu( /* @AuthenticationPrincipal CustomUserDetails currentUser, */
                                     @Valid @RequestBody Menu createMenuRequest) {
        if(createMenuRequest.getId() == null){
            menuService.createMenu(createMenuRequest);
        } else {
            menuService.updateMenu(createMenuRequest);
        }

        return menuService.getMenus();
    }
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.OK) //koks kodas?
    @DeleteMapping ("/delete")
    public List<Menu> deleteMenu(//@AuthenticationPrincipal CustomUserDetails currentUser,@Valid @RequestBody Long menuToDeleteId
                                 @RequestParam(value = "id", required = false) Long menuId ) {
        menuService.deleteMenu(menuId);
//        List<Menu> resp = menuService.getMenus();
        return menuService.getMenus();
    }

//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @GetMapping
//    public List<UserDto> getUsers() {
//        return userService.getUsers().stream()
//                .map(userMapper::toUserDto)
//                .collect(Collectors.toList());
//    }
//
//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @GetMapping("/{username}")
//    public UserDto getUser(@PathVariable String username) {
//        return userMapper.toUserDto(userService.validateAndGetUserByUsername(username));
//    }
//
//    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
//    @DeleteMapping("/{username}")
//    public UserDto deleteUser(@PathVariable String username) {
//        User user = userService.validateAndGetUserByUsername(username);
//        userService.deleteUser(user);
//        return userMapper.toUserDto(user);
//    }
}
