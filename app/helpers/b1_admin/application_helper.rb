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
      true
    end

    def parent_modules id
      B1Admin::Module.where(parent_id:0).where.not(id:id)
    end
    
  end
end
