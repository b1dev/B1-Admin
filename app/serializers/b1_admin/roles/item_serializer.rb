module B1Admin
  module Roles
    class ItemSerializer < ::ActiveModel::Serializer
      attributes *([:id, :name] +  B1Admin::LANGS.map{|l| :"desc_#{l}"}),:permissions
      has_many :modules

      def permissions
        self.object.permission_ids.inject({}){|hash,item| hash.merge!({item.to_s.to_sym => true})}
      end

    end
  end
end