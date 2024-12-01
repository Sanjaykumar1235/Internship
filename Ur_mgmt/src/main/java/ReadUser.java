import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class ReadUser extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
	
	
		PrintWriter out = resp.getWriter();
		
		boolean loggedin;
		try
		{
			Connection con = DB_Connector.getDbConnection();
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery("select * from login_user");
			JSONArray row=new JSONArray();
			while(rs.next()) {
			
					
					JSONObject jo = new JSONObject();
					
					jo.put("uid",rs.getInt("uid"));
					jo.put("uname",rs.getString("username"));
					jo.put("pwd",rs.getString("passwd"));
					row.put(jo);
						}
			out.println(row);
		}
			
		
		
		catch(Exception e) {
			e.printStackTrace();
		}
		
	

			}

	}


