package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import utils.DBUtil;
import model.Book;

public class BookDao {
	/** 添加图书信息
	 * 
	 * @param book
	 * @throws Exception
	 */
	public void addBook( Book book ) throws Exception{
		// 首先拿到数据库的连接
        Connection con = DBUtil.getConnection();
        String sql="insert into tb_books"
        		// isbn、书名、图书价格、图书作者、出版社
        		+ "(BOOK_isbn, BOOK_name, BOOK_price, BOOK_author, BOOK_publisher,"
        		+ "BOOK_type, BOOK_pic, BOOK_intro) "
        		+ "values("
        		+ "?,?,?,?,?,?,?,?)";       
        PreparedStatement psmt = con.prepareStatement(sql);
        // 先对应SQL语句，给SQL语句传递参数
        psmt.setString(1, book.isbn);
        psmt.setString(2, book.getBookName());
        psmt.setFloat(3, book.price);
        psmt.setString(4, book.author);
        psmt.setString(5, book.publisher);
        psmt.setString(6, book.type);       
        //执行SQL语句
        psmt.execute();
	}
	
	/**
     * 删除图书信息(设置删除标记)
     */
      public void removeBook(int ID) throws SQLException{
    	// 首先拿到数据库的连接
          Connection con=DBUtil.getConnection();
          String sql="update tb_books "
          		+ "set BOOK_Book_isdeleted = ?"
          		+ "where ID = ?";
          // 预编译sql语句
          PreparedStatement psmt = con.prepareStatement(sql);
          // 先对应SQL语句，给SQL语句传递参数
          psmt.setInt(1, 1);
          psmt.setInt(9, ID);
          // 执行SQL语句
          psmt.execute();    
      }
      /**
       * 硬删除图书(从数据库中物理删除）
       * @param ID
       */
      public void removeFromDB(int ID) throws SQLException{
          Connection con= DBUtil.getConnection();
          String sql="DELETE FROM tb_books WHERE ID = ?";
          PreparedStatement psmt = con.prepareStatement(sql);
          psmt.setInt(1, ID);
          psmt.execute();    
      }
	    
 
	/**
	 * 更新图书信息
	 */
    public void update(Book book) throws SQLException{
    	// 首先拿到数据库的连接
        Connection con=DBUtil.getConnection();
        String sql="update tb_books "
        		+ "set BOOK_isbn = ?, BOOK_name = ?, BOOK_price = ?, BOOK_author = ?"
                + ",BOOK_publisher = ?, BOOK_type = ?, BOOK_intro = ?"
        		+ "where ID = ?";
        // 预编译sql语句
        PreparedStatement psmt = con.prepareStatement(sql);
        // 先对应SQL语句，给SQL语句传递参数
        psmt.setString(1, book.isbn);
        psmt.setString(2, book.getBookName());
        psmt.setFloat(3, book.price);
        psmt.setString(4, book.author);
        psmt.setString(5, book.publisher);
        psmt.setString(6, book.type);
        psmt.setString(7, book.intro);
        psmt.setInt(9, book.ID);
        // 执行SQL语句
        psmt.execute();    
    }
 
	        
 
	/**
	 * 查询书籍信息
	 */
	public List<Book> query( HashMap map ) throws Exception{	       
		Connection con = DBUtil.getConnection();	        
		Statement stmt = con.createStatement();	       
		ResultSet rs = stmt.executeQuery("select "
				// 唯一ID,ISBN、书名、作者、图书价格、出版社
				+ "BOOK_ID, BOOK_ISBN, BOOK_name, BOOK_author, BOOK_price, BOOK_publisher, BOOK_intro "
				+ "from tb_books");	      
		List<Book> bookList = new ArrayList<Book>();	       
		Book book = null;	   
		// 如果对象中有数据，就会循环打印出来
		while (rs.next()){	           
			book = new Book();	     
			book.ID = rs.getInt("BOOK_ID");
			book.isbn = rs.getString("BOOK_ISBN");
			book.setBookName(rs.getString("BOOK_name"));	       
			book.author = rs.getString("BOOK_author");
			book.price = rs.getFloat("BOOK_price");
			book.publisher = rs.getString("BOOK_publisher");
			book.type = rs.getString("BOOK_intro");
			bookList.add(book);      
		}	       
		return bookList;	  
	}
}
