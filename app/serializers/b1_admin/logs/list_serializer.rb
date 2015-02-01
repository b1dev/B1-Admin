module B1Admin
  module Logs
    class ListSerializer < ::ActiveModel::Serializer
      attributes :id, :description,:ip,:status,:params,:user_agent,:time,:action,:controller,:module,:action_title,:user_name,:server_ip

      def id
        self.object._id.to_s
      end
      def module
        item = B1Admin::Module.where(controller: self.object.controller).select(:"name_#{I18n.locale}").first
        item ? item.name : "Not set"
      end
      def module_id
        item = B1Admin::Module.where(controller: self.object.controller).select(:id).first
        item ? item.id : nil
      end
      def action_title
        item = B1Admin::Permission.where(module_id: module_id,action:self.object.action).select(:"desc_#{I18n.locale}").first
        item.nil? ? "" : item.desc
      end

      def user_name
        self.object.user ? self.object.user.name : "Not logged"
      end
    end
  end
end