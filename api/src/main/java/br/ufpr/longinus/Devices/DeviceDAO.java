package br.ufpr.longinus.Devices;

import br.ufpr.longinus.ConnectionFactory;
import br.ufpr.longinus.Users.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DeviceDAO {

    private Connection connection;
    private PreparedStatement stmtCreate;
    private PreparedStatement stmtList;
    private PreparedStatement stmtUpdate;
    private PreparedStatement stmtUpdateHash;
    private PreparedStatement stmtDelete;
    private PreparedStatement stmtGetUserLogin;

    public DeviceDAO() throws SQLException {

        this.connection = ConnectionFactory.getConnection();
        this.stmtCreate = this.connection.prepareStatement("insert into devices (device_type,description,user_id) values (?,?,?)", Statement.RETURN_GENERATED_KEYS);
        this.stmtList = this.connection.prepareStatement("select id, device_type,description from devices where user_id=? order by id ;");
        this.stmtUpdate = this.connection.prepareStatement("update devices set device_type=?, description=? where id=?;");
        this.stmtDelete = this.connection.prepareStatement("delete from devices where id=?;");

    }

    public void create(Device device) throws SQLException {

        this.stmtCreate.setString(1, device.getDeviceType());
        this.stmtCreate.setString(2, device.getDescription());
        this.stmtCreate.setInt(3, device.getUserId());

        this.stmtCreate.execute();

        ResultSet rs = stmtCreate.getGeneratedKeys();
        rs.next();
        int i = rs.getInt(1);
        device.setId(i);

    }

    public List<Device> list(int userId) throws SQLException {

        ResultSet rs = null;
        this.stmtList.setInt(1, userId);
        rs = this.stmtList.executeQuery();
        List<Device> devices = new ArrayList();

        while (rs.next()) {

            Device device = new Device();
            device.setId(rs.getInt("id"));
            device.setDescription(rs.getString("description"));
            device.setDeviceType(rs.getString("device_type"));
            device.setUserId(userId);

            devices.add(device);

        }

        return devices;

    }

    public boolean delete(Device device) throws SQLException {


        int row = -1;
        this.stmtDelete.setInt(1, device.getId());
        row = this.stmtDelete.executeUpdate();

        if (row == -1) return false;

        return true;

    }

    public boolean update(Device device) throws SQLException {

        int row = -1;

        this.stmtUpdate.setString(1, device.getDeviceType());
        this.stmtUpdate.setString(2, device.getDescription());
        this.stmtUpdate.setInt(3, device.getId());

        row = this.stmtUpdate.executeUpdate();

        if (row == -1) return false;

        return true;

    }

}
