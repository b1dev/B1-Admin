module B1Admin
  module Admins
    class ItemSerializer < ::ActiveModel::Serializer
      attributes :avatar, :name,:email,:blocked,:phone,:position,:created_at,:blocked_until,:id,:active,:signins_count,:messages_count,:roles
      has_many :permissions

      def permissions
        self.object.permissions.map(&:desc)
      end

      def roles
        self.object.role_ids.inject({}){|hash,item| hash.merge!({item.to_s.to_sym => true})}
      end
    end
  end
end