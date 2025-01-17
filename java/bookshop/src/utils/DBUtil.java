package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
	// 数据库连接路径
	private static final String URL = "jdbc:mysql://127.0.0.1:3306/db_shops?characterEncoding=utf8&useSSL=false";
	private static final String NAME = "root";
	private static final String PASSWORD = "root";
	private static Connection conn = null;
	static{
        try {
            // 加载驱动程序
            Class.forName("com.mysql.jdbc.Driver");
            // 获取数据库的连接
            conn = DriverManager.getConnection(URL, NAME, PASSWORD);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
     }	    
	 public static Connection getConnection(){
		 return conn;	   
	 }

}
