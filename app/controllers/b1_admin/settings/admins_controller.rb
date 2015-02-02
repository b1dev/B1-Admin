module B1Admin
  module Settings
    class AdminsController < B1Admin::ApplicationController
      before_filter :check_item, only:[:show,:update,:destroy,:edit,:upload,:history]

      skip_before_filter :verify_authenticity_token, only: :upload
      ##
      # Render view or return json of admins
      # @render [JSON]
      ##
      def index
        respond_to do |format|
          format.html do 
            render layout: !params.has_key?(:only_template)
          end
          format.json do
            items = B1Admin::User.page(params[:page])
            total = B1Admin::User.count
            render json: {items:ActiveModel::ArraySerializer.new(items, each_serializer: B1Admin::Admins::ListSerializer) ,total:total}
          end
        end
      end

      ##
      # Render a view
      ##
      def new
        @item = B1Admin::Admins::ItemSerializer.new(B1Admin::User.new)
        @roles = ActiveModel::ArraySerializer.new(B1Admin::Role.all, each_serializer: B1Admin::Roles::ListSerializer).serializable_array
        render layout: !params.has_key?(:only_template)
      end

      ##
      # Get admin by id
      # params:
      #   id - User id [Integer]
      # @render [JSON<B1Admin::Module>]
      ##
      def show
        render json: @item
      end


      def edit
        @item = B1Admin::Admins::ItemSerializer.new(@item)
        @roles = ActiveModel::ArraySerializer.new(B1Admin::Role.all, each_serializer: B1Admin::Roles::ListSerializer).serializable_array
        render layout: !params.has_key?(:only_template)
      end

      ##
      # Update one admin, finded by id
      # @render [JSON]
      ##
      def update
        response = success_update_response
        ActiveRecord::Base.transaction do
          @item.roles = []
          unless @item.update_attributes(allowed_params)
            response = fail_update_response @item
          end
        end
        render json: response
      end

      ##
      # Create new admin
      # @render [JSON]
      ##
      def create
        item  = B1Admin::User.new(allowed_params)
        response = success_update_response
        unless item.valid? && item.save
          response = fail_update_response item
        end
        render json: response
      end

      ##
      # Destroy admin by id
      # params:
      #   id - User id [Integer]
      # @render [JSON]
      ##
      def destroy
        render json: @item.destroy ? success_delete_response : {success: false}
      end

      ##
      # Set user avatar
      # params:
      #   file - image
      # @render [JSON]
      ##
      def upload
        response = success_update_response
        unless @item.update_attributes(avatar: params[:file])
          response = fail_update_response @item
        end
        render json: response
      end

      ##
      # User log history
      # @render [JSON]
      ##
      def history
        render json: {success: true,total: @item.logs.count, items: ActiveModel::ArraySerializer.new(@item.logs.page(params[:page]), each_serializer: B1Admin::Logs::ListSerializer) }
      end



      private
      
      def allowed_params
        params.require(:item).permit(:active,:signins_count,:blocked,:position,:phone,:email,:name,:id,:password,:password_confirmation,{role_ids: []})
      end

      ##
      # Set instance @item by id from params or raise exception
      # @raise  [B1Admin::Exception] if admin is not found
      ##
      def check_item
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::User with id #{params['id']} not found"}) unless @item = B1Admin::User.find_by_id(params[:id].to_i)
      end

    end
  end
end