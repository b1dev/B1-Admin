module B1Admin
  class Permission < ActiveRecord::Base
    #Relations
    has_and_belongs_to_many :roles
    belongs_to :module
    #End Relations
    
    #Validates
    B1Admin::LANGS.each do |l|
    	validates :"desc_#{l}", length: { in: 5..200},format: {with:/\A^[^`!@#\$%\^&*+_=]+\z/i}
  	end
    validates :action,     length: { in: 4..20},format: {with:/\A^[^`!@#\$%\^&*+=]+\z/i}, presence: true
    #End validates

    def desc
      read_attribute "desc_#{I18n.locale}"
    end

    # Perform hash of desc by current locale and action of permission
    # @return [Hash] performed item
    def to_item
      {
        desc: self.desc,
        id:   self.id,
      }
    end
  end
end
