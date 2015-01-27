module B1Admin
  module Settings
    class ModulesController < B1Admin::ApplicationController
      #before_filter :module_exists? ,only:[:update,:create]

      ##
      # Render view or return json of modules tree
      # @render [JSON]
      ##
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

      ##
      # Get module by id
      # params:
      #   id - Module id [Integer]
      # @raise  [B1Admin::Exception] if module is not found
      # @render [JSON<B1Admin::Module>]
      ##
      def show
        raise B1Admin::Exception(7,{text:"Item B1Admin::Module with id #{params['id']} not found"}) unless mod = B1Admin::Module.find_by_id(params[:id].to_i)
        render json: mod
      end

      ##
      # Create new module
      # @render [JSON]
      ##
      def create
      	mod  = B1Admin::Module.new(mod_params)
        response = success_update_response
      	unless mod.valid? && mod.save
          response = fail_update_response mod
      	end
        render json: response
      end

      ##
      # Update one module, finded by id
      # @raise  [B1Admin::Exception] if module is not found
      # @render [JSON]
      ##
      def update
        response = success_update_response
        raise B1Admin::Exception(7,{text:"Item B1Admin::Module with id #{params['id']} not found"}) unless mod = B1Admin::Module.find_by_id(params[:id].to_i)
        unless mod.update_attributes(mod_params)
          fail_update_response
        end
        render json: response
      end

      ##
      # Update all modules positions or delete them
      # @raise [B1Admin::Exception] if params from JS are invalid or module is not found
      # @render [JSON]
      ##
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
        # Transaction used because update_func cay raise Exception
        B1Admin::Module.transaction do 
          update_func.call(update_all_params)
        end
        # Delete modules if user can do it
        if current_admin.can?(:destroy,self.class.name)
          B1Admin::Module.destroy_all(["id NOT IN (?)", existing_modules_ids])
        end
        render json: success_update_response

      end

      ##
      # Action only for permissions, modules destroys in "update_positions" action
      ##
      def destroy;end


      private
      # Not workink!!
      def module_exists?
      	"#{mod_params[:controller]}_controller".camelize.constantize
      rescue NameError
      	flash[:errors]  = [I18n.t("admin.settings.modules.not_exists",ctrl:mod_params[:controller])]
      	redirect_to request.referer
      end
      def mod_params
        params.require(:item).permit(B1Admin::LANGS.map{|l| "name_#{l}"} + [:ico, :parent_id, :controller, :action,:id])
      end

      def update_all_params
        params.require(:items)
      end
    end
  end
end