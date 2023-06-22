package lt.ks.vtmc.orderapi.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lt.ks.vtmc.orderapi.menu.positions.MenuPosition;
import lt.ks.vtmc.orderapi.order.postitions.OrderPosition;
import lt.ks.vtmc.orderapi.order.postitions.OrderPositionDto;

import java.util.List;

@Data
public class CreateOrderRequest {

    @Schema(example = "Buy two iPhones")
    private Long id;
    @NotBlank
    private String description;
    private String clientName;
    private List<OrderPositionDto> positions;
    private Boolean confirmed;

}
