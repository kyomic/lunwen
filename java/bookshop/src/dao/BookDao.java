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
	/** ���ͼ����Ϣ
	 * 
	 * @param book
	 * @throws Exception
	 */
	public void addBook( Book book ) throws Exception{
		// �����õ����ݿ������
        Connection con = DBUtil.getConnection();
        String sql="insert into tb_books"
        		// isbn��������ͼ��۸�ͼ�����ߡ�������
        		+ "(BOOK_isbn, BOOK_name, BOOK_price, BOOK_author, BOOK_publisher,"
        		+ "BOOK_type, BOOK_pic, BOOK_intro) "
        		+ "values("
        		+ "?,?,?,?,?,?,?,?)";       
        PreparedStatement psmt = con.prepareStatement(sql);
        // �ȶ�ӦSQL��䣬��SQL��䴫�ݲ���
        psmt.setString(1, book.isbn);
        psmt.setString(2, book.getBookName());
        psmt.setFloat(3, book.price);
        psmt.setString(4, book.author);
        psmt.setString(5, book.publisher);
        psmt.setString(6, book.type);       
        //ִ��SQL���
        psmt.execute();
	}
	
	/**
     * ɾ��ͼ����Ϣ(����ɾ�����)
     */
      public void removeBook(int ID) throws SQLException{
    	// �����õ����ݿ������
          Connection con=DBUtil.getConnection();
          String sql="update tb_books "
          		+ "set BOOK_Book_isdeleted = ?"
          		+ "where ID = ?";
          // Ԥ����sql���
          PreparedStatement psmt = con.prepareStatement(sql);
          // �ȶ�ӦSQL��䣬��SQL��䴫�ݲ���
          psmt.setInt(1, 1);
          psmt.setInt(9, ID);
          // ִ��SQL���
          psmt.execute();    
      }
      /**
       * Ӳɾ��ͼ��(�����ݿ�������ɾ����
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
	 * ����ͼ����Ϣ
	 */
    public void update(Book book) throws SQLException{
    	// �����õ����ݿ������
        Connection con=DBUtil.getConnection();
        String sql="update tb_books "
        		+ "set BOOK_isbn = ?, BOOK_name = ?, BOOK_price = ?, BOOK_author = ?"
                + ",BOOK_publisher = ?, BOOK_type = ?, BOOK_intro = ?"
        		+ "where ID = ?";
        // Ԥ����sql���
        PreparedStatement psmt = con.prepareStatement(sql);
        // �ȶ�ӦSQL��䣬��SQL��䴫�ݲ���
        psmt.setString(1, book.isbn);
        psmt.setString(2, book.getBookName());
        psmt.setFloat(3, book.price);
        psmt.setString(4, book.author);
        psmt.setString(5, book.publisher);
        psmt.setString(6, book.type);
        psmt.setString(7, book.intro);
        psmt.setInt(9, book.ID);
        // ִ��SQL���
        psmt.execute();    
    }
 
	        
 
	/**
	 * ��ѯ�鼮��Ϣ
	 */
	public List<Book> query( HashMap map ) throws Exception{	       
		Connection con = DBUtil.getConnection();	        
		Statement stmt = con.createStatement();	       
		ResultSet rs = stmt.executeQuery("select "
				// ΨһID,ISBN�����������ߡ�ͼ��۸񡢳�����
				+ "BOOK_ID, BOOK_ISBN, BOOK_name, BOOK_author, BOOK_price, BOOK_publisher, BOOK_intro "
				+ "from tb_books");	      
		List<Book> bookList = new ArrayList<Book>();	       
		Book book = null;	   
		// ��������������ݣ��ͻ�ѭ����ӡ����
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
