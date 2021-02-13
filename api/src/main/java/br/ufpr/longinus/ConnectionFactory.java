package br.ufpr.longinus;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    private static ConnectionFactory instance;
    private Connection connection;

    public ConnectionFactory() {

        try {
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/longinus", "postgres", "Engefoto#750");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public static ConnectionFactory getInstance(){

        if(instance == null){
            instance = new ConnectionFactory();
        }

        return instance;

    }

    public static synchronized Connection getConnection() {

        ConnectionFactory connectionFactory = getInstance();
        return connectionFactory.connection;

    }

}

