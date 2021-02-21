package br.ufpr.longinus.Events;

import com.google.gson.Gson;

import java.util.List;

import static spark.Spark.*;

public class EventService {

    public EventService() {

        EventController eventController = new EventController();

        post("/user", (req, response) -> {

            Gson g = new Gson();
            Event e = g.fromJson(req.body(), Event.class);

            if (e == null) throw new Exception();

            eventController.create(e);

            response.type("application/json");
            response.status(201);

            return "";

        });

        get("/user", (req, response) -> {

            List<Event> users = eventController.list();

            Gson g = new Gson();
            String jsonInString = g.toJson(users);

            return jsonInString;

        });

        put("/user", (req, response) -> {

            Gson g = new Gson();
            Event e = g.fromJson(req.body(), Event.class);

            if (e == null) throw new Exception();

            eventController.update(e);

            response.type("application/json");
            response.status(201);

            return "";

        });

        delete("/user", (req, response) -> {

            Gson g = new Gson();
            Event e = g.fromJson(req.body(), Event.class);

            if (e == null) throw new Exception();

            eventController.delete(e);

            response.type("application/json");
            response.status(200);

            return "{\"success\": true}";

        });


    }
}
