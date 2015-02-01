module B1Admin
  module Logs
    class ListSerializer < ::ActiveModel::Serializer
      attributes :id, :description,:ip,:status,:params,:user_agent,:time,:action,:controller,:title

      def id
        self.object._id.to_s
      end
      def title
        B1Admin::Module.where(controller: self.object.controller).select(:"name_#{I18n.locale}").first.name
      end
    end
  end
end