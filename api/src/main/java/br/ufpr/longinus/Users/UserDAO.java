package br.ufpr.longinus.Users;

import br.ufpr.longinus.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    private Connection connection;
    private PreparedStatement stmtCreate;
    private PreparedStatement stmtList;
    private PreparedStatement stmtUpdate;
    private PreparedStatement stmtUpdate2;
    private PreparedStatement stmtUpdateHash;
    private PreparedStatement stmtDelete;
    private PreparedStatement stmtGetUserLogin;

    public UserDAO() throws SQLException {

        this.connection = ConnectionFactory.getConnection();
        this.stmtCreate = this.connection.prepareStatement("insert into users (name,email,hash) values (?,?,?)", Statement.RETURN_GENERATED_KEYS);
        this.stmtList = this.connection.prepareStatement("select id, name, email from users");
        this.stmtGetUserLogin = this.connection.prepareStatement("select id, name from users where email = ? and hash = ?");
        this.stmtUpdate = this.connection.prepareStatement("update users set name=?, email=? where id=?;");
        this.stmtUpdate2 = this.connection.prepareStatement("update users set name=?, email=?, hash=? where id=?;");
        this.stmtUpdateHash = this.connection.prepareStatement("update users set hash=? where id=? and hash=?;");
        this.stmtDelete = this.connection.prepareStatement("delete from users where id=?;");

    }

    public void create(User user) throws SQLException {

        this.stmtCreate.setString(1, user.getName());
        this.stmtCreate.setString(2, user.getEmail());
        this.stmtCreate.setString(3, user.getHash());

        this.stmtCreate.execute();

        ResultSet rs = stmtCreate.getGeneratedKeys();
        rs.next();
        int i = rs.getInt(1);
        user.setId(i);

    }

    public User getUserLogin(String email, String hash) throws SQLException {

        this.stmtGetUserLogin.setString(1, email);
        this.stmtGetUserLogin.setString(2, hash);
        this.stmtGetUserLogin.execute();

        ResultSet rs = this.stmtGetUserLogin.executeQuery();
        rs.next();

        try {

            User user = new User();
            user.setId(rs.getInt(1));
            user.setName(rs.getString(2));
            user.setEmail(email);

            return user;

        } catch (Exception e) {

            return null;

        }

    }

    public List<User> listAll() throws SQLException {

        ResultSet rs = null;
        rs = this.stmtList.executeQuery();
        List<User> users = new ArrayList();

        while (rs.next()) {

            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));

            users.add(user);

        }

        return users;

    }

    public boolean delete(User user) throws SQLException {

        int row = -1;
        this.stmtDelete.setInt(1, user.getId());
        row = this.stmtDelete.executeUpdate();

        if (row == -1) return false;

        return true;

    }

    public boolean update(User user) throws SQLException {

        int row = -1;
        this.stmtUpdate.setString(1, user.getName());
        this.stmtUpdate.setString(2, user.getEmail());
        this.stmtUpdate.setInt(3, user.getId());
        row = this.stmtUpdate.executeUpdate();

        if (row == -1) return false;

        return true;

    }

    public boolean updateWithHash(User user) throws SQLException {

        int row = -1;
        this.stmtUpdate2.setString(1, user.getName());
        this.stmtUpdate2.setString(2, user.getEmail());
        this.stmtUpdate2.setString(3, user.getHash());
        this.stmtUpdate2.setInt(4, user.getId());
        row = this.stmtUpdate2.executeUpdate();

        if (row == -1) return false;

        return true;

    }


    public boolean changePassword(User user, String hash, String newhash) throws SQLException {

        int row = -1;
        this.stmtUpdateHash.setString(1, newhash);
        this.stmtUpdateHash.setInt(2, user.getId());
        this.stmtUpdateHash.setString(3, hash);
        row = this.stmtUpdateHash.executeUpdate();

        if (row == 1) return true;

        return false;

    }

}
