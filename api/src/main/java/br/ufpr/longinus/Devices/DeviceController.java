package br.ufpr.longinus.Devices;

import java.sql.SQLException;
import java.util.List;

public class DeviceController {

    public DeviceController() {
    }

    public void create(Device device) throws SQLException {

        DeviceDAO deviceDao = new DeviceDAO();
        deviceDao.create(device);

    }

    public List<Device> list(int user_id) throws SQLException {

        DeviceDAO deviceDao = new DeviceDAO();
        return deviceDao.list(user_id);

    }

    public void update(Device device) throws SQLException {

        DeviceDAO deviceDao = new DeviceDAO();
        deviceDao.update(device);

    }

    public void delete(Device device) throws SQLException {

        DeviceDAO deviceDao = new DeviceDAO();
        deviceDao.delete(device);

    }

}
