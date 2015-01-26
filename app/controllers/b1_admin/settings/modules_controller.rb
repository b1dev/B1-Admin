module B1Admin
  module Settings
    class ModulesController < B1Admin::ApplicationController
      #before_filter :module_exists? ,only:[:update,:create]
      #layout false
      def index
        respond_to do |format|
          format.html do 
            render layout: !params.has_key?(:only_template)
          end
          format.json do
            items = B1Admin::Module.to_tree
            total = B1Admin::Module.count
            render json: { items: items, total: total } 
          end
        end
      end

      def update_positions
        
      end

      def edit;  @module  = B1Admin::Module.find_by_id(params[:id]) end
      def new;   @module  = B1Admin::Module.new end
      def update
      	@module = B1Admin::Module.includes(:permissions,:parent_module,:modules,:roles).find_by_id(params[:module].delete(:id))
      	if @module.update_attributes(mod_params)
      		flash[:success] = I18n.t("admin.settings.modules.updated")
      		redirect_to settings_modules_path
      	else
      		flash[:errors]  = @module.errors.messages.each_pair.map{|k,v| v.map{|l|"#{t("admin.settings.modules.#{k}")} #{l}"}}.flatten
      		render action: :new
      	end
      end
      def create
      	@module = B1Admin::Module.new(mod_params)
      	if @module.valid?
      		@module.save
      		flash[:success] = I18n.t("admin.settings.modules.added")
      		redirect_to settings_modules_path
      	else
      		flash[:errors]  = @module.errors.messages.each_pair.map{|k,v| v.map{|l|"#{t("admin.settings.modules.#{k}")} #{l}"}}.flatten
      		render action: :new
      	end
      end
      def destroy
      	B1Admin::Module.find(params[:id]).destroy 
      	flash[:success] = I18n.t("admin.settings.modules.deleted")
      rescue ActiveRecord::DeleteRestrictionError
      	flash[:errors]  = [I18n.t("admin.settings.modules.cannot_delete")]
      ensure
      	redirect_to settings_modules_path
      end
      private
      # Not workink!!
      def module_exists?
      	"#{mod_params[:controller]}_controller".camelize.constantize
      rescue NameError
      	flash[:errors]  = [I18n.t("admin.settings.modules.not_exists",ctrl:mod_params[:controller])]
      	redirect_to request.referer
      end
      def mod_params
        params.require(:module).permit(:name, :ico, :parent_id, :controller, :action,:id)
      end
    end
  end
end