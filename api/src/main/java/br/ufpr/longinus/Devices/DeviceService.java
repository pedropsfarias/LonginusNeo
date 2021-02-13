package br.ufpr.longinus.Devices;

import com.google.gson.Gson;

import java.util.List;

import static spark.Spark.*;

public class DeviceService {

    public DeviceService() {

        DeviceController deviceController = new DeviceController();

        post("/device", (req, response) -> {

            Gson g = new Gson();
            Device d = g.fromJson(req.body(), Device.class);
            int userId = req.attribute("user_id");

            if (d == null) throw new Exception();

            d.setUserId(userId);
            deviceController.create(d);

            response.type("application/json");
            response.status(201);

            return "{\"success\": true}";

        });

        get("/device", (req, response) -> {

            int userId = req.attribute("user_id");

            List<Device> users = deviceController.list(userId);

            Gson g = new Gson();
            String jsonInString = g.toJson(users);

            return jsonInString;

        });

        put("/device", (req, response) -> {

            Gson g = new Gson();
            Device d = g.fromJson(req.body(), Device.class);

            if (d == null) throw new Exception();

            deviceController.update(d);

            response.type("application/json");
            response.status(201);

            return "{\"success\": true}";

        });

        delete("/device", (req, response) -> {

            Gson g = new Gson();
            Device d = g.fromJson(req.body(), Device.class);

            if (d == null) throw new Exception();

            deviceController.delete(d);

            response.type("application/json");
            response.status(200);

            return "{\"success\": true}";

        });


    }
}
