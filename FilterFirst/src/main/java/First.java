import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class First extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	String uname=req.getParameter("uname");
    	PrintWriter out=resp.getWriter();
    	out.println("welcome"+ uname);
    	
    	// TODO Auto-generated method stub
    	//super.doPost(req, resp);
    }
}
