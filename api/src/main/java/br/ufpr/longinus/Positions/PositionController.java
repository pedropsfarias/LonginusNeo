package br.ufpr.longinus.Positions;

import java.sql.SQLException;
import java.util.List;

public class PositionController {

    public PositionController() {
    }

    public void create(Position pos) throws SQLException {

        PositionDAO positionDao = new PositionDAO();
        positionDao.create(pos);

    }
    public List<Position> list(int userId) throws SQLException {

        PositionDAO positionDao = new PositionDAO();
        return positionDao.list(userId);

    }

}
