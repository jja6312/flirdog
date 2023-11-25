package admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AdminController.class) // AdminController 클래스에 대한 웹 MVC 테스트 어노테이션
@ContextConfiguration(classes = AdminController.class) // AdminController 클래스를 컨텍스트에 등록
public class AdminControllerTest {
    @Autowired
    private MockMvc mockMvc;

    // @Test
    // public void testGo_ShouldReturnSum() throws Exception {
    //     mockMvc.perform(MockMvcRequestBuilders.get("/admin/testGo"))
    //             .andExpect(MockMvcResultMatchers.status().isOk())
    //             .andExpect(MockMvcResultMatchers.content().string("2"));
    // }

}
