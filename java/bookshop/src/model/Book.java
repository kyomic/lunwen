package model;

public class Book {
	public int ID;
	public String isbn;
	// ͼ������
	private String name;
	// ͼ��۸�
	public float price;
	// ͼ������
	public String author;
	// ������
	public String publisher;
	// ͼ������
	public String type;
	// ͼ�����
	public String intro;
	// ͼ�鷢������
	public String publishdate;
	// ͼ��ͼƬ��Ϣ
	public String pic; 
	/**
	 * ��ȡͼ������
	 */
	public String getBookName() {
		return this.name;
	}
	
	public void setBookName(String name) {
		this.name = name;
	}
}
