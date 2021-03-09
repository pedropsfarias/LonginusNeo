package br.ufpr.longinus.Users;

import com.google.gson.Gson;
import com.j256.ormlite.misc.SqlExceptionUtil;

import java.sql.SQLException;
import java.util.List;

import static spark.Spark.*;

public class UserService {

    public UserService() {

        UserController userController = new UserController();

        post("/user", (req, response) -> {

            Gson g = new Gson();
            User u = g.fromJson(req.body(), User.class);

            if (u == null) throw new Exception();

            try{

                userController.create(u);

            } catch (SQLException e ){

                response.type("application/json");
                response.status(200);
                return "{\"success\": false, \"message\": \"Existe um usuário com o email informado.\" }";

            }

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

            try{

                if(u.getHash() == null){
                    userController.update(u);
                } else {
                    userController.updateWithHash(u);
                }

            } catch (SQLException e ){

                response.type("application/json");
                response.status(200);
                return "{\"success\": false, \"message\": \"Existe um usuário com o email informado.\" }";

            }

            response.type("application/json");
            response.status(201);

            return "{\"success\": true}";

        });

        delete("/user", (req, response) -> {

            Gson g = new Gson();
            User u = g.fromJson(req.body(), User.class);

            if (u == null) throw new Exception();

            try{

                userController.delete(u);

            } catch (SQLException e ){

                response.type("application/json");
                response.status(200);
                return "{\"success\": false, \"message\": \"Existem dispositivos associados a esse usuário.\" }";

            }

            response.type("application/json");
            response.status(200);

            return "{\"success\": true}";

        });


    }
}
