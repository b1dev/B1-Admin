module B1Admin
  class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception
    after_filter :set_csrf_cookie_for_ng

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

    def verified_request?
      super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
    end

    def set_csrf_cookie_for_ng
      cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end

    def success_update_response
      {success:true,msg:I18n.t("b1_admin.success_saved")}
    end

    def success_delete_response
      {success:true,msg:I18n.t("b1_admin.success_destroy")}
    end


    def fail_update_response model
      if model.is_a?(ActiveRecord::Base)
        {success:false,msg: model.errors.messages.each_pair.map{|k,v| v.map{|l| "{#k} #{l}"}}.flatten}
      else  
        {success:false,msg:model.to_s}
      end
    end

  end
end
