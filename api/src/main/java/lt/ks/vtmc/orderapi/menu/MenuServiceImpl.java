package lt.ks.vtmc.orderapi.menu;

import lt.ks.vtmc.orderapi.dish.Dish;
import lt.ks.vtmc.orderapi.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.menu.positions.MenuPosition;
import lt.ks.vtmc.orderapi.menu.positions.MenuPositionRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MenuServiceImpl {
    private final MenuRepository menuRepository;
    private final MenuPositionRepository positionRepository;

    public List<Menu> getMenus() {
        return menuRepository.findAll();
    }

    public List<Menu> getMenusByTitleContaining(String partString) {
        var aa =  menuRepository.findByTitleContainingIgnoreCaseOrderByTitleAsc(partString);
        return aa;
    }

    public boolean menusExist() {
        return menuRepository.findAll().size() > 0;
    }

    public Menu getMenuById(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Menu Id: %s not found", id)));
    }

    public boolean menuExistByTitle(String title) {
        return menuRepository.existsByTitleIgnoreCase(title);
    }

    public void createMenu(Menu menu) {
        if (menuExistByTitle(menu.getTitle())) {
            throw new DuplicateKeyException(String.format("Menu with title %s already exists  ", menu.getTitle()));
        }
        this.saveMenu(menu);
    }

    public void saveMenu(Menu menu) {
        menuRepository.save(menu);
    }

    public void deleteMenu(Long menuId) {
        if (!menuRepository.existsById(menuId)) {
            throw new EntityNotFoundException("Menu does not exists!");
        }
        menuRepository.deleteById(menuId);
    }

    public List<Menu> updateMenu(Menu updateMenuRequest) {
        Menu menuToUpdate = getMenuById(updateMenuRequest.getId());
        List<MenuPosition> positions = updateMenuRequest.getPositions();

        saveToPositions(positions);

        for (MenuPosition position : positions) {
            MenuPosition tempPosition = positionRepository.findById(position.getId()).get();

        }
        menuToUpdate.setPositions(positions);
        menuRepository.save(menuToUpdate);

        return getMenus();
    }

    public void saveToPositions(MenuPosition position) {
        positionRepository.save(position);
    }

    public void saveToPositions(List<MenuPosition> positions) {
        positionRepository.saveAll(positions);
    }
}
