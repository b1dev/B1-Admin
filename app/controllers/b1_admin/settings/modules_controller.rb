module B1Admin
  module Settings
    class ModulesController < B1Admin::ApplicationController
      #before_filter :module_exists? ,only:[:update,:create]
      #layout false

      # Render view or return json of modules tree
      def index
        respond_to do |format|
          format.html do 
            @module = B1Admin::Module.new
            render layout: !params.has_key?(:only_template)
          end
          format.json do
            items = B1Admin::Module.to_tree
            total = B1Admin::Module.count
            render json: { items: items, total: total } 
          end
        end
      end

      # Update all modules positions or delete them
      # @raise [B1Admin::Exception] if params from JS are invalid or module is not found
      # @retrun [JSON]
      def update_positions
        
        raise B1Admin::Exception(6,{name:update_all_params.inspect,type:"Array",is_type: update_all_params.class}) unless update_all_params.kind_of?(Array)
        
        existing_modules_ids = []

        update_func = lambda do |items|
          items.each_with_index do |item,i|
            existing_modules_ids << item["id"]
            childs = item["childs"].kind_of?(Array) ? item["childs"] : []
            raise B1Admin::Exception(7,{text:"Item B1Admin::Module with id #{item['id']} not found"}) unless mod = B1Admin::Module.find_by_id(item["id"].to_i)
            mod.update_attribute(:position,i)
            update_func.call(childs)
          end
        end
        update_func.call(update_all_params)
        B1Admin::Module.destroy_all(["id NOT IN (?)", existing_modules_ids])
        render json: { success: true }
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
        params.require(:item).permit(:name, :ico, :parent_id, :controller, :action,:id)
      end

      def update_all_params
        params.require(:items)
      end
    end
  end
end