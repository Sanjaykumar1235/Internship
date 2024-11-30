import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

public class MyFilter implements Filter {
   @Override
public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
		throws IOException, ServletException {
	   String pwd=arg0.getParameter("pwd");
	   if(pwd.equals("1234"))
	   {
		   arg2.doFilter(arg0, arg1);
		   
		   
	   }
	   else
	   {
		   PrintWriter out=arg1.getWriter();
		   out.println("Login Invalid");
	   }
	   
	// TODO Auto-generated method stub
	
}
}
