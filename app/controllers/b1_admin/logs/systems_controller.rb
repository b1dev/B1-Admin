module B1Admin
  module Logs
    class SystemsController < B1Admin::ApplicationController
      before_filter :check_item, only:[:show]

      ##
      # Render view or return json of logs
      # @render [JSON]
      ##
      def index
        p B1Admin::Log.setup.desc(:time).page(params[:page])
        respond_to do |format|
          format.html do 
            render layout: !params.has_key?(:only_template)
          end
          format.json do
            items = B1Admin::Log.setup.desc(:time).page(params[:page])
            total = B1Admin::Log.setup.count
            render json: {items:ActiveModel::ArraySerializer.new(items, each_serializer: B1Admin::Logs::ListSerializer) ,total:total}
          end
        end
      end

      ##
      # Get log row by id
      # params:
      #   id - Row id [String]
      # @render [JSON<B1Admin::Log>]
      ##
      def show
        render json: B1Admin::Logs::ItemSerializer.new(@item).serializable_hash
      end

      ##
      # Set instance @item by id from params or raise exception
      # @raise  [B1Admin::Exception] if log row is not found
      ##
      def check_item
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::Log with id #{params['id']} not found"}) unless @item = B1Admin::Log.setup.find(params[:id].to_s)
      end

    end
  end
end