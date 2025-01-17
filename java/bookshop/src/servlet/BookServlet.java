package novels; 
 
import java.util.concurrent.ConcurrentMap; 

import javax.servlet.ServletException; 
import javax.servlet.http.HttpServlet; 
import javax.servlet.http.HttpServletRequest; 
import javax.servlet.http.HttpServletResponse; 

import java.util.Arrays; 
import java.util.HashMap;
import java.io.ByteArrayInputStream; 
import java.io.ByteArrayOutputStream; 
import java.io.OutputStream; 
import java.io.BufferedReader; 
import java.io.InputStreamReader; 
import java.beans.XMLEncoder; 

import model.Book;

import org.json.JSONObject;
import org.json.XML; 

import dao.BookDao;
 
public class BookServlet extends HttpServlet { 
    static final long serialVersionUID = 1L; 
    private BookDao dao;
    @Override 
    public void init() { 
        this.dao = new BookDao();
    } 
 
    // GET /admin/book/list/?name
    @Override 
    public void doGet(HttpServletRequest request, HttpServletResponse response) { 
        String param = request.getParameter("name"); 
        Integer key = (param == null) ? null : Integer.valueOf((param.trim())); 
        boolean json = false; 
        String accept = request.getHeader("accept"); 
        if (accept != null && accept.contains("json")) json = true; 
        String payload = "";
        Object list = null;
        if (key == null) {            
            list = this.dao.query(null);
            if (json) payload = JSONObject.fromObject(list);          
        } 
        // Otherwise, return the specified Novel. 
        else { 
        	HashMap map = new HashMap();
        	map.put(0, key);
            list = this.dao.query(map);
        } 
        this.sendResponse(response, payload); 
    } 
 
    // POST /admin/book/modify/
    @Override 
    public void doPost(HttpServletRequest request, HttpServletResponse response) { 
        String name = request.getParameter("name"); 
        Float price = Float.parseFloat(request.getParameter("price")); 
        if (name == null ) 
            throw new RuntimeException(Integer.toString(HttpServletResponse.SC_BAD_REQUEST)); 
        
        Book book = new Book();
        book.setBookName(name);
        book.price = price;
        this.dao.update(book);
        String payload = (String)("{status:200}");
        this.sendResponse(response, payload ); 
    }  
 
    // Methods Not Allowed 
    @Override 
    public void doTrace(HttpServletRequest request, HttpServletResponse response) { 
        throw new RuntimeException(Integer.toString(HttpServletResponse.SC_METHOD_NOT_ALLOWED)); 
    } 
 
    @Override 
    public void doHead(HttpServletRequest request, HttpServletResponse response) { 
        throw new RuntimeException(Integer.toString(HttpServletResponse.SC_METHOD_NOT_ALLOWED)); 
    } 
 
    @Override 
    public void doOptions(HttpServletRequest request, HttpServletResponse response) { 
        throw new RuntimeException(Integer.toString(HttpServletResponse.SC_METHOD_NOT_ALLOWED)); 
    } 
 
    // Send the response payload (Xml or Json) to the client. 
    private void sendResponse(HttpServletResponse response, String payload) { 
        try { 
            OutputStream out = response.getOutputStream(); 
            out.write(payload.getBytes()); 
            out.flush(); 
        } 
        catch(Exception e) { 
            throw new RuntimeException(Integer.toString(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)); 
        } 
    } 
} 