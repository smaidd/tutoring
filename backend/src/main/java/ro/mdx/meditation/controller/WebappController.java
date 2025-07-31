package ro.mdx.meditation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebappController {
    @GetMapping("")
    public String redirectToIndex() {
        return "redirect:/tutoring/index.html";
    }
}
