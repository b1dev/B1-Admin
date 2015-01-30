module B1Admin
  module Settings
    class ModulesController < B1Admin::ApplicationController
      #before_filter :module_exists? ,only:[:update,:create]

      before_filter :check_item, only:[:show,:update,:destroy]
      ##
      # Render view or return json of modules tree
      # @render [JSON]
      ##
      def index
        respond_to do |format|
          format.html do 
            render layout: !params.has_key?(:only_template)
          end
          format.json do
            items = B1Admin::Module.to_tree
            render json: items
          end
        end
      end

      ##
      # Get module by id
      # params:
      #   id - Module id [Integer]
      # @render [JSON<B1Admin::Module>]
      ##
      def show
        render json: @item
      end

      ##
      # Update one module, finded by id
      # @render [JSON]
      ##
      def update
        response = success_update_response
        unless @item.update_attributes(allowed_params)
          response = fail_update_response @item
        end
        render json: response
      end

      ##
      # Create new module
      # @render [JSON]
      ##
      def create
      	item  = B1Admin::Module.new(allowed_params)
        response = success_update_response
      	unless item.valid? && item.save
          response = fail_update_response item
      	end
        render json: response
      end

      ##
      # Destroy module by id
      # params:
      #   id - Module id [Integer]
      # @render [JSON]
      ##
      def destroy
        render json: @item.destroy ? success_delete_response : {success: false}
      end


      ##
      # Update all modules positions or delete them
      # @raise [B1Admin::Exception] if params from JS are invalid or module is not found
      # @render [JSON]
      ##
      def update_positions
        
        raise B1Admin::Exception.new(6,{name:update_all_params.inspect,type:"Array",is_type: update_all_params.class}) unless update_all_params.kind_of?(Array)
        
        update_func = lambda do |items|
          items.each_with_index do |item,i|
            childs = item["childs"].kind_of?(Array) ? item["childs"] : []
            raise B1Admin::Exception.new(7,{text:"Item B1Admin::Module with id #{item['id']} not found"}) unless item = B1Admin::Module.find_by_id(item["id"].to_i)
            item.update_attribute(:position,i)
            update_func.call(childs)
          end
        end

        # Transaction used because update_func cay raise Exception
        B1Admin::Module.transaction do 
          update_func.call(update_all_params)
        end

        render json: success_update_response
      end


      private
      # Not workink!!
      def module_exists?
      	"#{allowed_params[:controller]}_controller".camelize.constantize
      rescue NameError
      	flash[:errors]  = [I18n.t("admin.settings.modules.not_exists",ctrl:allowed_params[:controller])]
      	redirect_to request.referer
      end
      
      def allowed_params
        params.require(:item).permit(B1Admin::LANGS.map{|l| "name_#{l}"} + [:ico, :parent_id, :controller,:id])
      end

      def update_all_params
        params.require(:items)
      end

      ##
      # Set instance @item by id from params or raise exception
      # @raise  [B1Admin::Exception] if module is not found
      ##
      def check_item
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::Module with id #{params['id']} not found"}) unless @item = B1Admin::Module.find_by_id(params[:id].to_i)
      end

    end
  end
end