module B1Admin
  class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception
    after_filter :set_csrf_cookie_for_ng
  	
  	before_filter :require_login
    before_filter :check_access
  	helper_method :current_admin
  	helper_method :logged_in?

    around_filter do |controller, action_block|
      row = {
        controller:  params[:controller].split("/").last,
        action:      params[:action],
        user_id:     current_admin ? current_admin.id : 0,
        params:      params,
        status:      B1Admin::Log::STATUSES[:success],
        ip:          request.remote_ip,
        user_agent:  request.user_agent,
        description: "",
        time:        Time.now.to_i
      }
      begin
        action_block.call 
        B1Admin::Log.activity(row)
      rescue B1Admin::Exception => e
        B1Admin::Log.activity(row.merge({status: B1Admin::Log::STATUSES[:error],description: [e.message,e.backtrace].join("|")}))
        render {success:false,msg:"Server Error"}
      rescue => e
        B1Admin::Log.activity(row.merge({status: B1Admin::Log::STATUSES[:exception],description: [e.message,e.backtrace].join("|")}))
        render {success:false,msg:"Server Error"}
      end
    end
    

    def logged_in?
    	@current_admin.logged_in?
    end

    def check_access
      mod = self.class.to_s.demodulize.downcase.gsub("controller","")
      return if ["admin"].include?(mod)
      raise "Access Error!" unless current_admin.can? mod, params[:action] 
    end
    
    protected
    def current_admin
      @current_admin ||= B1Admin::User.authenticate_with_token(cookies[:admin_token], request.remote_ip, request.user_agent) if cookies[:admin_token]
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
        {success:false,msg: model.errors.messages.each_pair.map{|k,v| v.map{|l| "#{k} #{l}"}}.flatten}
      else  
        {success:false,msg:model.to_s}
      end
    end

  end
end
