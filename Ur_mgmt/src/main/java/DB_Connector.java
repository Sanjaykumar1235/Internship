import java.sql.Connection;
import java.sql.DriverManager;

public class DB_Connector {
	
	public static Connection getDbConnection()
	{
		Connection con = null;
		String db_url = "jdbc:postgresql://localhost:5432/usr_mgmt";
		String db_user = "postgres";
		String db_pwd = "postgres";
		try
		{
			Class.forName("org.postgresql.Driver");
			con=DriverManager.getConnection(db_url,db_user,db_pwd);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return con;
	}
}