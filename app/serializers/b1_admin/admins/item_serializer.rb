module B1Admin
  module Admins
    class ItemSerializer < ::ActiveModel::Serializer
      attributes :avatar, :name,:email,:blocked,:phone,:position,:created_at,:blocked_until,:id,:active

    end
  end
end