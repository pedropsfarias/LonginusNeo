package br.ufpr.longinus.Users;

import java.sql.SQLException;
import java.util.List;

public class UserController {

    public UserController() {
    }

    public void create(User user) throws SQLException {

        UserDAO userDao = new UserDAO();
        userDao.create(user);

    }

    public List<User> list() throws SQLException {

        UserDAO userDao = new UserDAO();
        return userDao.listAll();

    }

    public void update(User user) throws SQLException {

        UserDAO userDao = new UserDAO();
        userDao.update(user);

    }

    public void delete(User user) throws SQLException {

        UserDAO userDao = new UserDAO();
        userDao.delete(user);

    }

}
