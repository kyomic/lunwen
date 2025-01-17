package model;

public class Book {
	public int ID;
	public String isbn;
	// 图书名称
	private String name;
	// 图书价格
	public float price;
	// 图书作者
	public String author;
	// 出版社
	public String publisher;
	// 图书分类号
	public String type;
	// 图书介绍
	public String intro;
	// 图书发版日期
	public String publishdate;
	// 图书图片信息
	public String pic; 
	/**
	 * 获取图书名称
	 */
	public String getBookName() {
		return this.name;
	}
	
	public void setBookName(String name) {
		this.name = name;
	}
}

