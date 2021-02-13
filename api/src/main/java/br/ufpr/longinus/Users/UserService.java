package br.ufpr.longinus.Users;

import com.google.gson.Gson;

import java.util.List;

import static spark.Spark.*;

public class UserService {

    public UserService() {

        UserController userController = new UserController();

        post("/user", (req, response) -> {

            Gson g = new Gson();
            User u = g.fromJson(req.body(), User.class);

            if (u == null) throw new Exception();

            userController.create(u);

            response.type("application/json");
            response.status(201);

            return "{\"success\": true}";

        });

        get("/user", (req, response) -> {

            List<User> users = userController.list();

            Gson g = new Gson();
            String jsonInString = g.toJson(users);

            return jsonInString;

        });

        put("/user", (req, response) -> {

            Gson g = new Gson();
            User u = g.fromJson(req.body(), User.class);

            if (u == null) throw new Exception();

            userController.update(u);

            response.type("application/json");
            response.status(201);

            return "{\"success\": true}";

        });

        delete("/user", (req, response) -> {

            Gson g = new Gson();
            User u = g.fromJson(req.body(), User.class);

            if (u == null) throw new Exception();

            userController.delete(u);

            response.type("application/json");
            response.status(200);

            return "{\"success\": true}";

        });


    }
}
