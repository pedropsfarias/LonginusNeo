package br.ufpr.longinus.Errors;

import com.google.gson.Gson;

import java.util.List;

import static spark.Spark.*;

public class ErrorService {

    public ErrorService() {

        ErrorController errorController = new ErrorController();

        post("/user", (req, response) -> {

            Gson g = new Gson();
            Error e = g.fromJson(req.body(), Error.class);

            if (e == null) throw new Exception();

            errorController.create(e);

            response.type("application/json");
            response.status(201);

            return "";

        });

        get("/user", (req, response) -> {

            List<Error> users = errorController.list();

            Gson g = new Gson();
            String jsonInString = g.toJson(users);

            return jsonInString;

        });

        put("/user", (req, response) -> {

            Gson g = new Gson();
            Error e = g.fromJson(req.body(), Error.class);

            if (e == null) throw new Exception();

            errorController.update(e);

            response.type("application/json");
            response.status(201);

            return "";

        });

        delete("/user", (req, response) -> {

            Gson g = new Gson();
            Error e = g.fromJson(req.body(), Error.class);

            if (e == null) throw new Exception();

            errorController.delete(e);

            response.type("application/json");
            response.status(200);

            return "{\"success\": true}";

        });


    }
}
