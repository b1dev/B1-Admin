module B1Admin
  module Logs
    class ItemSerializer < ::ActiveModel::Serializer
      attributes :id, :description,:ip,:status,:params,:user_agent,:time,:action,:controller,:module,:action_title,:user_name,:server_ip

      def id
        self.object._id.to_s
      end
      def module
        mod = B1Admin::Module.where(controller: self.object.controller).select(:"name_#{I18n.locale}").first
        mod.nil? ? "" : mod.name
      end
      def module_id
        mod = B1Admin::Module.where(controller: self.object.controller).select(:id).first
        mod.nil? ? 0 : mod.id
      end
      def action_title
        item = B1Admin::Permission.where(module_id: module_id,action:self.object.action).select(:"desc_#{I18n.locale}").first
        item.nil? ? "" : item.desc
      end

      def user_name
        self.object.user.nil? ? "" : self.object.user.name
      end
    end
  end
end