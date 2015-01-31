module B1Admin
  module Settings
    class PermissionsController < B1Admin::ApplicationController
      before_filter :check_item, only:[:show,:update,:destroy]

      ##
      # Render view or return json of modules-permissions tree
      # @render [JSON]
      ##
      def index
        respond_to do |format|
          format.html do 
            render layout: !params.has_key?(:only_template)
          end
          format.json do
            items = B1Admin::Module.to_permission_tree
            render json: {items:items}
          end
        end
      end

      ##
      # Get rermission by id
      # params:
      #   id - Permission id [Integer]
      # @render [JSON<B1Admin::Module>]
      ##
      def show
        render json: @item
      end

      ##
      # Update one permission, finded by id
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
      # Create new permission
      # @render [JSON]
      ##
      def create
        item  = B1Admin::Permission.new(allowed_params)
        response = success_update_response
        unless item.valid? && item.save
          response = fail_update_response item
        end
        render json: response
      end

      ##
      # Destroy permission by id
      # params:
      #   id - Permission id [Integer]
      # @render [JSON]
      ##
      def destroy
        render json: @item.destroy ? success_delete_response : {success: false}
      end

      ##
      # Get module actions
      # params:
      #   id - Module id [Integer]
      # @raise  [B1Admin::Exception] if module is not found
      # @render [JSON<Array[String]>]
      ##
      def actions
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::Module with id #{params['id']} not found"}) unless item = B1Admin::Module.find_by_id(params[:id].to_i)
        render json: {success: true, actions: item.get_controller_actions}
      end



      private
      
      def allowed_params
        params.require(:item).permit(B1Admin::LANGS.map{|l| "desc_#{l}"} + [:action,:id,:module_id])
      end

      ##
      # Set instance @item by id from params or raise exception
      # @raise  [B1Admin::Exception] if permission is not found
      ##
      def check_item
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::Permission with id #{params['id']} not found"}) unless @item = B1Admin::Permission.find_by_id(params[:id].to_i)
      end

    end
  end
end