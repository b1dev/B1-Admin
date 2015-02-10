module B1Admin
  module ApplicationHelper
  	def namespace
  		request.fullpath.split("/").reject(&:empty?).first
  	end
    def url path
      path = path.to_s
      lang_url = I18n.default_locale == I18n.locale ? ["",namespace] : ["",I18n.locale,namespace]

      path = (lang_url + path.split("/").reject(&:empty?)).reject(&:empty?).join("/") 

      path.empty? ? "/" : "/#{path}"
    end

    def user_can? method_name
      current_admin.can? params[:controller].split("/").last, params[:action]
    end

    def parent_modules id
      B1Admin::Module.where(parent_id:0).where.not(id:id)
    end
    

    def main_app
      Rails.application.class.routes.url_helpers
    end

    # def method_missing method, *args, &block
    #   puts "LOOKING FOR ROUTES #{method}"
    #   if method.to_s.end_with?('_path') or method.to_s.end_with?('_url')
    #     if main_app.respond_to?(method)
    #       [::B1Config.get_const.admin_namespase,main_app.send(method, *args)].join
    #     else
    #       super
    #     end
    #   else
    #     super
    #   end
    # end

  end
end
