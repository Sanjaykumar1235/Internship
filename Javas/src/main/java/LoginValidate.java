import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class LoginValidate {
	
	public boolean validate(String uname , String pwd)
	{
		boolean status =false;
		
		String dbName="jdbc:postgresql://localhost:5432/login";
		String dbDriver="org.postgresql.Driver";
		String username="postgres";
		String password="postgres";
		
		try
		{
			Class.forName(dbDriver);
			Connection con = DriverManager.getConnection(dbName,username,password);
			Statement st=con.createStatement();
			String sql="select * from login";
			ResultSet rs=st.executeQuery(sql);
			
			while(rs.next()) {
				
				if(uname.equals(rs.getString("uname"))&&pwd.equals(rs.getString("pwd")))
				{
					status=true;
				}
			}
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		
		
		
		
		return status;
	}

}