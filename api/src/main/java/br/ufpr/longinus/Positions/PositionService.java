package br.ufpr.longinus.Positions;

import com.google.gson.Gson;

import java.util.List;

import static spark.Spark.*;
import static spark.Spark.post;

public class PositionService {

    public PositionService() {

        PositionController positionController = new PositionController();

        get("/position", (req, response) -> {

            try{

                int userId = req.attribute("user_id");
                List<Position> positions =  positionController.list(userId);

                Gson g = new Gson();
                String jsonInString = g.toJson(positions);

                return jsonInString;

            } catch (Exception e) {

                response.status(400);
                return "";

            }


        });


        post("/position", (req, response) -> {

            try {

                Gson g = new Gson();
                Position p = g.fromJson(req.body(), Position.class);

                if(p == null) throw new Exception();

                positionController.create(p);

                response.type("application/json");
                response.status(201);

                return "{\"success\": true}";


            } catch (Exception e) {

                System.out.println(e.toString());
                response.type("application/json");
                response.status(400);
                return "";

            }

        });




    }

}
