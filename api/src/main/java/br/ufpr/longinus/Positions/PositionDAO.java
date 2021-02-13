package br.ufpr.longinus.Positions;

import br.ufpr.longinus.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PositionDAO {

    private Connection connection;
    private PreparedStatement stmtCreate;
    private PreparedStatement stmtList;
    private PreparedStatement stmtUpdate;
    private PreparedStatement stmtDelete;


    public PositionDAO() throws SQLException {

        this.connection = ConnectionFactory.getConnection();
        this.stmtCreate = this.connection.prepareStatement("insert into positions (latitude,longitude,altitude,accuracy,altitudeAccuracy,heading,speed,timestamp,device_id) values (?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
        this.stmtList = this.connection.prepareStatement("SELECT DISTINCT ON (t.device_id) * FROM   (select p.*  from positions p right join devices d on p.device_id = d.id  where d.user_id = ?) t ORDER  BY t.device_id, t.\"timestamp\" DESC NULLS LAST;\n");

    }

    public void create(Position position) throws SQLException {

        this.stmtCreate.setDouble(1, position.getLatitude());
        this.stmtCreate.setDouble(2, position.getLongitude());
        this.stmtCreate.setFloat(3, position.getAltitude());
        this.stmtCreate.setFloat(4, position.getAccuracy());
        this.stmtCreate.setFloat(5, position.getAltitudeAccuracy());
        this.stmtCreate.setFloat(6, position.getHeading());
        this.stmtCreate.setFloat(7, position.getSpeed());
        this.stmtCreate.setString(8, position.getTimestamp());
        this.stmtCreate.setInt(9, position.getDevice_id());

        this.stmtCreate.execute();

        ResultSet rs = stmtCreate.getGeneratedKeys();
        rs.next();
        int i = rs.getInt(1);
        position.setId(i);

    }

    public List<Position> list(int userId) throws SQLException {

        ResultSet rs = null;
        this.stmtList.setInt(1, userId);
        rs = this.stmtList.executeQuery();
        List<Position> positions = new ArrayList();

        while (rs.next()) {

            Position pos = new Position();
            pos.setId(rs.getInt("id"));
            pos.setLatitude(rs.getDouble("latitude"));
            pos.setLongitude(rs.getDouble("longitude"));
            pos.setAltitude(rs.getFloat("altitude"));
            pos.setAccuracy(rs.getFloat("accuracy"));
            pos.setAltitudeAccuracy(rs.getFloat("altitudeAccuracy"));
            pos.setHeading(rs.getFloat("heading"));
            pos.setSpeed(rs.getFloat("speed"));
            pos.setTimestamp(rs.getString("timestamp"));
            pos.setDevice_id(rs.getInt("device_id"));

            positions.add(pos);

        }

        return positions;


    }


}
