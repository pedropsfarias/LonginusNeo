package br.ufpr.longinus.Auth;

import br.ufpr.longinus.Users.User;
import br.ufpr.longinus.Users.UserDAO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;

import java.sql.SQLException;

import static spark.Spark.halt;

public class AuthMidleware {

    Algorithm algorithm = Algorithm.HMAC256("A1S$nh@9eH9F@r0fA5");

    public AuthMidleware() {
    }

    public void handler(Request request, Response response) {

        String token = request.headers("token");

        if (token != null) {

            int userId = this.getUserIdToken(token);

            if(userId == -1){

                response.type("application/json");
                halt(401, "{\"success\": false, \"message\": \"Não autorizado.\"}");

            }

            request.attribute("user_id", userId);

        } else {

            String path = request.pathInfo();
            String method = request.requestMethod();

            if (!path.equals("/auth") && method != "OPTIONS") {

                response.type("application/json");
                halt(401, "{\"success\": false, \"message\": \"Não autorizado.\"}");

            }

        }

    }

    public String login(Request request, Response response) throws SQLException {

        String jsonInString;
        String email = request.headers("email");
        String hash = request.headers("hash");

        if (email == null || hash == null) {

            halt(400);

        }

        UserDAO dao = new UserDAO();
        User user = dao.getUserLogin(email, hash);

        if (user != null) {

            String token = this.generateToken(user);

            if (token == null) halt(500);

            response.header("token", token);
            response.type("application/json");

            Gson g = new Gson();
            jsonInString = g.toJson(user);

            return jsonInString;

        } else {

            response.type("application/json");
            response.status(401);
            return "{\"success\": false, \"message\": \"Email e/ou senha incorreto(s).\"}";

        }

    }

    private boolean isTokenValid(String token) {

        try {

            JWTVerifier verifier = JWT.require(this.algorithm)
                    .withIssuer("auth0")
                    .build();

            DecodedJWT jwt = verifier.verify(token);

            return true;

        } catch (JWTVerificationException exception) {

            return false;

        }

    }

    private int getUserIdToken(String token) {

        try {

            JWTVerifier verifier = JWT.require(this.algorithm)
                    .withIssuer("auth0")
                    .build();

            DecodedJWT jwt = verifier.verify(token);
            Claim claim = jwt.getClaim("user_id");

            return claim.asInt();

        } catch (JWTVerificationException exception) {

            return -1;

        }

    }

    public String generateToken(User user) {

        try {

            String token = JWT.create()
                    .withClaim("user_id", user.getId())
                    .withClaim("random", Math.random())
                    .withIssuer("auth0")
                    .sign(this.algorithm);

            user.setToken(token);

            return token;

        } catch (JWTCreationException exception) {

            return null;

        }

    }

    public String changePassword (Request request, Response response) throws Exception {

        Gson g = new Gson();
        User u = g.fromJson(request.body(), User.class);
        String hash = request.headers("hash");
        String newhash = request.headers("newhash");

        if (u == null) throw new Exception();

        UserDAO dao = new UserDAO();
        Boolean changed =  dao.changePassword(u, hash, newhash);

        response.type("application/json");
        response.status(200);


        if(changed){

            return "{\"success\": true, \"message\": \"Senha alterada.\"}";

        } else {

            return "{\"success\": false, \"message\": \"Não autorizado.\"}";

        }

    }
}
