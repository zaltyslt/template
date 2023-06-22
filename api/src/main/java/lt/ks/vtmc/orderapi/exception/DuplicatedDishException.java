package lt.ks.vtmc.orderapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicatedDishException extends RuntimeException {

    public DuplicatedDishException(String message) {
        super(message);
    }
}
