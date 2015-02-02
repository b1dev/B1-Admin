module B1Admin
  module Logs
    class SystemsController < B1Admin::ApplicationController
      before_filter :check_item, only:[:show]

      ##
      # Render view or return json of logs
      # @render [JSON]
      ##
      def index
        respond_to do |format|
          format.html do 
            @modules = B1Admin::Module.where("parent_id > 0").all.inject({}){|hash,m| hash.merge!({m.controller.to_s => m.name})}
            render layout: !params.has_key?(:only_template)
          end
          format.json do

            items = B1Admin::Log.setup.desc(:time)
            ActiveSupport::JSON.decode(params[:filters]).each_pair do |k,v|
              items = items.where(ip: v.to_s)           if "ip" == k
              items = items.where(status:  v.to_i)      if "status" == k
              items = items.where(user_id: v.to_i)      if "user_id" == k
              items = items.where(action: v.to_s)       if "action" == k
              items = items.where(controller: v.to_s)   if "controller" == k
              items = items.where(server_ip: v.to_s)    if "server_ip" == k
              items = items.where(:time.gte => Time.parse(v).to_i)  if "from" == k
              items = items.where(:time.lte => Time.parse(v).to_i)  if "to" == k
            end
            render json: {items:ActiveModel::ArraySerializer.new(items.page(params[:page]), each_serializer: B1Admin::Logs::ListSerializer) ,total:items.count}
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
      # Get module actions
      # params:
      #   id - Module id [Integer]
      # @raise  [B1Admin::Exception] if module is not found
      # @render [JSON<Array[String]>]
      ##
      def actions
        raise B1Admin::Exception.new(7,{text:"Item B1Admin::Module with controller #{params['id']} not found"}) unless item = B1Admin::Module.find_by_controller(params[:id].to_s)
        render json: {success: true, actions: item.get_controller_actions}
      end

      ##
      # Users autocomplete action, find by email or name
      # params:
      #   term - search term [String]
      # @render [JSON<Array[B1Admin::User]>]
      ##
      def users
        items = B1Admin::User.where(["name LIKE :term OR email LIKE :term",term: "#{params[:term].to_s}%"]).all
        render json: {success: true, users: items}
      end


      private
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