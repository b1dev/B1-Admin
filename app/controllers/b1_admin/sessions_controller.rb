module B1Admin
  class SessionsController < ApplicationController
    layout false
    skip_before_action :require_login
    skip_before_action :check_access

    def new
      if current_admin
        redirect_to(root_url)
      else
        @login = B1Admin::Login.new
        render file: "layouts/b1_admin/login"
      end
    end

    def create
      redirect_url = login_url
      unless current_admin
        login = B1Admin::Login.new(params[:login])
        if login.valid?
          if admin = B1Admin::User.where(email: login.email).take
            if admin.blocked
              flash[:alert] = t('admin.admin_blocked') + (admin.blocked_until ? t('admin.admin_blocked_until') % [admin.blocked_until.strftime("%d.%m.%Y %H:%M:%S")] : "")
            elsif !admin.active
              flash[:alert] = t('admin.admin_not_active')
            else

              if (token = admin.sign_in(login.password, request.remote_ip, request.referer, request.user_agent))
                cookies[:admin_token] = token
                redirect_url = session.delete(:return_to)
              else
                if (attempts_left = (B1Admin::Config.max_password_attempts - admin.wrong_password_attempts)) > 0
                  flash[:alert] = t('admin.wrong_password') + (t('admin.attempts_left') % [attempts_left])
                else
                  flash[:alert] = t('admin.wrong_password') + (t('admin.admin_blocked') + (admin.blocked_until ? t('admin.admin_blocked_until') % [admin.blocked_until.strftime("%d.%m.%Y %H:%M:%S")] : ""))
                end
              end
            end
          else
            flash[:alert] = t('admin.wrong_credentials')
          end
        else
          flash[:alert] = t('admin.wrong_credentials')
        end
      end

      redirect_to (redirect_url || root_url)
    end

    def destroy
      if current_admin
        current_admin.signout(cookies[:admin_token], request.remote_ip, request.user_agent)
        cookies.delete(:admin_token)
        flash[:notice] = t('admin.signed_out')
      end
      redirect_to login_url
    end
  end
end
