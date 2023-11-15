import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import product.controller.ProductController;
import user.controller.UserController;


@WebMvcTest(controllers = {
    UserController.class,
    ProductController.class
})
public abstract class ControllerTestSupport {

}
