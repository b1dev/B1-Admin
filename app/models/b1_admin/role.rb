module B1Admin
  class Role < ActiveRecord::Base
    includes :modules
    #Relations
    has_and_belongs_to_many :users
    has_and_belongs_to_many :permissions
    has_and_belongs_to_many :modules
    #End Relations

    #Validates
    validates :name,      length: { in: 5..30 },format: {with:/\A^[^0-9`!@#\$%\^&*+_=]+\z/i}, presence: true
    ALL_LANGS.each do |l|
    	validates :"desc_#{l}", length: { in: 10..50},format: {with:/\A^[^`!@#\$%\^&*+_=]+\z/i}
  	end
    #End validates

    # Get all parent modules that has relation with current role
		# @retrun [Array<B1Admin::Module>]
    def parent_modules
      self.modules.where(parent_id:0)
    end
  end
end
