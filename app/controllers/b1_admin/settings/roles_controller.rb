module B1Admin
  module Settings
    class RolesController < B1Admin::ApplicationController
      before_filter :check_item, only:[:show,:update,:destroy,:edit]

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
            items = B1Admin::Role.page(params[:page])
            total = B1Admin::Role.count
            render json: {items:items,total:total}
          end
        end
      end

      ##
      # Render a view
      ##
      def new
        @modules = B1Admin::Module.to_permission_tree
        @item = Role.new
        render layout: !params.has_key?(:only_template)
      end

      ##
      # Get role by id
      # params:
      #   id - Role id [Integer]
      # @render [JSON<B1Admin::Module>]
      ##
      def show
        render json: @item
      end


      def edit
        @modules = B1Admin::Module.to_permission_tree
        render layout: !params.has_key?(:only_template)
      end

      ##
      # Update one role, finded by id
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
      # Create new role
      # @render [JSON]
      ##
      def create
        item  = B1Admin::Role.new(allowed_params)
        response = success_update_response
        unless item.valid? && item.save
          response = fail_update_response item
        end
        render json: response
      end

      ##
      # Destroy role by id
      # params:
      #   id - Permission id [Integer]
      # @render [JSON]
      ##
      def destroy
        render json: @item.destroy ? success_delete_response : {success: false}
      end



      private
      
      def allowed_params
        params.require(:item).permit(B1Admin::LANGS.map{|l| "desc_#{l}"} + [{module_ids: []},{permission_ids: []},:name])
      end

      ##
      # Set instance @item by id from params or raise exception
      # @raise  [B1Admin::Exception] if permission is not found
      ##
      def check_item
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::Role with id #{params['id']} not found"}) unless @item = B1Admin::Role.find_by_id(params[:id].to_i)
      end

    end
  end
end