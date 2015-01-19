module B1Admin
  class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception
    
  	before_filter :check_access
  	before_filter :require_login
  	helper_method :current_admin
  	helper_method :logged_in?


    def logged_in?
    	@current_admin.logged_in?
    end

    def check_access
      # return if [AdminController].include?(self.class)
      # arr    = self.class.to_s.underscore.gsub("/","_").split("_")
      # redirect_to admin_path unless current_admin.has_access?([arr.at(1),arr.at(2)],params[:action])
    end
    
    protected
    def current_admin
      @current_admin ||= B1Admin::User.authenticate_with_token(cookies[:admin_token], request.remote_ip, request.user_agent) if cookies[:admin_token]
      #p @current_admin.modules
     # raise
    end

    # you should change this to whatever logic you need
    def require_login
      unless current_admin
        session[:return_to] ||= request.referer
        redirect_to login_url
      end
    end


  end
end
