package br.ufpr.longinus.Errors;

import java.sql.SQLException;
import java.util.List;

public class ErrorController {

    public ErrorController() {
    }

    public void create(Error error) throws SQLException {

        ErrorDAO errorDao = new ErrorDAO();
        errorDao.create(error);

    }

    public List<Error> list() throws SQLException {

        ErrorDAO errorDao = new ErrorDAO();
        return errorDao.list(0);

    }

    public void update(Error error) throws SQLException {

        ErrorDAO errorDao = new ErrorDAO();
        errorDao.update(error);

    }

    public void delete(Error error) throws SQLException {

        ErrorDAO errorDao = new ErrorDAO();
        errorDao.delete(error);

    }

}
