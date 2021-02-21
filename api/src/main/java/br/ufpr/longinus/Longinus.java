package br.ufpr.longinus;

import br.ufpr.longinus.Auth.AuthMidleware;
import br.ufpr.longinus.Devices.DeviceService;
import br.ufpr.longinus.Events.EventService;
import br.ufpr.longinus.Positions.PositionService;
import br.ufpr.longinus.Users.UserService;

import static spark.Spark.*;

public class Longinus {

    public static void main(String[] args) {

        setServices();
        setPreFlightHeaders();


    }

    public static void setServices() {

        AuthMidleware auth = new AuthMidleware();
        post("/auth", auth::login);
        put("/password", auth::changePassword);
        before(auth::handler); // Midleware de autenticação

        PositionService positionService = new PositionService();
        UserService userService = new UserService();
        DeviceService deviceService = new DeviceService();
        EventService eventService = new EventService();

    }

    public static void setPreFlightHeaders() {

        options("/*",
                (request, response) -> {

                    String accessControlRequestHeaders = request
                            .headers("Access-Control-Request-Headers");
                    if (accessControlRequestHeaders != null) {
                        response.header("Access-Control-Allow-Headers",
                                accessControlRequestHeaders);
                    }

                    String accessControlRequestMethod = request
                            .headers("Access-Control-Request-Method");
                    if (accessControlRequestMethod != null) {
                        response.header("Access-Control-Allow-Methods",
                                accessControlRequestMethod);
                    }

                    return "OK";
                });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
        before((request, response) -> response.header("Access-Control-Expose-Headers", "*"));

    }

}