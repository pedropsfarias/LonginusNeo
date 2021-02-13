package br.ufpr.longinus.Errors;

import br.ufpr.longinus.ConnectionFactory;
import br.ufpr.longinus.Devices.Device;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ErrorDAO {

    private Connection connection;
    private PreparedStatement stmtCreate;
    private PreparedStatement stmtList;
    private PreparedStatement stmtUpdate;
    private PreparedStatement stmtDelete;

    public ErrorDAO() throws SQLException {

        this.connection = ConnectionFactory.getConnection();
        this.stmtCreate = this.connection.prepareStatement("insert into errors (device_type,description,device_id) values (?,?,?)", Statement.RETURN_GENERATED_KEYS);
        this.stmtList = this.connection.prepareStatement("select id, device_type,description,device_id from errors");
        this.stmtUpdate = this.connection.prepareStatement("update errors set device_type=?, description=? where id=?;");
        this.stmtDelete = this.connection.prepareStatement("delete from errors where id=?;");

    }

    public void create(Error error) throws SQLException {

        this.stmtCreate.setInt(1, error.getErrorType());
        this.stmtCreate.setString(2, error.getDescription());
        this.stmtCreate.setInt(3, error.getDeviceId());

        this.stmtCreate.execute();

        ResultSet rs = stmtCreate.getGeneratedKeys();
        rs.next();
        int i = rs.getInt(1);
        error.setId(i);

    }

    public List<Error> list(int userId) throws SQLException {

        ResultSet rs = null;
        this.stmtList.setInt(1, userId);
        rs = this.stmtList.executeQuery();
        List<Error> devices = new ArrayList();

        while (rs.next()) {

            Error device = new Error();
            device.setId(rs.getInt("id"));
            device.setDescription(rs.getString("description"));
            device.setErrorType(rs.getInt("error_type"));
            device.setDeviceId(rs.getInt("device_id"));

            devices.add(device);

        }

        return devices;

    }

    public boolean delete(Error device) throws SQLException {

        int row = -1;
        this.stmtDelete.setInt(1, device.getId());
        row = this.stmtDelete.executeUpdate();

        if (row == -1) return false;

        return true;

    }

    public boolean update(Error device) throws SQLException {

        int row = -1;

        this.stmtUpdate.setInt(1, device.getErrorType());
        this.stmtUpdate.setString(2, device.getDescription());
        this.stmtUpdate.setInt(3, device.getId());

        row = this.stmtUpdate.executeUpdate();

        if (row == -1) return false;

        return true;

    }

}
