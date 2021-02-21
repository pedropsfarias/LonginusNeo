package br.ufpr.longinus.Events;

import java.sql.SQLException;
import java.util.List;

public class EventController {

    public EventController() {
    }

    public void create(Event event) throws SQLException {

        EventDAO eventDao = new EventDAO();
        eventDao.create(event);

    }

    public List<Event> list() throws SQLException {

        EventDAO eventDao = new EventDAO();
        return eventDao.list(0);

    }

    public void update(Event event) throws SQLException {

        EventDAO eventDao = new EventDAO();
        eventDao.update(event);

    }

    public void delete(Event event) throws SQLException {

        EventDAO eventDao = new EventDAO();
        eventDao.delete(event);

    }

}
