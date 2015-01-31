module B1Admin
  module Roles
    class ListSerializer < ::ActiveModel::Serializer
      attributes :id, :name,:desc,:permissions

      def permissions
        self.object.permissions.map(&:desc).join(".      ").html_safe
      end

    end
  end
end